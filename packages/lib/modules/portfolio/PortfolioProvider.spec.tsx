import { bn } from '@repo/lib/shared/utils/numbers'
import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'
import { Pool } from '../pool/pool.types'
import { ClaimableReward } from './PortfolioClaim/useClaimableBalances'
import { buildPoolRewardsMap } from './PortfolioProvider'

const pool = { id: 'sonic-pool', chain: GqlChainValues.Sonic } as Pool

const reward = {
  poolId: pool.id,
  fiatBalance: bn(2.5),
} as ClaimableReward

describe('buildPoolRewardsMap', () => {
  it('preserves a staked pool with no claimable rewards', () => {
    const result = buildPoolRewardsMap([pool], {})

    expect(result[pool.id]?.claimableRewards).toBeUndefined()
    expect(result[pool.id]?.totalFiatClaimBalance?.isZero()).toBe(true)
  })

  it('preserves Sonic gauge rewards and sums their fiat value', () => {
    const secondReward = { ...reward, fiatBalance: bn(1.5) }
    const result = buildPoolRewardsMap([pool], { [pool.id]: [reward, secondReward] })

    expect(result[pool.id]?.claimableRewards).toEqual([reward, secondReward])
    expect(result[pool.id]?.totalFiatClaimBalance?.toNumber()).toBe(4)
  })
})
