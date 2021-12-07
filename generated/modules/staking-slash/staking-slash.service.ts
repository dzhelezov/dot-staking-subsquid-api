import { Service, Inject } from 'typedi';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { StakingSlash } from './staking-slash.model';

import { StakingSlashWhereArgs, StakingSlashWhereInput } from '../../warthog';

import { SumReward } from '../sum-reward/sum-reward.model';
import { SumRewardService } from '../sum-reward/sum-reward.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('StakingSlashService')
export class StakingSlashService extends HydraBaseService<StakingSlash> {
  @Inject('SumRewardService')
  public readonly accountService!: SumRewardService;

  constructor(@InjectRepository(StakingSlash) protected readonly repository: Repository<StakingSlash>) {
    super(StakingSlash, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<StakingSlash[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<StakingSlash[]> {
    return this.buildFindWithRelationsQuery(_where, orderBy, limit, offset, fields).getMany();
  }

  buildFindWithRelationsQuery<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): SelectQueryBuilder<StakingSlash> {
    const where = <StakingSlashWhereInput>(_where || {});

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

      mainQuery = mainQuery.andWhere(`"stakingslash"."account_id" IN (${accountQuery.getQuery()})`);

      parameters = { ...parameters, ...accountQuery.getParameters() };
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery.take(limit || 50).skip(offset || 0);
  }
}
