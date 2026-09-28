import { PoolType } from '@balancer/sdk'
import { bn, isBnParseable } from '@repo/lib/shared/utils/numbers'
import type { GqlPoolType } from '@repo/lib/shared/services/api/generated/graphql'
import { GqlPoolTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import { fNumCustom } from '@repo/lib/shared/utils/numbers'
import { WeightedPoolStructure } from './constants'

const sdkToGqlPoolType: Partial<Record<PoolType, GqlPoolType>> = {
  [PoolType.Weighted]: GqlPoolTypeValues.Weighted,
  [PoolType.Stable]: GqlPoolTypeValues.Stable,
  [PoolType.StableSurge]: GqlPoolTypeValues.Stable,
  [PoolType.GyroE]: GqlPoolTypeValues.GyroE,
  [PoolType.ReClamm]: GqlPoolTypeValues.Reclamm,
}

export function getGqlPoolType(poolType: PoolType): GqlPoolType {
  const gqlPoolType = sdkToGqlPoolType[poolType]
  if (!gqlPoolType) throw new Error(`Invalid pool type: ${poolType}`)
  return gqlPoolType
}

export function getSwapFeePercentageOptions(
  poolType: PoolType
): [SwapFeePercentageOption, SwapFeePercentageOption] {
  const isStablePool = poolType === PoolType.Stable || poolType === PoolType.StableSurge

  if (isStablePool) {
    return [
      { value: '0.01', tip: 'Best for super stable pairs' },
      { value: '0.05', tip: 'Best for stable-ish pairs' },
    ]
  } else if (poolType === PoolType.Weighted) {
    return [
      { value: '0.30', tip: 'Best for most weighted pairs' },
      { value: '1.00', tip: 'Best for exotic pairs' },
    ]
  } else if (poolType === PoolType.GyroE) {
    return [
      { value: '0.30', tip: 'Best for most Gyro E-CLP pairs' },
      { value: '1.00', tip: 'Best for exotic pairs' },
    ]
  } else {
    return [
      { value: '0.30', tip: 'Best for most AutoRange pairs' },
      { value: '1.00', tip: 'Best for exotic pairs' },
    ]
  }
}

export function getMinSwapFeePercentage(poolType: PoolType): number {
  if (poolType === PoolType.Stable || poolType === PoolType.StableSurge) {
    return 0.0001
  } else {
    return 0.001
  }
}

export function getPercentFromPrice(value: string, price: string) {
  if (!isBnParseable(value) || !isBnParseable(price) || bn(price).isZero()) return '0.00'
  return bn(value).minus(price).div(price).times(100).toFixed(2)
}

export const formatNumber = (value: string) => {
  let numFormat = '0.000000'
  if (Number(value) > 1000) numFormat = '0,000.00'
  if (Number(value) > 100000) numFormat = '0,000'

  return fNumCustom(value, numFormat)
}

export function isStablePool(poolType: PoolType): boolean {
  return poolType === PoolType.Stable || poolType === PoolType.StableSurge
}

export function isStableSurgePool(poolType: PoolType): boolean {
  return poolType === PoolType.StableSurge
}

export function isWeightedPool(poolType: PoolType): boolean {
  return poolType === PoolType.Weighted
}

export function isCustomWeightedPool(
  poolType: PoolType,
  weightedPoolStructure: WeightedPoolStructure
): boolean {
  return poolType === PoolType.Weighted && weightedPoolStructure === WeightedPoolStructure.Custom
}

export function isAutoRangePool(poolType: PoolType): boolean {
  return poolType === PoolType.ReClamm
}

export function isGyroEllipticPool(poolType: PoolType): boolean {
  return poolType === PoolType.GyroE
}

export function isPoolCreatorEnabled(poolType: PoolType): boolean {
  // AutoRange and eclp factories still require zero address
  return poolType === PoolType.Stable || poolType === PoolType.Weighted
}

export type SwapFeePercentageOption = { value: string; tip: string }
