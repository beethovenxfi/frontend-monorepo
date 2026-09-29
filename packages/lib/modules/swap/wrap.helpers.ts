import type { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { Address } from 'viem'
import { isNativeAsset, isWrappedNativeAsset } from '../tokens/token.helpers'
import { OWrapType, WrapType } from './swap.types'

export function isNativeWrap(tokenIn: Address, tokenOut: Address, chain: GqlChain) {
  const tokenInIsNative = isNativeAsset(tokenIn, chain) || isWrappedNativeAsset(tokenIn, chain)
  const tokenOutIsNative = isNativeAsset(tokenOut, chain) || isWrappedNativeAsset(tokenOut, chain)

  return tokenInIsNative && tokenOutIsNative
}

export function isWrapOrUnwrap(tokenIn: Address, tokenOut: Address, chain: GqlChain) {
  return isNativeWrap(tokenIn, tokenOut, chain)
}

export function getWrapType(tokenIn: Address, tokenOut: Address, chain: GqlChain): WrapType | null {
  if (isNativeAsset(tokenIn, chain) && isWrappedNativeAsset(tokenOut, chain)) {
    return OWrapType.WRAP
  } else if (isWrappedNativeAsset(tokenIn, chain) && isNativeAsset(tokenOut, chain)) {
    return OWrapType.UNWRAP
  }

  return null
}
