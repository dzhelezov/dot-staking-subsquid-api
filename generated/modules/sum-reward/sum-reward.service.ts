import { Service, Inject } from 'typedi';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { SumReward } from './sum-reward.model';

import { SumRewardWhereArgs, SumRewardWhereInput } from '../../warthog';

import { StakingReward } from '../staking-reward/staking-reward.model';
import { StakingRewardService } from '../staking-reward/staking-reward.service';
import { StakingSlash } from '../staking-slash/staking-slash.model';
import { StakingSlashService } from '../staking-slash/staking-slash.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('SumRewardService')
export class SumRewardService extends HydraBaseService<SumReward> {
  @Inject('StakingRewardService')
  public readonly rewardsService!: StakingRewardService;
  @Inject('StakingSlashService')
  public readonly slashsService!: StakingSlashService;

  constructor(@InjectRepository(SumReward) protected readonly repository: Repository<SumReward>) {
    super(SumReward, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<SumReward[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<SumReward[]> {
    return this.buildFindWithRelationsQuery(_where, orderBy, limit, offset, fields).getMany();
  }

  buildFindWithRelationsQuery<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): SelectQueryBuilder<SumReward> {
    const where = <SumRewardWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders

    const { rewards_some, rewards_none, rewards_every } = where;

    if (+!!rewards_some + +!!rewards_none + +!!rewards_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.rewards_some;
    delete where.rewards_none;
    delete where.rewards_every;
    // remove relation filters to enable warthog query builders

    const { slashs_some, slashs_none, slashs_every } = where;

    if (+!!slashs_some + +!!slashs_none + +!!slashs_every > 1) {
      throw new Error(`A query can have at most one of none, some, every clauses on a relation field`);
    }

    delete where.slashs_some;
    delete where.slashs_none;
    delete where.slashs_every;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    const rewardsFilter = rewards_some || rewards_none || rewards_every;

    if (rewardsFilter) {
      const rewardsQuery = this.rewardsService
        .buildFindQueryWithParams(<any>rewardsFilter, undefined, undefined, ['id'], 'rewards')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...rewardsQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin('sumreward.rewards', 'rewards_filtered', `rewards_filtered.id IN (${rewardsQuery.getQuery()})`)
        .groupBy('sumreward_id')
        .addSelect('count(rewards_filtered.id)', 'cnt_filtered')
        .addSelect('sumreward.id', 'sumreward_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('sumreward.rewards', 'rewards_total')
        .groupBy('sumreward_id')
        .addSelect('count(rewards_total.id)', 'cnt_total')
        .addSelect('sumreward.id', 'sumreward_id');

      const subQuery = `
                SELECT
                    f.sumreward_id sumreward_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.sumreward_id = f.sumreward_id`;

      if (rewards_none) {
        mainQuery = mainQuery.andWhere(`sumreward.id IN
                (SELECT
                    rewards_subq.sumreward_id
                FROM
                    (${subQuery}) rewards_subq
                WHERE
                    rewards_subq.cnt_filtered = 0
                )`);
      }

      if (rewards_some) {
        mainQuery = mainQuery.andWhere(`sumreward.id IN
                (SELECT
                    rewards_subq.sumreward_id
                FROM
                    (${subQuery}) rewards_subq
                WHERE
                    rewards_subq.cnt_filtered > 0
                )`);
      }

      if (rewards_every) {
        mainQuery = mainQuery.andWhere(`sumreward.id IN
                (SELECT
                    rewards_subq.sumreward_id
                FROM
                    (${subQuery}) rewards_subq
                WHERE
                    rewards_subq.cnt_filtered > 0
                    AND rewards_subq.cnt_filtered = rewards_subq.cnt_total
                )`);
      }
    }

    const slashsFilter = slashs_some || slashs_none || slashs_every;

    if (slashsFilter) {
      const slashsQuery = this.slashsService
        .buildFindQueryWithParams(<any>slashsFilter, undefined, undefined, ['id'], 'slashs')
        .take(undefined); //remove the default LIMIT

      parameters = { ...parameters, ...slashsQuery.getParameters() };

      const subQueryFiltered = this.getQueryBuilder()
        .select([])
        .leftJoin('sumreward.slashs', 'slashs_filtered', `slashs_filtered.id IN (${slashsQuery.getQuery()})`)
        .groupBy('sumreward_id')
        .addSelect('count(slashs_filtered.id)', 'cnt_filtered')
        .addSelect('sumreward.id', 'sumreward_id');

      const subQueryTotal = this.getQueryBuilder()
        .select([])
        .leftJoin('sumreward.slashs', 'slashs_total')
        .groupBy('sumreward_id')
        .addSelect('count(slashs_total.id)', 'cnt_total')
        .addSelect('sumreward.id', 'sumreward_id');

      const subQuery = `
                SELECT
                    f.sumreward_id sumreward_id, f.cnt_filtered cnt_filtered, t.cnt_total cnt_total
                FROM
                    (${subQueryTotal.getQuery()}) t, (${subQueryFiltered.getQuery()}) f
                WHERE
                    t.sumreward_id = f.sumreward_id`;

      if (slashs_none) {
        mainQuery = mainQuery.andWhere(`sumreward.id IN
                (SELECT
                    slashs_subq.sumreward_id
                FROM
                    (${subQuery}) slashs_subq
                WHERE
                    slashs_subq.cnt_filtered = 0
                )`);
      }

      if (slashs_some) {
        mainQuery = mainQuery.andWhere(`sumreward.id IN
                (SELECT
                    slashs_subq.sumreward_id
                FROM
                    (${subQuery}) slashs_subq
                WHERE
                    slashs_subq.cnt_filtered > 0
                )`);
      }

      if (slashs_every) {
        mainQuery = mainQuery.andWhere(`sumreward.id IN
                (SELECT
                    slashs_subq.sumreward_id
                FROM
                    (${subQuery}) slashs_subq
                WHERE
                    slashs_subq.cnt_filtered > 0
                    AND slashs_subq.cnt_filtered = slashs_subq.cnt_total
                )`);
      }
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery.take(limit || 50).skip(offset || 0);
  }
}
