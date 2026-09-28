import { useQuery } from '@tanstack/react-query'
import {
  getNativeAssetAddress,
  getNetworkConfig,
  getWrappedNativeAssetAddress,
} from '@repo/lib/config/app.config'
import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'
import { useTokens } from './TokensProvider'
import { Address, erc20Abi, formatUnits } from 'viem'
import { getBalance, multicall } from 'wagmi/actions'
import { useConfig } from 'wagmi'
import { useUserAccount } from '../web3/UserAccountProvider'
import { isAddress } from 'viem'
import { includesAddress } from '@repo/lib/shared/utils/addresses'
import { bn } from '@repo/lib/shared/utils/numbers'
import { useMemo } from 'react'
import { captureNonFatalError } from '@repo/lib/shared/utils/query-errors'

const MIN_TOKEN_VALUE_USD = 1
const BALANCE_STALE_TIME = 30_000
const CHAIN = GqlChainValues.Sonic

export function useWalletTokenBalances(enabled: boolean) {
  const { userAddress, isConnected } = useUserAccount()
  const config = useConfig()
  const { getTokensByChain, priceFor, isLoadingTokens, isLoadingTokenPrices } = useTokens()

  const balanceQuery = useQuery({
    queryKey: ['wallet-token-balances', userAddress],
    queryFn: async () => {
      const networkConfig = getNetworkConfig(CHAIN)
      const chainTokens = getTokensByChain(CHAIN)
      const nativeAddress = getNativeAssetAddress(CHAIN)

      const erc20Tokens = chainTokens.filter(
        token => !includesAddress([nativeAddress], token.address)
      )

      try {
        const [nativeBalance, tokenBalances] = await Promise.all([
          getBalance(config, {
            chainId: networkConfig.chainId,
            address: userAddress as Address,
          }),
          erc20Tokens.length > 0
            ? multicall(config, {
                chainId: networkConfig.chainId,
                contracts: erc20Tokens.map(token => ({
                  chainId: networkConfig.chainId,
                  abi: erc20Abi,
                  address: token.address as Address,
                  functionName: 'balanceOf',
                  args: [userAddress as Address],
                })),
                allowFailure: true,
                batchSize: 0,
              })
            : Promise.resolve([]),
        ])

        return { nativeBalance, tokenBalances, erc20Tokens, success: true as const }
      } catch (error) {
        captureNonFatalError({
          error,
          errorName: 'WalletTokenBalancesError',
          errorMessage: 'Error fetching wallet token balances',
        })

        return { success: false as const, error }
      }
    },
    enabled: enabled && isConnected && isAddress(userAddress) && !isLoadingTokens,
    staleTime: BALANCE_STALE_TIME,
  })

  const tokenAddresses = useMemo(() => {
    if (!enabled || !balanceQuery.data || !balanceQuery.data.success) return []

    const { nativeBalance, tokenBalances, erc20Tokens } = balanceQuery.data
    const addresses: string[] = []

    const nativeAddress = getNativeAssetAddress(CHAIN)
    const wrappedNativeAddress = getWrappedNativeAssetAddress(CHAIN)
    const nativePrice = priceFor(nativeAddress, CHAIN)

    const nativeBalanceUsd = bn(formatUnits(nativeBalance.value, nativeBalance.decimals)).times(
      nativePrice
    )

    if (nativeBalanceUsd.gte(MIN_TOKEN_VALUE_USD)) {
      addresses.push(nativeAddress, wrappedNativeAddress)
    }

    erc20Tokens.forEach((token, tokenIndex) => {
      const balanceResult = tokenBalances[tokenIndex]
      if (balanceResult?.status !== 'success') return

      const amount = balanceResult.result as bigint
      if (amount <= 0n) return

      const usdValue = bn(formatUnits(amount, token.decimals)).times(priceFor(token.address, CHAIN))

      if (usdValue.gte(MIN_TOKEN_VALUE_USD) && !includesAddress(addresses, token.address)) {
        addresses.push(token.address)
      }
    })

    return addresses
  }, [enabled, balanceQuery.data, priceFor])

  const isLoading = isLoadingTokens || isLoadingTokenPrices || balanceQuery.isLoading

  const errors = balanceQuery.data && !balanceQuery.data.success ? [balanceQuery.data.error] : []

  const hasBalance = (tokenAddress: string): boolean => {
    if (!tokenAddress) return false
    return includesAddress(tokenAddresses, tokenAddress)
  }

  return {
    tokenAddresses,
    isLoading,
    errors,
    hasBalance,
  }
}
