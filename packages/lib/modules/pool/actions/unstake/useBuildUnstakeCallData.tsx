import { GaugeService } from '@repo/lib/shared/services/staking/gauge.service'
import { Address, Hex } from 'viem'

type Params = {
  amount: bigint
  gaugeService: GaugeService | undefined
  gauges: Address[]
  hasUnclaimedRewards: boolean
  userAddress: Address
}

export function useBuildUnstakeCallData({
  amount,
  gaugeService,
  gauges,
  hasUnclaimedRewards,
  userAddress,
}: Params): Hex[] {
  if (!amount) return []
  if (!gaugeService) return []
  if (!userAddress) return []

  const inputData = {
    hasUnclaimedRewards,
    gauges,
    sender: userAddress || '',
    recipient: userAddress || '',
    amount,
  }

  return gaugeService.getGaugeClaimRewardsAndWithdrawContractCallData(inputData)
}
