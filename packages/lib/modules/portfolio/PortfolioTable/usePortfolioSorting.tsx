import type { GqlPoolOrderBy } from '@repo/lib/shared/services/api/generated/graphql'
import { useMemo, useCallback, useReducer, useEffect } from 'react'
import { getCanStake } from '../../pool/actions/stake.helpers'
import { getTotalApr } from '../../pool/pool.utils'
import { ExpandedPoolInfo, ExpandedPoolType } from './useExpandedPools'
import { usePortfolioFilters } from './PortfolioFiltersProvider'
import { bn } from '@repo/lib/shared/utils/numbers'

export type PortfolioTableSortingId = 'staking' | 'liquidity' | 'apr'
export interface PortfolioSortingData {
  id: PortfolioTableSortingId | GqlPoolOrderBy
  desc: boolean
}

export const portfolioOrderByFn: () => {
  title: string
  id: PortfolioTableSortingId
}[] = () => [
  {
    title: 'Staking',
    id: 'staking',
  },
  {
    title: 'My liquidity',
    id: 'liquidity',
  },
  {
    title: 'APR',
    id: 'apr',
  },
]

const generateStakingWeightForSort = (pool: ExpandedPoolInfo) => {
  const canStake = getCanStake(pool)

  if (canStake) {
    return (
      Number(
        pool.poolType === ExpandedPoolType.Staked || pool.poolType === ExpandedPoolType.Reliquary
      ) *
        20 +
      Number(pool.poolType === ExpandedPoolType.Unstaked) * 10
    )
  } else {
    return 0 // send all pools without staking to the bottom of the table
  }
}

type SortingState = PortfolioSortingData | null

type SortingAction =
  { type: 'SET_SORTING'; payload: PortfolioSortingData } | { type: 'RESET_SORTING' }

function sortingReducer(state: SortingState, action: SortingAction): SortingState {
  switch (action.type) {
    case 'SET_SORTING':
      return action.payload
    case 'RESET_SORTING':
      return null
    default:
      return state
  }
}

export function usePortfolioSorting() {
  const { filteredExpandedPools, selectedPoolTypes, selectedStakingTypes } = usePortfolioFilters()

  const [manualSortingObj, dispatch] = useReducer(sortingReducer, null)

  // need useMemo here to prevent infinite loop in useEffect below
  const filterStateKey = useMemo(() => {
    return `${selectedPoolTypes?.length || 0}-${selectedStakingTypes?.length || 0}`
  }, [selectedPoolTypes, selectedStakingTypes])

  // Dispatch reset when filter state changes
  useEffect(() => {
    dispatch({ type: 'RESET_SORTING' })
  }, [filterStateKey])

  const currentSortingObj = useMemo(() => {
    if (manualSortingObj) {
      return manualSortingObj
    }

    // set sorting to liquidity when any filter is applied
    if (
      (selectedPoolTypes && selectedPoolTypes.length > 0) ||
      (selectedStakingTypes && selectedStakingTypes.length > 0)
    ) {
      return { id: 'liquidity' as const, desc: true }
    } else {
      // set sorting to staking when no filters are applied
      return { id: 'staking' as const, desc: true }
    }
  }, [selectedPoolTypes, selectedStakingTypes, manualSortingObj])

  const setSorting = useCallback((sorting: PortfolioSortingData) => {
    dispatch({ type: 'SET_SORTING', payload: sorting })
  }, [])

  const sortedPools = useMemo(() => {
    if (!filteredExpandedPools?.length) return []
    const arr = [...filteredExpandedPools]

    return arr.sort((a, b) => {
      if (currentSortingObj.id === 'staking') {
        const aStakingWeight = generateStakingWeightForSort(a)
        const bStakingWeight = generateStakingWeightForSort(b)

        const weightDiff = currentSortingObj.desc
          ? bStakingWeight - aStakingWeight
          : aStakingWeight - bStakingWeight

        // If weights are equal, use pool position USD as a tie-breaker (higher value first)
        if (weightDiff === 0) {
          const aPositionUsd = a.poolPositionUsd || 0
          const bPositionUsd = b.poolPositionUsd || 0
          // Always sort by position USD descending, regardless of primary sort direction
          return bPositionUsd - aPositionUsd
        }

        return weightDiff
      }

      if (currentSortingObj.id === 'liquidity') {
        const aTotalBalance = a.poolPositionUsd
        const bTotalBalance = b.poolPositionUsd

        return currentSortingObj.desc
          ? bTotalBalance - aTotalBalance
          : aTotalBalance - bTotalBalance
      }

      if (currentSortingObj.id === 'apr') {
        const [aApr] = getTotalApr(a.dynamicData.aprItems)
        const [bApr] = getTotalApr(b.dynamicData.aprItems)
        return currentSortingObj.desc
          ? bn(bApr).minus(aApr).toNumber()
          : bn(aApr).minus(bApr).toNumber()
      }

      return 0
    })
  }, [filteredExpandedPools, currentSortingObj.id, currentSortingObj.desc])

  return { sortedPools, setSorting, currentSortingObj }
}
