import {Resolver, ObjectType, Field, Query} from "type-graphql"
import {InjectManager} from "typeorm-typedi-extensions"
import {EntityManager} from "typeorm"
import {StakingReward, StakingSlash} from "../generated/model"


@ObjectType()
export class Hello {
  @Field(() => String, { nullable: false })
  greeting!: string

  constructor(greeting: string) {
    this.greeting = greeting
  }
}


@Resolver()
export class HelloResolver {
  constructor(
    @InjectManager() private db: EntityManager
  ) {}

  @Query(() => Hello)
  async hello(): Promise<Hello> {
    let rewardCount = await this.db.getRepository(StakingReward).createQueryBuilder().getCount()
    let slashCount = await this.db.getRepository(StakingSlash).createQueryBuilder().getCount()
    return new Hello(`Hello, we've seen ${rewardCount} staking rewards and ${slashCount} staking slashes!`)
  }
}