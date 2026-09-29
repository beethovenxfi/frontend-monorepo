import type {
  QuantAmmWeightSnapshot,
  GqlPoolLiquidityBootstrappingV3,
  GqlPoolFixedPriceLbp,
} from '@repo/lib/shared/services/api/graphql-derived-types'
import {
  GetPoolsQuery,
  GetPoolsQueryVariables,
  GetPoolQuery,
} from '@repo/lib/shared/services/api/generated/graphql'
import type {
  GqlChain,
  GqlPoolType,
  GqlPoolOrderBy,
} from '@repo/lib/shared/services/api/generated/graphql'
import { GqlPoolTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import { Address, Hex } from 'viem'
import { ApiToken } from '../tokens/token.types'

export type Pool = GetPoolQuery['pool']
export type PoolId = Hex
export type PoolList = GetPoolsQuery['pools']
export type PoolListItem = PoolList[0]
export type LbpV3 = GqlPoolLiquidityBootstrappingV3 | GqlPoolFixedPriceLbp

// PoolCore defines the shared fields between PoolListItem, Pool that are required for pool related shared logic
export type PoolCore = Pool | PoolListItem

export enum BaseVariant {
  v2 = 'v2',
  v3 = 'v3',
}

export type ProtocolVersion = 1 | 2 | 3

export type PoolVariant = BaseVariant

export type PoolAction = 'add-liquidity' | 'remove-liquidity' | 'stake' | 'unstake'

export interface FetchPoolProps {
  id: string
  // chain & variant are not used yet, but will be needed in the future.
  chain: GqlChain
  variant?: PoolVariant
}

export interface PoolSearchParams {
  first?: string
  skip?: string
  orderBy?: string
  orderDirection?: string
  poolTypes?: string
  networks?: string
  textSearch?: string
  userAddress?: string
}

export interface PoolsColumnSort {
  id: GqlPoolOrderBy
  desc: boolean
}

export interface PoolsQueryVariables extends GetPoolsQueryVariables {
  first: number
  skip: number
}

export const poolTypeFilters = [
  GqlPoolTypeValues.Weighted,
  GqlPoolTypeValues.Stable,
  GqlPoolTypeValues.LiquidityBootstrapping,
  GqlPoolTypeValues.Gyro,
  GqlPoolTypeValues.QuantAmmWeighted,
  'AUTORANGE', // will be mapped to GqlPoolTypeValues.Reclamm
] as const

export type PoolFilterType = (typeof poolTypeFilters)[number]

// We need to map toggalable pool types to their corresponding set of GqlPoolTypes.
export const POOL_TYPE_MAP: { [key in PoolFilterType]: GqlPoolType[] } = {
  [GqlPoolTypeValues.Weighted]: [GqlPoolTypeValues.Weighted],
  [GqlPoolTypeValues.Stable]: [GqlPoolTypeValues.Stable, GqlPoolTypeValues.ComposableStable],
  [GqlPoolTypeValues.LiquidityBootstrapping]: [GqlPoolTypeValues.LiquidityBootstrapping],
  [GqlPoolTypeValues.Gyro]: [
    GqlPoolTypeValues.Gyro,
    GqlPoolTypeValues.Gyro3,
    GqlPoolTypeValues.GyroE,
  ],
  [GqlPoolTypeValues.QuantAmmWeighted]: [GqlPoolTypeValues.QuantAmmWeighted],
  AUTORANGE: [GqlPoolTypeValues.Reclamm],
}

export const poolTagFilters = [
  'INCENTIVIZED',
  'VE8020',
  'POINTS',
  'BOOSTED',
  'RWA',
  'DYNAMIC_ECLP',
] as const
export type PoolTagType = (typeof poolTagFilters)[number]

export const poolHookTagFilters = [
  'HOOKS_STABLESURGE',
  'HOOKS_MEVCAPTURE',
  'HOOKS_EXITFEE',
  'HOOKS_FEETAKING',
] as const
export type PoolHookTagType = (typeof poolHookTagFilters)[number]

export type SortingState = PoolsColumnSort[]

export const orderByHash: { [key: string]: string } = {
  totalLiquidity: 'TVL',
  volume24h: 'Volume (24h)',
  apr: 'APR',
  userbalanceUsd: 'My liquidity',
}

/*
  Core token info required for pool actions
  PoolToken and GqlTokens are super sets of TokenCore
*/
export type TokenCore = {
  address: Address
  name: string
  symbol: string
  decimals: number
  index: number
}

export type PoolToken = ApiToken & Pool['poolTokens'][0]

export enum PoolDisplayType {
  Name = 'name',
  TokenPills = 'token-pills',
}

export type PoolWithWeightSnapshots = Pool & { weightSnapshots?: QuantAmmWeightSnapshot[] }
