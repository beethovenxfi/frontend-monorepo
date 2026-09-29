'use client'

import { Chain } from '@rainbow-me/rainbowkit'
import { sonic } from 'wagmi/chains'
import type { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { keyBy } from 'lodash'
import { getBaseUrl } from '@repo/lib/shared/utils/urls'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'
import { shouldUseAnvilFork } from '@repo/lib/config/app.config'
import { defaultAnvilForkRpcUrl } from '@repo/lib/test/utils/wagmi/fork.helpers'
import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'

/* If a request with the default rpc fails, it will fall back to the next one in the list.
  https://viem.sh/docs/clients/transports/fallback#fallback-transport
*/
export const rpcFallbacks: Partial<Record<GqlChain, string | undefined>> = {
  [GqlChainValues.Sonic]: 'https://1rpc.io/sonic',
}

const baseUrl = getBaseUrl()

const getPrivateRpcUrl = (chain: GqlChain) => {
  // Use anvil fork for E2E dev tests
  if (shouldUseAnvilFork) return defaultAnvilForkRpcUrl
  return `${baseUrl}/api/rpc/${chain}`
}

export const rpcOverrides: Partial<Record<GqlChain, string | undefined>> = {
  [GqlChainValues.Sonic]: getPrivateRpcUrl(GqlChainValues.Sonic),
}

const gqlChainToWagmiChainMap: Partial<Record<GqlChain, Chain>> = {
  [GqlChainValues.Sonic]: { iconUrl: '/images/chains/SONIC.svg', ...sonic },
} as const

export const supportedNetworks = PROJECT_CONFIG.supportedNetworks
const chainToFilter = PROJECT_CONFIG.defaultNetwork
const customChain = gqlChainToWagmiChainMap[chainToFilter]
if (!customChain) throw new Error(`Unable to find default chain ${chainToFilter}`)

export const chains: readonly [Chain, ...Chain[]] = [
  customChain,
  ...(supportedNetworks
    .filter(chain => chain !== chainToFilter)
    .map(gqlChain => gqlChainToWagmiChainMap[gqlChain]) as Chain[]),
]

export const chainsByKey = keyBy(chains, 'id')

export function getDefaultRpcUrl(chainId: number) {
  return chainsByKey[chainId]!.rpcUrls.default.http[0]!
}
