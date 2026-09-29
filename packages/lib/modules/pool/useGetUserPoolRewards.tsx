'use client'

import { useMemo } from 'react'
import { sumBy } from 'lodash'
import { Pool } from './pool.types'
import { formatUnits } from 'viem'
import { useGetPoolRewards } from './useGetPoolRewards'
import { ClaimableReward } from '../portfolio/PortfolioClaim/useClaimableBalances'

export type GetUserPoolRewardsParams = {
  pool: Pool
  rewards: ClaimableReward[]
}

export function useGetUserPoolRewards({ pool, rewards }: GetUserPoolRewardsParams) {
  const { tokens } = useGetPoolRewards(pool)

  const myClaimableRewards = useMemo(
    () => sumBy(rewards, reward => reward.fiatBalance.toNumber()),
    [rewards]
  )

  const rewardsByToken = useMemo(() => {
    if (!tokens.length) return {}

    const balanceMap: Record<string, string> = {}

    rewards.forEach(reward => {
      if (reward.tokenAddress) {
        const token = tokens.find(t => t?.address === reward.tokenAddress)
        const decimals = token?.decimals || 18

        balanceMap[reward.tokenAddress] = formatUnits(reward.balance, decimals)
      }
    })

    return balanceMap
  }, [rewards, tokens])

  return {
    claimableRewards: rewards,
    myClaimableRewards,
    tokens,
    rewardsByToken,
  }
}
