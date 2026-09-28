import { GqlHookTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import {
  isStable,
  isWeighted,
  isGyro,
  isBoosted,
  hasHooks,
  hasHookType,
  isQuantAmmPool,
  isAutoRange,
  poolHasRateProviderExternalOracle,
} from '../../../pool.helpers'
import { zeroAddress } from 'viem'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'
import { Pool } from '../../../pool.types'

export enum RiskKey {
  General = 'general',
  RebaseToken = 'rebasing-tokens',
  Composability = 'composability-risk',
  FlashLoan = 'flash-loans-risk',
  Mutable = 'mutable-attributes-risk',
  JoinExit = 'join-exit-risk',
  ImpermanentLoss = 'impermanent-loss-risk',
  Hook = 'hooks-risk',
  UI = 'ui-risk',
  Regulatory = 'regulatory-risk',
  PoolType = 'pool-type-risks',
  Weighted = 'weighted-pools',
  Stable = 'stable-pools',
  RateProvider = 'rate-provider-risk',
  Oracle = 'oracles',
  RateProviderBridge = 'rate-provider-bridges',
  Boosted = 'boosted-pools',
  StableSurgeHook = 'stablesurge-hook',
  Clp = 'concentrated-liquidity-pools',
  AutoRange = 'autorange',
  QuantAmmWeighted = 'btf',
}

export enum RiskCategory {
  PoolSpecific = 'Pool specific risks',
  Token = 'Token risks',
  General = 'General risks',
}

export const RISK_TITLES: Partial<Record<RiskKey, string>> = {
  [RiskKey.General]: `${PROJECT_CONFIG.projectName} protocol`,
  [RiskKey.Weighted]: 'Weighted pool',
  [RiskKey.Stable]: 'Stable pool',
  [RiskKey.Clp]: 'Concentrated Liquidity pool',
  [RiskKey.Boosted]: 'Boosted tokens',
  [RiskKey.Mutable]: 'Mutable attributes',
  [RiskKey.Composability]: 'Composability',
  [RiskKey.RateProvider]: 'Rate provider',
  [RiskKey.RateProviderBridge]: 'Rate provider cross-chain bridge',
  [RiskKey.Hook]: 'Hooks',
  [RiskKey.StableSurgeHook]: 'StableSurge hook',
  [RiskKey.QuantAmmWeighted]: 'BTF pool',
  [RiskKey.AutoRange]: 'AutoRange pool',
  [RiskKey.Oracle]: 'Oracle risk',
}

export type Risk = {
  title: string | undefined
  path: string
}

export interface RiskDefinition {
  key: RiskKey
  title: string | undefined
  path: string
  category: RiskCategory
  condition: (pool: Pool) => boolean
}

export interface RiskCategoryGroup {
  category: RiskCategory
  title: string
  risks: Risk[]
}

// Risk condition definitions
const RISK_CONDITIONS: RiskDefinition[] = [
  {
    key: RiskKey.Weighted,
    title: RISK_TITLES[RiskKey.Weighted],
    path: `/risks#${RiskKey.Weighted}`,
    category: RiskCategory.PoolSpecific,
    condition: pool => isWeighted(pool.type),
  },
  {
    key: RiskKey.Stable,
    title: RISK_TITLES[RiskKey.Stable],
    path: `/risks#${RiskKey.Stable}`,
    category: RiskCategory.PoolSpecific,
    condition: pool => isStable(pool.type),
  },
  {
    key: RiskKey.Clp,
    title: RISK_TITLES[RiskKey.Clp],
    path: `/risks#${RiskKey.Clp}`,
    category: RiskCategory.PoolSpecific,
    condition: pool => isGyro(pool.type),
  },
  {
    key: RiskKey.Boosted,
    title: RISK_TITLES[RiskKey.Boosted],
    path: `/risks#${RiskKey.Boosted}`,
    category: RiskCategory.PoolSpecific,
    condition: pool => !!isBoosted(pool),
  },
  {
    key: RiskKey.QuantAmmWeighted,
    title: RISK_TITLES[RiskKey.QuantAmmWeighted],
    path: `/risks#${RiskKey.QuantAmmWeighted}`,
    category: RiskCategory.PoolSpecific,
    condition: pool => isQuantAmmPool(pool.type),
  },
  {
    key: RiskKey.AutoRange,
    title: RISK_TITLES[RiskKey.AutoRange],
    path: `/risks#${RiskKey.AutoRange}`,
    category: RiskCategory.PoolSpecific,
    condition: pool => isAutoRange(pool.type),
  },

  // Hook risks
  {
    key: RiskKey.Hook,
    title: RISK_TITLES[RiskKey.Hook],
    path: `/risks#${RiskKey.Hook}`,
    category: RiskCategory.General,
    condition: pool => hasHooks(pool),
  },
  {
    key: RiskKey.StableSurgeHook,
    title: RISK_TITLES[RiskKey.StableSurgeHook],
    path: `/risks#${RiskKey.StableSurgeHook}`,
    category: RiskCategory.PoolSpecific,
    condition: pool => hasHookType(pool, GqlHookTypeValues.StableSurge),
  },

  // Pool specific feature risks
  {
    key: RiskKey.Oracle,
    title: RISK_TITLES[RiskKey.Oracle],
    path: `/risks#${RiskKey.Oracle}`,
    category: RiskCategory.PoolSpecific,
    condition: pool => poolHasRateProviderExternalOracle(pool),
  },
  {
    key: RiskKey.Mutable,
    title: RISK_TITLES[RiskKey.Mutable],
    path: `/risks#${RiskKey.Mutable}`,
    category: RiskCategory.PoolSpecific,
    condition: pool => isMutable(pool),
  },
]

export function getPoolRisks(pool: Pool): RiskCategoryGroup[] {
  const applicableRisks = RISK_CONDITIONS.filter(risk => risk.condition(pool))

  // Group risks by category
  const grouped: Record<RiskCategory, Risk[]> = {
    [RiskCategory.PoolSpecific]: [],
    [RiskCategory.Token]: [],
    [RiskCategory.General]: [],
  }

  // Add general risk
  const generalProtocolRisk: Risk = {
    title: RISK_TITLES[RiskKey.General] || 'General protocol risks',
    path: `/risks#${RiskKey.General}`,
  }

  grouped[RiskCategory.General].push(generalProtocolRisk)

  // Group applicable risks
  applicableRisks.forEach(risk => {
    const riskItem: Risk = {
      title: risk.title || 'Risk',
      path: risk.path,
    }

    grouped[risk.category].push(riskItem)
  })

  // Convert to hierarchical structure
  return Object.entries(grouped)
    .filter(([, risks]) => risks.length > 0)
    .map(([category, risks]) => ({
      category: category as RiskCategory,
      title: category as RiskCategory,
      risks,
    }))
}

function isMutable(pool: Pool) {
  return (
    !isEmpty(pool.swapFeeManager || '') ||
    !isEmpty(pool.pauseManager || '') ||
    !isEmpty(pool.poolCreator || '')
  )
}

function isEmpty(address: string) {
  return ['', zeroAddress].includes(address)
}

export function risksTitle() {
  return `Liquidity providers in this pool face the following risks:`
}
