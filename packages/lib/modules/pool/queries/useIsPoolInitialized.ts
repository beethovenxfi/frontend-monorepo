import { useReadContract } from '@repo/lib/shared/utils/wagmi'
import { Address, parseAbi } from 'viem'
import { AddressProvider } from '@balancer/sdk'

type Params = {
  chainId: number
  poolAddress: Address | undefined
}

export function useIsPoolInitialized({ chainId, poolAddress }: Params) {
  const {
    data: isV3PoolInitialized,
    isLoading: isLoadingV3,
    refetch: refetchIsV3PoolInitialized,
  } = useReadContract({
    chainId,
    abi: parseAbi(['function isPoolInitialized(address) view returns (bool)']),
    address: AddressProvider.Vault(chainId),
    functionName: 'isPoolInitialized',
    args: poolAddress ? [poolAddress] : undefined,
    query: { enabled: !!poolAddress },
  })

  return {
    isPoolInitialized: !!isV3PoolInitialized,
    isLoadingPoolInitialized: isLoadingV3,
    refetchIsPoolInitialized: refetchIsV3PoolInitialized,
  }
}
