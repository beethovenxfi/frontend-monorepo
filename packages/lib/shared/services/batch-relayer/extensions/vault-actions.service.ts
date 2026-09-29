import { encodeFunctionData } from 'viem'
import { EncodeExitPoolInput, EncodeJoinPoolInput } from '../relayer-types'
import { beetsV2BatchRelayerLibraryAbi } from '@repo/lib/modules/web3/contracts/abi/generated'

export class VaultActionsService {
  public encodeExitPool(params: EncodeExitPoolInput): string {
    return encodeFunctionData({
      abi: beetsV2BatchRelayerLibraryAbi,
      functionName: 'exitPool',
      args: [
        params.poolId,
        params.poolKind,
        params.sender,
        params.recipient,
        params.exitPoolRequest,
        params.outputReferences,
      ],
    })
  }

  public encodeJoinPool(params: EncodeJoinPoolInput): string {
    return encodeFunctionData({
      abi: beetsV2BatchRelayerLibraryAbi,
      functionName: 'joinPool',
      args: [
        params.poolId,
        params.poolKind,
        params.sender,
        params.recipient,
        params.joinPoolRequest,
        params.value,
        params.outputReference,
      ],
    })
  }
}

export const vaultActionsService = new VaultActionsService()
