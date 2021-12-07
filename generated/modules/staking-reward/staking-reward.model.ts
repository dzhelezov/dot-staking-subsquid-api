import { BaseModel, NumericField, DateTimeField, Model, ManyToOne, StringField, JSONField } from '@subsquid/warthog';

import BN from 'bn.js';

import { SumReward } from '../sum-reward/sum-reward.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class StakingReward extends BaseModel {
  @ManyToOne(() => SumReward, (param: SumReward) => param.rewards, {
    skipGraphQLField: true,

    modelName: 'StakingReward',
    relModelName: 'SumReward',
    propertyName: 'account',
  })
  account!: SumReward;

  @NumericField({
    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  balance!: BN;

  @DateTimeField({})
  date!: Date;

  constructor(init?: Partial<StakingReward>) {
    super();
    Object.assign(this, init);
  }
}
