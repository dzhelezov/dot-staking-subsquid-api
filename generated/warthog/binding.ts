import 'graphql-import-node'; // Needed so you can import *.graphql files 

import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import * as schema from  './schema.graphql'

export interface Query {
    noBondRecordAccounts: <T = Array<NoBondRecordAccount>>(args: { offset?: Int | null, limit?: Int | null, where?: NoBondRecordAccountWhereInput | null, orderBy?: Array<NoBondRecordAccountOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    noBondRecordAccountByUniqueInput: <T = NoBondRecordAccount | null>(args: { where: NoBondRecordAccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    noBondRecordAccountsConnection: <T = NoBondRecordAccountConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: NoBondRecordAccountWhereInput | null, orderBy?: Array<NoBondRecordAccountOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stakingRewards: <T = Array<StakingReward>>(args: { offset?: Int | null, limit?: Int | null, where?: StakingRewardWhereInput | null, orderBy?: Array<StakingRewardOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stakingRewardByUniqueInput: <T = StakingReward | null>(args: { where: StakingRewardWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    stakingRewardsConnection: <T = StakingRewardConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: StakingRewardWhereInput | null, orderBy?: Array<StakingRewardOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stakingSlashes: <T = Array<StakingSlash>>(args: { offset?: Int | null, limit?: Int | null, where?: StakingSlashWhereInput | null, orderBy?: Array<StakingSlashOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stakingSlashByUniqueInput: <T = StakingSlash | null>(args: { where: StakingSlashWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    stakingSlashesConnection: <T = StakingSlashConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: StakingSlashWhereInput | null, orderBy?: Array<StakingSlashOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sumRewards: <T = Array<SumReward>>(args: { offset?: Int | null, limit?: Int | null, where?: SumRewardWhereInput | null, orderBy?: Array<SumRewardOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sumRewardByUniqueInput: <T = SumReward | null>(args: { where: SumRewardWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    sumRewardsConnection: <T = SumRewardConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: SumRewardWhereInput | null, orderBy?: Array<SumRewardOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    hello: <T = Hello>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {}

export interface Subscription {
    stateSubscription: <T = ProcessorState>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args: any[]): T
}

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema: schema as any })

/**
 * Types
*/

export type NoBondRecordAccountOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'firstRewardAt_ASC' |
  'firstRewardAt_DESC'

export type StakingRewardOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'account_ASC' |
  'account_DESC' |
  'balance_ASC' |
  'balance_DESC' |
  'date_ASC' |
  'date_DESC'

export type StakingSlashOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'account_ASC' |
  'account_DESC' |
  'balance_ASC' |
  'balance_DESC' |
  'date_ASC' |
  'date_DESC'

export type SumRewardOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'accountReward_ASC' |
  'accountReward_DESC' |
  'accountSlash_ASC' |
  'accountSlash_DESC' |
  'accountTotal_ASC' |
  'accountTotal_DESC'

export interface BaseWhereInput {
  id_eq?: String | null
  id_in?: String[] | String | null
  createdAt_eq?: String | null
  createdAt_lt?: String | null
  createdAt_lte?: String | null
  createdAt_gt?: String | null
  createdAt_gte?: String | null
  createdById_eq?: String | null
  updatedAt_eq?: String | null
  updatedAt_lt?: String | null
  updatedAt_lte?: String | null
  updatedAt_gt?: String | null
  updatedAt_gte?: String | null
  updatedById_eq?: String | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: String | null
  deletedAt_lt?: String | null
  deletedAt_lte?: String | null
  deletedAt_gt?: String | null
  deletedAt_gte?: String | null
  deletedById_eq?: String | null
}

export interface NoBondRecordAccountCreateInput {
  firstRewardAt: Float
}

export interface NoBondRecordAccountUpdateInput {
  firstRewardAt?: Float | null
}

export interface NoBondRecordAccountWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  firstRewardAt_eq?: Int | null
  firstRewardAt_gt?: Int | null
  firstRewardAt_gte?: Int | null
  firstRewardAt_lt?: Int | null
  firstRewardAt_lte?: Int | null
  firstRewardAt_in?: Int[] | Int | null
  AND?: NoBondRecordAccountWhereInput[] | NoBondRecordAccountWhereInput | null
  OR?: NoBondRecordAccountWhereInput[] | NoBondRecordAccountWhereInput | null
}

export interface NoBondRecordAccountWhereUniqueInput {
  id: ID_Output
}

export interface StakingRewardCreateInput {
  account: ID_Output
  balance: String
  date: DateTime
}

export interface StakingRewardUpdateInput {
  account?: ID_Input | null
  balance?: String | null
  date?: DateTime | null
}

export interface StakingRewardWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  balance_eq?: BigInt | null
  balance_gt?: BigInt | null
  balance_gte?: BigInt | null
  balance_lt?: BigInt | null
  balance_lte?: BigInt | null
  balance_in?: BigInt[] | BigInt | null
  date_eq?: DateTime | null
  date_lt?: DateTime | null
  date_lte?: DateTime | null
  date_gt?: DateTime | null
  date_gte?: DateTime | null
  account?: SumRewardWhereInput | null
  AND?: StakingRewardWhereInput[] | StakingRewardWhereInput | null
  OR?: StakingRewardWhereInput[] | StakingRewardWhereInput | null
}

export interface StakingRewardWhereUniqueInput {
  id: ID_Output
}

export interface StakingSlashCreateInput {
  account: ID_Output
  balance: String
  date: DateTime
}

export interface StakingSlashUpdateInput {
  account?: ID_Input | null
  balance?: String | null
  date?: DateTime | null
}

export interface StakingSlashWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  balance_eq?: BigInt | null
  balance_gt?: BigInt | null
  balance_gte?: BigInt | null
  balance_lt?: BigInt | null
  balance_lte?: BigInt | null
  balance_in?: BigInt[] | BigInt | null
  date_eq?: DateTime | null
  date_lt?: DateTime | null
  date_lte?: DateTime | null
  date_gt?: DateTime | null
  date_gte?: DateTime | null
  account?: SumRewardWhereInput | null
  AND?: StakingSlashWhereInput[] | StakingSlashWhereInput | null
  OR?: StakingSlashWhereInput[] | StakingSlashWhereInput | null
}

export interface StakingSlashWhereUniqueInput {
  id: ID_Output
}

export interface SumRewardCreateInput {
  accountReward: String
  accountSlash: String
  accountTotal: String
}

export interface SumRewardUpdateInput {
  accountReward?: String | null
  accountSlash?: String | null
  accountTotal?: String | null
}

export interface SumRewardWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  accountReward_eq?: BigInt | null
  accountReward_gt?: BigInt | null
  accountReward_gte?: BigInt | null
  accountReward_lt?: BigInt | null
  accountReward_lte?: BigInt | null
  accountReward_in?: BigInt[] | BigInt | null
  accountSlash_eq?: BigInt | null
  accountSlash_gt?: BigInt | null
  accountSlash_gte?: BigInt | null
  accountSlash_lt?: BigInt | null
  accountSlash_lte?: BigInt | null
  accountSlash_in?: BigInt[] | BigInt | null
  accountTotal_eq?: BigInt | null
  accountTotal_gt?: BigInt | null
  accountTotal_gte?: BigInt | null
  accountTotal_lt?: BigInt | null
  accountTotal_lte?: BigInt | null
  accountTotal_in?: BigInt[] | BigInt | null
  rewards_none?: StakingRewardWhereInput | null
  rewards_some?: StakingRewardWhereInput | null
  rewards_every?: StakingRewardWhereInput | null
  slashs_none?: StakingSlashWhereInput | null
  slashs_some?: StakingSlashWhereInput | null
  slashs_every?: StakingSlashWhereInput | null
  AND?: SumRewardWhereInput[] | SumRewardWhereInput | null
  OR?: SumRewardWhereInput[] | SumRewardWhereInput | null
}

export interface SumRewardWhereUniqueInput {
  id: ID_Output
}

export interface BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface DeleteResponse {
  id: ID_Output
}

export interface BaseModel extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface BaseModelUUID extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface Hello {
  greeting: String
}

export interface NoBondRecordAccount extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  firstRewardAt: Int
}

export interface NoBondRecordAccountConnection {
  totalCount: Int
  edges: Array<NoBondRecordAccountEdge>
  pageInfo: PageInfo
}

export interface NoBondRecordAccountEdge {
  node: NoBondRecordAccount
  cursor: String
}

export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String | null
  endCursor?: String | null
}

export interface ProcessorState {
  lastCompleteBlock: Float
  lastProcessedEvent: String
  indexerHead: Float
  chainHead: Float
}

export interface StakingReward extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  account: SumReward
  accountId: String
  balance: BigInt
  date: DateTime
}

export interface StakingRewardConnection {
  totalCount: Int
  edges: Array<StakingRewardEdge>
  pageInfo: PageInfo
}

export interface StakingRewardEdge {
  node: StakingReward
  cursor: String
}

export interface StakingSlash extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  account: SumReward
  accountId: String
  balance: BigInt
  date: DateTime
}

export interface StakingSlashConnection {
  totalCount: Int
  edges: Array<StakingSlashEdge>
  pageInfo: PageInfo
}

export interface StakingSlashEdge {
  node: StakingSlash
  cursor: String
}

export interface StandardDeleteResponse {
  id: ID_Output
}

export interface SumReward extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  accountReward: BigInt
  accountSlash: BigInt
  accountTotal: BigInt
  rewards?: Array<StakingReward> | null
  slashs?: Array<StakingSlash> | null
}

export interface SumRewardConnection {
  totalCount: Int
  edges: Array<SumRewardEdge>
  pageInfo: PageInfo
}

export interface SumRewardEdge {
  node: SumReward
  cursor: String
}

/*
GraphQL representation of BigInt
*/
export type BigInt = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The javascript `Date` as string. Type represents date and time as the ISO Date string.
*/
export type DateTime = Date | string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).
*/
export type Float = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string