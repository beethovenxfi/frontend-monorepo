import { describe, expect, it, vi } from 'vitest'
import { isWrapOrUnwrap, getWrapType } from './wrap.helpers'
import { OWrapType } from './swap.types'
import { GqlChainValues } from '../../shared/services/api/graphql-enums'
import { TEST_ADDRESSES } from '@repo/lib/test/utils/swap-test-utils'

vi.mock('@repo/lib/modules/tokens/token.helpers', async importOriginal => {
  const actual = await importOriginal<typeof import('@repo/lib/modules/tokens/token.helpers')>()
  return {
    ...actual,
    isNativeAsset: vi.fn((token: string) => {
      if (!token) return false
      return token.toLowerCase() === TEST_ADDRESSES.eth
    }),
    isWrappedNativeAsset: vi.fn((token: string) => {
      if (!token) return false
      return token.toLowerCase() === TEST_ADDRESSES.weth.toLowerCase()
    }),
  }
})

describe('wrap.helpers', () => {
  describe('isWrapOrUnwrap', () => {
    it('returns true for native/wrapped native pairs in either direction', () => {
      expect(isWrapOrUnwrap(TEST_ADDRESSES.eth, TEST_ADDRESSES.weth, GqlChainValues.Sonic)).toBe(
        true
      )

      expect(isWrapOrUnwrap(TEST_ADDRESSES.weth, TEST_ADDRESSES.eth, GqlChainValues.Sonic)).toBe(
        true
      )
    })

    it('returns false for unrelated pairs', () => {
      expect(isWrapOrUnwrap(TEST_ADDRESSES.bal, TEST_ADDRESSES.weth, GqlChainValues.Sonic)).toBe(
        false
      )
    })
  })

  describe('getWrapType', () => {
    it('returns WRAP when native asset is input', () => {
      expect(getWrapType(TEST_ADDRESSES.eth, TEST_ADDRESSES.weth, GqlChainValues.Sonic)).toBe(
        OWrapType.WRAP
      )
    })

    it('returns UNWRAP when wrapped native asset is input', () => {
      expect(getWrapType(TEST_ADDRESSES.weth, TEST_ADDRESSES.eth, GqlChainValues.Sonic)).toBe(
        OWrapType.UNWRAP
      )
    })

    it('returns null for non-wrap pair', () => {
      expect(getWrapType(TEST_ADDRESSES.eth, TEST_ADDRESSES.bal, GqlChainValues.Sonic)).toBeNull()
    })
  })
})
