import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'
import { PoolExample } from './pool-examples.types'

export const anSSiloWSBoosted: PoolExample = {
  name: 'bpt-anS-SiloWS',
  description: 'Edge case: V3 partial boosted stable (anS + SiloWS ERC4626)',
  poolId: '0x944d4ae892de4bfd38742cc8295d6d5164c5593c',
  poolChain: GqlChainValues.Sonic,
  version: 3,
}

export const boostedPoolExamples = [anSSiloWSBoosted]
