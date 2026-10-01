import { useMemo } from 'react'
import { Pool } from '../../pool/pool.types'
import { getCanStake } from '../../pool/actions/stake.helpers'
import { GqlPoolStakingTypeValues } from '@repo/lib/shared/services/api/graphql-enums'

export enum ExpandedPoolType {
  Staked = 'staked',
  Reliquary = 'reliquary',
  Unstaked = 'unstaked',
  Default = 'default',
}

export type ExpandedPoolInfo = Pool & {
  poolType: ExpandedPoolType
  poolPositionUsd: number
  uniqueKey: string
}

function generateUniqueKey(...args: string[]) {
  return args.join(' - ')
}

export const StakingFilterKey = {
  Staked: 'Staked',
  Reliquary: 'Reliquary',
  Unstaked: 'Unstaked',
  Default: 'Default',
} as const

export type StakingFilterKeyType = (typeof StakingFilterKey)[keyof typeof StakingFilterKey]

// Maps UI filter keys to the actual pool types they represent
export const STAKING_FILTER_MAP: Record<StakingFilterKeyType, ExpandedPoolType[]> = {
  [StakingFilterKey.Staked]: [ExpandedPoolType.Staked],
  [StakingFilterKey.Reliquary]: [ExpandedPoolType.Reliquary],
  [StakingFilterKey.Unstaked]: [ExpandedPoolType.Unstaked],
  [StakingFilterKey.Default]: [ExpandedPoolType.Default],
}

// Maps UI filter keys to their display labels
export const STAKING_LABEL_MAP: Record<StakingFilterKeyType, string> = {
  [StakingFilterKey.Staked]: 'Staked',
  [StakingFilterKey.Reliquary]: 'maBEETS',
  [StakingFilterKey.Unstaked]: 'Unstaked',
  [StakingFilterKey.Default]: 'N/A',
}

export function useExpandedPools(pools: Pool[]) {
  const expandedPools = useMemo(() => {
    const expandedPools: ExpandedPoolInfo[] = []

    pools.forEach(pool => {
      const stakedBalances = pool.userBalance?.stakedBalances ?? []

      const stakedUsdFor = (stakingType: string) =>
        stakedBalances
          .filter(balance => balance.stakingType === stakingType)
          .reduce((acc, balance) => acc + Number(balance.balanceUsd), 0)

      const gaugeStakedUsd = stakedUsdFor(GqlPoolStakingTypeValues.Gauge)
      const reliquaryStakedUsd = stakedUsdFor(GqlPoolStakingTypeValues.Reliquary)
      const walletBalanceUsd = pool.userBalance?.walletBalanceUsd || 0

      if (gaugeStakedUsd > 0) {
        expandedPools.push({
          ...pool,
          poolType: ExpandedPoolType.Staked,
          poolPositionUsd: gaugeStakedUsd,
          uniqueKey: generateUniqueKey(pool.id, ExpandedPoolType.Staked),
        })
      }

      if (reliquaryStakedUsd > 0) {
        expandedPools.push({
          ...pool,
          poolType: ExpandedPoolType.Reliquary,
          poolPositionUsd: reliquaryStakedUsd,
          uniqueKey: generateUniqueKey(pool.id, ExpandedPoolType.Reliquary),
        })
      }

      if (walletBalanceUsd > 0) {
        const poolType = getCanStake(pool) ? ExpandedPoolType.Unstaked : ExpandedPoolType.Default

        expandedPools.push({
          ...pool,
          poolType,
          poolPositionUsd: walletBalanceUsd,
          uniqueKey: generateUniqueKey(pool.id, poolType),
        })
      }

      if (gaugeStakedUsd === 0 && reliquaryStakedUsd === 0 && walletBalanceUsd === 0) {
        expandedPools.push({
          ...pool,
          poolType: ExpandedPoolType.Default,
          poolPositionUsd: 0,
          uniqueKey: generateUniqueKey(pool.id, ExpandedPoolType.Default),
        })
      }
    })

    return expandedPools
  }, [pools])

  return expandedPools
}
