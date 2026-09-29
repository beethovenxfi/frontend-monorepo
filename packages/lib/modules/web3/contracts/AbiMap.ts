import { DelegateRegistryAbi } from './abi/DelegateRegistryAbi'
import {
  beetsBatchRelayerAbi,
  balancerV2GaugeV5Abi,
  balancerV2VaultAbi,
  sonicStakingAbi,
  reliquaryAbi,
  magpieLoopedSonicRouterAbi,
} from './abi/generated'
import { permit2Abi } from '@balancer/sdk'

export const AbiMap = {
  'balancer.vaultV2': balancerV2VaultAbi,
  'balancer.gaugeV5': balancerV2GaugeV5Abi,
  'balancer.relayerV6': beetsBatchRelayerAbi,
  'snapshot.delegateRegistry': DelegateRegistryAbi,
  'beets.lstStaking': sonicStakingAbi,
  'beets.reliquary': reliquaryAbi,
  'beets.loopedSonicRouter': magpieLoopedSonicRouterAbi,
  permit2: permit2Abi,
}

export type AbiMapType = keyof typeof AbiMap | undefined
