import BN from 'bn.js'
import { DatabaseManager, EventContext, StoreContext } from '@subsquid/hydra-common'
import { NoBondRecordAccount, StakingReward, StakingSlash, SumReward } from '../generated/model'
import { Staking } from '../chain'

export async function handleBond({
  store,
  event,
  block,
  extrinsic
}: EventContext & StoreContext): Promise<void> {
  const [accountID, balance] = new Staking.BondedEvent(event).params

  let sumReward = await getOrCreate(store, SumReward, accountID.toHex())

  sumReward.accountReward = new BN(0)
  sumReward.accountSlash = new BN(0)
  sumReward.accountTotal = new BN(0)

  await store.save(sumReward)
}

export async function handleReward({
  store,
  event,
  block,
  extrinsic
}: EventContext & StoreContext): Promise<void> {
  const [accountID, newReward] = new Staking.RewardEvent(event).params

  let sumReward = await getOrCreate(store, SumReward, accountID.toHex())

  sumReward.accountReward = sumReward.accountReward.add(newReward)
  sumReward.accountTotal = sumReward.accountTotal.sub(sumReward.accountSlash)

  await store.save(sumReward)
}

export async function handleSlash({
  store,
  event,
  block,
  extrinsic
}: EventContext & StoreContext): Promise<void> {
  const [accountID, newSlash] = new Staking.SlashEvent(event).params

  let sumReward = await getOrCreate(store, SumReward, accountID.toHex())

  sumReward.accountSlash = sumReward.accountSlash.add(newSlash)
  sumReward.accountTotal = sumReward.accountTotal.sub(sumReward.accountSlash)

  await store.save(sumReward)
}

export async function handleStakingReward({
  store,
  event,
  block,
  extrinsic
}: EventContext & StoreContext): Promise<void> {
  const [accountID, balance] = new Staking.RewardEvent(event).params

  let reward = await getOrCreate(store, StakingReward, `${event.blockNumber}-${event.id}`)

  reward.account = await getOrCreate(store, SumReward, accountID.toHex())
  reward.balance = balance
  reward.date = new Date(block.timestamp)
  
  await store.save(reward)
}

export async function handleStakingSlash({
  store,
  event,
  block,
  extrinsic
}: EventContext & StoreContext): Promise<void> {
  const [accountID, balance] = new Staking.SlashEvent(event).params

  let slash = await getOrCreate(store, StakingSlash, `${event.blockNumber}-${event.id}`)

  slash.account = await getOrCreate(store, SumReward, accountID.toHex())
  slash.balance = balance
  slash.date = new Date(block.timestamp)

  await store.save(slash)
}

async function getOrCreate<T extends {id: string}>(
  store: DatabaseManager,
  entityConstructor: EntityConstructor<T>,
  id: string
): Promise<T> {

  let e = await store.get(entityConstructor, {
    where: { id },
  })

  if (e == null) {
    e = new entityConstructor()
    e.id = id
  }

  return e
}


type EntityConstructor<T> = {
  new (...args: any[]): T
}