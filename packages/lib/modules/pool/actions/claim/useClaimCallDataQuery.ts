import { useQuery } from '@tanstack/react-query'
import { Address, Hex } from 'viem'
import { GaugeService } from '@repo/lib/shared/services/staking/gauge.service'

export function useClaimCallDataQuery({
  claimRewardGauges,
  gaugeService,
  enabled = true,
}: {
  claimRewardGauges: Address[]
  gaugeService: GaugeService | undefined
  enabled?: boolean
}) {
  const queryKey = ['claim', 'gauge', 'callData', claimRewardGauges]

  const queryFn = (): `0x${string}`[] => {
    if (!gaugeService) return []

    const calls: Hex[] = []

    if (claimRewardGauges.length > 0) {
      const claimRewardsCallData = gaugeService.getGaugeEncodeClaimRewardsCallData({
        gauges: claimRewardGauges,
      })

      calls.push(claimRewardsCallData)
    }

    return calls
  }

  const query = useQuery({
    queryKey,
    queryFn,
    enabled: enabled && !!gaugeService && claimRewardGauges.length > 0,
  })

  return {
    ...query,
    data: query.data || [],
  }
}
