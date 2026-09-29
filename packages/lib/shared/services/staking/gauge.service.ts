import { Address, Hex } from 'viem'
import { BatchRelayerService } from '../batch-relayer/batch-relayer.service'
import {
  EncodeGaugeClaimRewardsInput,
  EncodeGaugeWithdrawInput,
} from '../batch-relayer/relayer-types'

interface ClaimCallDataArgs {
  hasUnclaimedRewards: boolean
  gauges: Address[]
}

interface ClaimAndWithdrawCallDataArgs extends ClaimCallDataArgs {
  sender: Address
  recipient: Address
  amount: bigint
}

export class GaugeService {
  constructor(private readonly batchRelayerService: BatchRelayerService) {}

  public getGaugeClaimRewardsAndWithdrawContractCallData({
    hasUnclaimedRewards,
    gauges,
    sender,
    recipient,
    amount,
  }: ClaimAndWithdrawCallDataArgs) {
    const calls: Hex[] = []

    const rewardsCalls = this.getGaugeClaimRewardsContractCallData({
      hasUnclaimedRewards,
      gauges,
    })

    if (rewardsCalls.length) {
      calls.push(...rewardsCalls)
    }

    const gauge = gauges[0]

    if (gauge) {
      calls.push(this.getGaugeEncodeWithdrawCallData({ gauge, sender, recipient, amount }))
    }

    return calls
  }

  public getGaugeClaimRewardsContractCallData({ hasUnclaimedRewards, gauges }: ClaimCallDataArgs) {
    const calls: Hex[] = []

    if (hasUnclaimedRewards) {
      calls.push(this.getGaugeEncodeClaimRewardsCallData({ gauges }))
    }

    return calls
  }

  private getGaugeEncodeWithdrawCallData({
    gauge,
    sender,
    recipient,
    amount,
  }: EncodeGaugeWithdrawInput): Hex {
    return this.batchRelayerService.gaugeEncodeWithdraw({ gauge, sender, recipient, amount })
  }

  public getGaugeEncodeClaimRewardsCallData({ gauges }: EncodeGaugeClaimRewardsInput): Hex {
    return this.batchRelayerService.gaugeEncodeClaimRewards({ gauges })
  }
}
