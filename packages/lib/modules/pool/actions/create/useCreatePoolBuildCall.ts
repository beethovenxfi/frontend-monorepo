import { useQuery } from '@tanstack/react-query'
import { useUserAccount } from '@repo/lib/modules/web3/UserAccountProvider'
import { CreatePool } from '@balancer/sdk'
import { CreatePoolInput } from './types'
import { type TransactionConfig } from '@repo/lib/modules/web3/contracts/contract.types'
import { sentryMetaForCreatePoolHandler } from '@repo/lib/shared/utils/query-errors'
import { useBlockNumber } from 'wagmi'

type Props = {
  createPoolInput: CreatePoolInput
  enabled: boolean
}

export function useCreatePoolBuildCall({ createPoolInput, enabled }: Props) {
  const { userAddress, isConnected } = useUserAccount()
  const { data: blockNumber } = useBlockNumber()

  const createPool = new CreatePool()

  const queryFn = async (): Promise<TransactionConfig> => {
    if (createPoolInput.protocolVersion === 3) {
      const { callData, to } = createPool.buildCall(createPoolInput)
      return {
        chainId: createPoolInput.chainId,
        account: userAddress,
        data: callData,
        to,
      }
    }

    throw new Error('Unsupported protocol version for create pool build call')
  }

  return useQuery({
    queryKey: ['create-pool-build-call', createPoolInput],
    queryFn,
    enabled: enabled && isConnected,
    gcTime: 0,
    meta: sentryMetaForCreatePoolHandler('Error in create pool build call', {
      ...createPoolInput,
      blockNumber,
    }),
  })
}
