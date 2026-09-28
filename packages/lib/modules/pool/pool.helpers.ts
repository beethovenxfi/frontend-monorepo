import { getChainId, getNetworkConfig } from '@repo/lib/config/app.config'
import type {
  GqlPoolBase,
  GqlPoolFixedPriceLbp,
  GqlPoolGyro,
  GqlPoolLiquidityBootstrappingV3,
  GqlPoolStakingGauge,
  GqlPoolStakingOtherGauge,
  GqlPoolTokenDetail,
} from '@repo/lib/shared/services/api/graphql-derived-types'
import { HookFragment } from '@repo/lib/shared/services/api/generated/graphql'
import type {
  GqlChain,
  GqlHookType,
  GqlPoolType,
} from '@repo/lib/shared/services/api/generated/graphql'
import { GqlHookTypeValues, GqlPoolTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import { isSameAddress } from '@repo/lib/shared/utils/addresses'
import { bn, isTooSmallToRemoveUsd } from '@repo/lib/shared/utils/numbers'
import BigNumber from 'bignumber.js'
import { isEmpty, isNil } from 'lodash'
import { Address, getAddress, parseUnits, zeroAddress } from 'viem'
import { BPT_DECIMALS } from './pool.constants'
import { PoolIssue } from './alerts/pool-issues/PoolIssue.type'
import {
  getUserTotalBalanceInt,
  getUserWalletBalance,
  getUserWalletBalanceUsd,
} from './user-balance.helpers'
import { differenceInCalendarDays, secondsToMilliseconds } from 'date-fns'
import { dateToUnixTimestamp } from '@repo/lib/shared/utils/time'
import { balancerV2VaultAbi } from '../web3/contracts/abi/generated'
import { vaultAbi_V3 } from '@balancer/sdk'
import { LbpV3, Pool, PoolCore, PoolFilterType } from './pool.types'
import { getBlockExplorerAddressUrl } from '@repo/lib/shared/utils/blockExplorer'
import { allPoolTokens } from './pool-tokens.utils'
import { PoolMetadata } from './metadata/getPoolsMetadata'
import { getPoolTypeLabel } from '@repo/lib/modules/pool/pool.utils'

/**
 * METHODS
 */
export function addressFor(poolId: string): string {
  return getAddress(poolId.slice(0, 42))
}

export function isStable(poolType: GqlPoolType): boolean {
  return poolType === GqlPoolTypeValues.Stable || poolType === GqlPoolTypeValues.ComposableStable
}

export function isComposableStable(poolType: GqlPoolType): boolean {
  return poolType === GqlPoolTypeValues.ComposableStable
}

export function isComposableStableV1(pool: Pool): boolean {
  return isComposableStable(pool.type) && pool.version === 1
}

export function isBoosted(pool: Pick<PoolCore, 'protocolVersion' | 'tags'>) {
  return isV3Pool(pool) && pool.tags?.includes('BOOSTED')
}

export function isGyro(poolType: GqlPoolType) {
  return (
    [GqlPoolTypeValues.Gyro, GqlPoolTypeValues.Gyro3, GqlPoolTypeValues.GyroE] as GqlPoolType[]
  ).includes(poolType)
}

export function isClp(poolType: GqlPoolType) {
  return isGyro(poolType)
}

export function isGyroEPool(pool: Pool): pool is GqlPoolGyro {
  return pool.type === GqlPoolTypeValues.GyroE
}

export function isAutoRange(poolType: GqlPoolType): boolean {
  return poolType === GqlPoolTypeValues.Reclamm
}

export function isUnknownType(poolType: any): boolean {
  return !Object.values(GqlPoolTypeValues).includes(poolType)
}

export function isLiquidityBootstrapping(poolType: GqlPoolType): boolean {
  return (
    poolType === GqlPoolTypeValues.LiquidityBootstrapping || poolType === GqlPoolTypeValues.FixedLbp
  )
}

export function isLBP(poolType: GqlPoolType): boolean {
  return isLiquidityBootstrapping(poolType)
}

export function isV3LBP(pool: Pool): pool is LbpV3 {
  return (
    pool.__typename === 'GqlPoolLiquidityBootstrappingV3' ||
    pool.__typename === 'GqlPoolFixedPriceLBP'
  )
}

export function isFixedLBP(pool: Pool): pool is GqlPoolFixedPriceLbp {
  return pool.__typename === 'GqlPoolFixedPriceLBP'
}

export function isDynamicLBP(pool: Pool): pool is GqlPoolLiquidityBootstrappingV3 {
  return pool.__typename === 'GqlPoolLiquidityBootstrappingV3'
}

export function isWeighted(poolType: GqlPoolType): boolean {
  return poolType === GqlPoolTypeValues.Weighted
}

export function isWeightedV1(pool: Pool): boolean {
  return pool.version === 1 && isWeighted(pool.type)
}

export function isStableLike(poolType: GqlPoolType): boolean {
  return isStable(poolType) || isGyro(poolType) || isAutoRange(poolType)
}

export function isMaBeetsPool(poolId: string): boolean {
  return (
    poolId.toLowerCase() === '0x10ac2f9dae6539e77e372adb14b1bf8fbd16b3e8000200000000000000000005'
  )
}

export function isQuantAmmPool(poolType: GqlPoolType): boolean {
  return poolType === GqlPoolTypeValues.QuantAmmWeighted
}

export function getPoolActivityTitle(activeTab: string | undefined, count: number) {
  const singularTitleByTab = {
    all: 'transaction',
    adds: 'add',
    removes: 'remove',
    swaps: 'swap',
  } as const

  if (!activeTab) return ''

  const singularTitle = singularTitleByTab[activeTab as keyof typeof singularTitleByTab]
  if (!singularTitle) return activeTab

  return count === 1 ? singularTitle : `${singularTitle}s`
}

export function noInitLiquidity(pool: GqlPoolBase): boolean {
  // Uncomment to DEBUG
  // if (
  //   pool.id ===
  //   '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014'
  // )
  //   return true;
  return bn(pool.dynamicData.totalShares || '0').eq(0)
}

export function preMintedBptIndex(pool: GqlPoolBase): number | void {
  return allPoolTokens(pool).findIndex(token => isSameAddress(token.address, pool.address))
}

export function createdAfterTimestamp(pool: GqlPoolBase): boolean {
  // Pools should always have valid createTime so, for safety, we block the pool in case we don't get it
  // (createTime should probably not be treated as optional in the SDK types)
  if (!pool.createTime) return true

  const creationTimestampLimit = dateToUnixTimestamp('2023-03-29')

  // // Uncomment to debug
  // if (
  //   pool.id ===
  //   '0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080'
  // )
  //   creationTimestampLimit = dateToUnixTimestamp('2021-08-13'); //DEBUG DATE

  // Epoch timestamp is bigger if the date is older
  return pool.createTime > creationTimestampLimit
}

export function calcUserShareOfPool(pool: Pool) {
  const userBalance = getUserTotalBalanceInt(pool)
  return calcShareOfPool(pool, userBalance)
}

export function calcFutureUserShareOfPool(pool: Pool, bptAmount: BigNumber) {
  const userBalance = getUserTotalBalanceInt(pool)
  const poolBalance = calcPoolBalance(pool)

  const newUserBalance = bn(userBalance).plus(bn(bptAmount))
  const newPoolBalance = poolBalance.plus(bn(bptAmount))
  return bn(newUserBalance).div(newPoolBalance)
}

export function calcShareOfPool(pool: Pool, rawBalance: bigint) {
  const poolBalance = calcPoolBalance(pool)
  return bn(rawBalance).div(bn(poolBalance))
}

export function calcPoolBalance(pool: Pool) {
  return bn(parseUnits(pool.dynamicData.totalShares, BPT_DECIMALS))
}

export function getPoolHelpers(pool: Pool, chain: GqlChain) {
  const gaugeExplorerLink = getBlockExplorerAddressUrl(
    pool?.staking?.gauge?.gaugeAddress as Address,
    chain
  )

  const poolExplorerLink = getBlockExplorerAddressUrl(pool.address as Address, chain)
  const hasGaugeAddress = !!pool?.staking?.gauge?.gaugeAddress
  const gaugeAddress = pool?.staking?.gauge?.gaugeAddress || ''
  const chainId = getChainId(pool.chain)

  return {
    poolExplorerLink,
    gaugeExplorerLink,
    hasGaugeAddress,
    gaugeAddress,
    chainId,
  }
}

/**
 * Returns true if the gauge is claimable within this UI. Deprecated v1 gauges
 * don't conform to the same interface as v2 gauges, so they are not claimable.
 */
export function isClaimableGauge(gauge: GqlPoolStakingGauge | GqlPoolStakingOtherGauge): boolean {
  return gauge.version !== 1
}

export function hasReviewedRateProvider(token: GqlPoolTokenDetail | any): boolean {
  return !!token.priceRateProvider && !!token.priceRateProviderData
}

export function hasRateProvider(token: GqlPoolTokenDetail | any): boolean {
  const hasNoPriceRateProvider =
    isNil(token.priceRateProvider) || // if null, we consider rate provider as zero address
    token.priceRateProvider === zeroAddress

  return !hasNoPriceRateProvider && !isNil(token.priceRateProviderData)
}

export function hasReviewedHook(hook: HookFragment): boolean {
  return !!hook.reviewData
}

export function hasHooks(pool: Pool): boolean {
  return !!pool.hook
}

export function hasSurgeHook(pool: Pool): boolean {
  return hasHookType(pool, GqlHookTypeValues.StableSurge)
  // TODO: add more surge hook types
}

export function hasHookType(pool: Pool, hookType: GqlHookType): boolean {
  return pool.hook?.type === hookType
}

export function hasReviewedErc4626(token: GqlPoolTokenDetail): boolean {
  return token.isErc4626 && !!token.erc4626ReviewData
}

// Emergency flag to block adds for all V3 pools
const shouldBlockV3PoolAdds = false

/**
 * Returns true if we should block the user from adding liquidity to the pool.
 * @see https://github.com/balancer/frontend-v3/issues/613#issuecomment-2149443249
 */
export function shouldBlockAddLiquidity(pool: Pool, metadata?: PoolMetadata) {
  const reasons = getPoolAddBlockedReason(pool, metadata)
  return reasons.length > 0
}

export function getPoolAddBlockedReason(pool: Pool, metadata?: PoolMetadata): string[] {
  // we allow the metadata to override the default behavior
  if (metadata?.allowAddLiquidity === true) return []

  const reasons: string[] = []

  if (isV3Pool(pool) && shouldBlockV3PoolAdds) reasons.push('Adds are blocked for all V3 pools')
  if (isLBP(pool.type)) reasons.push('LBP pool')
  if (pool.dynamicData.isPaused) reasons.push('Paused pool')
  if (pool.dynamicData.isInRecoveryMode) reasons.push('Pool in recovery')

  if (isAffectedByV2Exploit(pool)) {
    reasons.push('This pool type is affected by an exploit. Adding liquidity is not allowed')
  }

  // reason for blocking in custom scenarios eg. maBEETS
  if (isMaBeetsPool(pool.id)) reasons.push('Please manage your liquidity on the maBEETS page')

  if (pool.hook && !hasReviewedHook(pool.hook)) reasons.push('Unreviewed hook')
  if (pool.hook?.reviewData?.summary === 'unsafe') reasons.push('Unsafe hook')

  const poolTokens = pool.poolTokens as GqlPoolTokenDetail[]

  for (const token of poolTokens) {
    // if token is not allowed - we should block adding liquidity
    if (!token.isAllowed) {
      reasons.push(`Token: ${token.symbol} is not currently supported`)
    }

    if (
      token.priceRateProvider &&
      // if rateProvider is null - we consider it as zero address and not block adding liquidity
      token.priceRateProvider !== zeroAddress
    ) {
      // if price rate provider is set but is not reviewed - we should block adding liquidity
      if (!hasReviewedRateProvider(token)) {
        reasons.push(`Rate provider for token ${token.symbol} was not yet reviewed`)
      } else if (token.priceRateProviderData?.summary !== 'safe') {
        reasons.push(`Rate provider for token ${token.symbol} is not safe`)
      }
    }

    if (isBoosted(pool) && token.isErc4626 && token.useUnderlyingForAddRemove) {
      if (!hasReviewedErc4626(token)) {
        reasons.push(`Tokenized vault for token ${token.symbol} was not yet reviewed`)
      } else if (token.erc4626ReviewData?.summary !== 'safe') {
        reasons.push(`Tokenized vault for token ${token.symbol} is not safe`)
      }
    }
  }

  return reasons
}

export function isAffectedByV2Exploit(pool: Pool) {
  if (isV2Pool(pool) && isComposableStable(pool.type)) {
    if (
      pool.poolTokens.some(
        token => token.priceRateProvider && token.priceRateProvider !== zeroAddress
      )
    ) {
      return true
    }
  }

  return false
}

export function shouldBlockRemoveLiquidity(pool: Pool) {
  const reasons = getPoolRemoveBlockedReason(pool)
  return reasons.length > 0
}

export function getPoolRemoveBlockedReason(pool: Pool): string[] {
  const hasUnstakedBalance = bn(getUserWalletBalance(pool)).gt(0)
  const hasTooSmallBalance = isTooSmallToRemoveUsd(getUserWalletBalanceUsd(pool))

  const reasons: string[] = []

  if (!hasUnstakedBalance) reasons.push("You don't have any unstaked balance to remove")
  if (hasTooSmallBalance) reasons.push('Your balance is too small to remove')

  return reasons
}

export function isAffectedByCspIssue(pool: Pool) {
  return isAffectedBy(pool, PoolIssue.CspPoolVulnWarning)
}

function isAffectedBy(pool: Pool, poolIssue: PoolIssue) {
  const issues = getNetworkConfig(getChainId(pool.chain)).pools.issues
  const affectedPoolIds = issues[poolIssue] ?? []
  return affectedPoolIds.includes(pool.id.toLowerCase())
}

export function getVaultConfig(pool: Pool) {
  const networkConfig = getNetworkConfig(pool.chain)

  const vaultAddress =
    pool.protocolVersion === 3
      ? networkConfig.contracts.balancer.vaultV3!
      : networkConfig.contracts.balancer.vaultV2

  const balancerVaultAbi = pool.protocolVersion === 3 ? vaultAbi_V3 : balancerV2VaultAbi

  return { vaultAddress, balancerVaultAbi }
}

type PoolWithProtocolVersion = Pick<PoolCore, 'protocolVersion'>

export function isV1Pool(pool: PoolWithProtocolVersion): boolean {
  return pool.protocolVersion === 1
}

export function isV2Pool(pool: PoolWithProtocolVersion): boolean {
  return pool.protocolVersion === 2
}

export function isV3Pool(pool: PoolWithProtocolVersion): boolean {
  return pool.protocolVersion === 3
}

export function supportsWethIsEth(pool: Pool): boolean {
  return !pool.hasErc4626
}

export function requiresPermit2Approval(pool: Pool): boolean {
  return isV3Pool(pool)
}

export function isUnbalancedLiquidityDisabled(pool: Pool): boolean {
  return !!pool.liquidityManagement?.disableUnbalancedLiquidity
}

export function getWarnings(warnings: string[]) {
  return warnings.filter(warning => !isEmpty(warning))
}

export function poolTypeLabel(poolType: PoolFilterType) {
  switch (poolType) {
    case GqlPoolTypeValues.Weighted:
      return 'Weighted'
    case GqlPoolTypeValues.Stable:
      return 'Stable'
    case GqlPoolTypeValues.LiquidityBootstrapping:
      return 'Liquidity Bootstrapping (LBP)'
    case GqlPoolTypeValues.Gyro:
      return 'Gyro CLP'
    case GqlPoolTypeValues.QuantAmmWeighted:
      return 'QuantAMM BTF'
    case 'AUTORANGE':
      return 'AutoRange'
    default:
      return getPoolTypeLabel(poolType)
  }
}

export function poolHasRateProviderExternalOracle(pool: Pool): boolean {
  return pool.poolTokens.some(token =>
    token.priceRateProviderData?.warnings?.includes('market-rate')
  )
}

/**
 * Returns a human-readable caption for pool activity date range.
 * - 0 days ago → 'today'
 * - 1 day ago → 'since yesterday'
 * - 2+ days ago → 'in last N days'
 */
export function getPoolActivityDateCaption(minTimestampSeconds: number): string {
  const diffInDays = differenceInCalendarDays(
    new Date(),
    new Date(secondsToMilliseconds(minTimestampSeconds))
  )

  if (diffInDays === 0) return 'today'
  if (diffInDays === 1) return 'since yesterday'
  return `in last ${diffInDays} days`
}
