import type { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'
import { NetworkConfig } from '../config.types'
import sonic from './sonic'
export type GqlChainValues = `${GqlChain}`
export type NetworkConfigs = Partial<Record<GqlChainValues, NetworkConfig>>

const networkConfigs: NetworkConfigs = {
  [GqlChainValues.Sonic]: sonic,
}

export function getNetworkConfig(chain: GqlChain) {
  const networkConfig = networkConfigs[chain]
  if (!networkConfig) throw new Error(`Missing network config for chain ${chain}`)

  return networkConfig
}

export default networkConfigs
