import { cloneDeep } from 'lodash'
import { Address, formatUnits, parseAbi } from 'viem'
import { useReadContracts } from 'wagmi'
import { useTokens } from '../../tokens/TokensProvider'
import { Pool } from '../pool.types'
import { BPT_DECIMALS } from '../pool.constants'
import type { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { bn, safeSum } from '@repo/lib/shared/utils/numbers'
import { getVaultConfig, isV2Pool, isV3Pool } from '../pool.helpers'
import { getChainId } from '@repo/lib/config/app.config'
import {
  balancerV2ComposableStablePoolV5Abi,
  balancerV2VaultAbi,
} from '../../web3/contracts/abi/generated'
import { isComposableStablePool } from '../pool.utils'
import { vaultExtensionAbi_V3 } from '@balancer/sdk'
import { getCompositionTokens } from '../pool-tokens.utils'

const totalSupplyAbi = parseAbi(['function totalSupply() view returns (uint256)'])

export function usePoolEnrichWithOnChainData(pool: Pool) {
  const { priceFor, isLoadingTokenPrices } = useTokens()

  const {
    isLoading: isLoadingPool,
    poolTokenBalances,
    isPoolInRecoveryMode,
    totalSupply,
    refetch,
  } = usePoolOnchainData(pool)

  const clone = enrichPool({
    isLoading: isLoadingTokenPrices || isLoadingPool,
    pool,
    priceFor,
    poolTokenBalances,
    isPoolInRecoveryMode,
    totalSupply,
  })

  return { isLoading: isLoadingTokenPrices || isLoadingPool, pool: clone, refetch }
}

/*
  We call all queries to avoid breaking the rules of react hooks
  but only one query will be executed (the one with enabled: true)
*/
function usePoolOnchainData(pool: Pool) {
  const v2Result = useV2PoolOnchainData(pool)
  const v3Result = useV3PoolOnchainData(pool)

  if (isV2Pool(pool)) return v2Result
  if (isV3Pool(pool)) return v3Result

  throw new Error(`Unsupported pool: protocolVersion ${pool.protocolVersion}, type ${pool.type}`)
}

function useV3PoolOnchainData(pool: Pool) {
  const { vaultAddress } = getVaultConfig(pool)
  const chainId = getChainId(pool.chain)

  const v3Query = useReadContracts({
    query: {
      enabled: isV3Pool(pool),
    },
    allowFailure: false,
    contracts: [
      {
        chainId,
        abi: vaultExtensionAbi_V3,
        address: vaultAddress,
        functionName: 'getPoolTokenInfo',
        args: [pool.address as Address],
      },
      {
        chainId,
        abi: totalSupplyAbi,
        address: pool.address as Address,
        functionName: 'totalSupply',
        args: [],
      },
      {
        chainId,
        abi: vaultExtensionAbi_V3,
        address: vaultAddress,
        functionName: 'getPoolConfig',
        args: [pool.address as Address],
      },
    ],
  })

  return {
    ...v3Query,
    poolTokenBalances: v3Query.data?.[0][2],
    isPoolInRecoveryMode: v3Query.data?.[2].isPoolInRecoveryMode,
    totalSupply: v3Query.data?.[1],
  }
}

function useV2PoolOnchainData(pool: Pool) {
  const { vaultAddress } = getVaultConfig(pool)
  const chainId = getChainId(pool.chain)
  const isComposableStable = isComposableStablePool(pool)

  const v2Query = useReadContracts({
    query: {
      enabled: isV2Pool(pool),
    },
    allowFailure: false,
    contracts: [
      {
        chainId,
        abi: balancerV2VaultAbi,
        address: vaultAddress,
        functionName: 'getPoolTokens',
        args: [pool.id as Address],
      },
      {
        chainId,
        // composable stable pool has actual and total supply functions exposed
        abi: balancerV2ComposableStablePoolV5Abi,
        address: pool.address as Address,
        functionName: isComposableStable ? 'getActualSupply' : 'totalSupply',
      } as const,
    ],
  })

  return {
    ...v2Query,
    poolTokenBalances: v2Query.data?.[0][1],
    isPoolInRecoveryMode: undefined,
    totalSupply: v2Query.data?.[1],
  }
}

type Params = {
  isLoading: boolean
  pool: Pool
  priceFor: (address: string, chain: GqlChain) => number
  poolTokenBalances: readonly bigint[] | undefined
  isPoolInRecoveryMode: boolean | undefined
  totalSupply: bigint | undefined
}

function enrichPool({
  isLoading,
  pool,
  priceFor,
  poolTokenBalances,
  isPoolInRecoveryMode,
  totalSupply,
}: Params) {
  if (isLoading || !poolTokenBalances) return pool

  const clone = cloneDeep(pool)

  const filteredTokens = getCompositionTokens(clone)

  clone.poolTokens.forEach((token, index) => {
    if (!poolTokenBalances) return
    const poolTokenBalance = poolTokenBalances[index]
    if (poolTokenBalance === undefined) return
    const tokenBalance = formatUnits(poolTokenBalance, token.decimals)
    token.balance = tokenBalance
    token.balanceUSD = bn(tokenBalance).times(priceFor(token.address, pool.chain)).toString()
  })

  clone.dynamicData.totalLiquidity = safeSum(
    filteredTokens.map(
      token => (priceFor(token.address, pool.chain) || 0) * parseFloat(token.balance)
    )
  )

  clone.dynamicData.totalShares = formatUnits(totalSupply || 0n, BPT_DECIMALS)

  if (isPoolInRecoveryMode !== undefined) clone.dynamicData.isInRecoveryMode = isPoolInRecoveryMode

  return clone
}
