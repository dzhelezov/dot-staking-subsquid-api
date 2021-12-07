import { BaseModel, NumericField, Model, OneToMany, StringField, JSONField } from '@subsquid/warthog';

import BN from 'bn.js';

import { StakingReward } from '../staking-reward/staking-reward.model';
import { StakingSlash } from '../staking-slash/staking-slash.model';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class SumReward extends BaseModel {
  @NumericField({
    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  accountReward!: BN;

  @NumericField({
    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  accountSlash!: BN;

  @NumericField({
    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  accountTotal!: BN;

  @OneToMany(() => StakingReward, (param: StakingReward) => param.account, {
    nullable: true,
    modelName: 'SumReward',
    relModelName: 'StakingReward',
    propertyName: 'rewards',
  })
  rewards?: StakingReward[];

  @OneToMany(() => StakingSlash, (param: StakingSlash) => param.account, {
    nullable: true,
    modelName: 'SumReward',
    relModelName: 'StakingSlash',
    propertyName: 'slashs',
  })
  slashs?: StakingSlash[];

  constructor(init?: Partial<SumReward>) {
    super();
    Object.assign(this, init);
  }
}
