import { Service, Inject } from 'typedi';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { StakingReward } from './staking-reward.model';

import { StakingRewardWhereArgs, StakingRewardWhereInput } from '../../warthog';

import { SumReward } from '../sum-reward/sum-reward.model';
import { SumRewardService } from '../sum-reward/sum-reward.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('StakingRewardService')
export class StakingRewardService extends HydraBaseService<StakingReward> {
  @Inject('SumRewardService')
  public readonly accountService!: SumRewardService;

  constructor(@InjectRepository(StakingReward) protected readonly repository: Repository<StakingReward>) {
    super(StakingReward, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<StakingReward[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<StakingReward[]> {
    return this.buildFindWithRelationsQuery(_where, orderBy, limit, offset, fields).getMany();
  }

  buildFindWithRelationsQuery<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): SelectQueryBuilder<StakingReward> {
    const where = <StakingRewardWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders
    const { account } = where;
    delete where.account;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    if (account) {
      // OTO or MTO
      const accountQuery = this.accountService
        .buildFindQueryWithParams(<any>account, undefined, undefined, ['id'], 'account')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"stakingreward"."account_id" IN (${accountQuery.getQuery()})`);

      parameters = { ...parameters, ...accountQuery.getParameters() };
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery.take(limit || 50).skip(offset || 0);
  }
}
