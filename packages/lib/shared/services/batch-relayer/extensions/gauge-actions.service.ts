import { encodeFunctionData, Hex } from 'viem'
import { balancerV2BatchRelayerLibraryAbi } from '@repo/lib/modules/web3/contracts/abi/generated'
import {
  EncodeGaugeClaimRewardsInput,
  EncodeGaugeDepositInput,
  EncodeGaugeWithdrawInput,
} from '../relayer-types'

export class GaugeActionsService {
  public encodeDeposit(params: EncodeGaugeDepositInput): Hex {
    return encodeFunctionData({
      abi: balancerV2BatchRelayerLibraryAbi,
      functionName: 'gaugeDeposit',
      args: [params.gauge, params.sender, params.recipient, params.amount],
    })
  }

  public encodeWithdraw(params: EncodeGaugeWithdrawInput): Hex {
    return encodeFunctionData({
      abi: balancerV2BatchRelayerLibraryAbi,
      functionName: 'gaugeWithdraw',
      args: [params.gauge, params.sender, params.recipient, params.amount],
    })
  }

  public encodeClaimRewards(params: EncodeGaugeClaimRewardsInput): Hex {
    return encodeFunctionData({
      abi: balancerV2BatchRelayerLibraryAbi,
      functionName: 'gaugeClaimRewards',
      args: [params.gauges],
    })
  }
}

export const gaugeActionsService = new GaugeActionsService()
