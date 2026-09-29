import type { GqlChain } from '../services/api/generated/graphql'
import { GqlChainValues } from '../services/api/graphql-enums'
import { ChainId } from '@balancer/sdk'

export function drpcUrl(chain: GqlChain, privateKey: string) {
  if (chain !== GqlChainValues.Sonic) throw new Error(`Invalid chain: ${chain}`)
  return `https://lb.drpc.live/sonic/${privateKey}`
}

export function drpcUrlByChainId(chainId: number, privateKey: string) {
  if (chainId !== ChainId.SONIC) throw new Error(`Invalid chain id: ${chainId}`)
  return `https://lb.drpc.live/sonic/${privateKey}`
}
