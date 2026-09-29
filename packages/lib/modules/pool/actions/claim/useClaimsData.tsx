'use client'

import { useClaimableBalances } from '@repo/lib/modules/portfolio/PortfolioClaim/useClaimableBalances'
import { safeSum } from '@repo/lib/shared/utils/numbers'
import { useMemo } from 'react'
import { ClaimablePool } from './ClaimProvider'

export function useClaimsData(pools: ClaimablePool[]) {
  const claimableBalancesQuery = useClaimableBalances(pools)
  const allClaimableRewards = claimableBalancesQuery.claimableRewards

  const totalClaimableUsd = useMemo(
    () => safeSum(allClaimableRewards.map(reward => reward.fiatBalance)),
    [allClaimableRewards]
  )

  const hasNoRewards = allClaimableRewards.length === 0

  return {
    isLoading: claimableBalancesQuery.isLoadingClaimableRewards,
    allClaimableRewards,
    totalClaimableUsd,
    hasNoRewards,
    claimableBalancesQuery,
  }
}
