import { describe, expect, it } from 'vitest'
import { parseSwapError } from './swap.helpers'

describe('swap.helpers', () => {
  describe('parseSwapError', () => {
    it('returns Unknown error for undefined message', () => {
      expect(parseSwapError(undefined)).toBe('Unknown error')
    })

    it('returns user-friendly message for WrapAmountTooSmall', () => {
      expect(parseSwapError('WrapAmountTooSmall')).toBe(
        'Your input is too small, please try a bigger amount.'
      )
    })

    it('returns user-friendly message when WrapAmountTooSmall appears in longer message', () => {
      expect(parseSwapError('Error: WrapAmountTooSmall')).toBe(
        'Your input is too small, please try a bigger amount.'
      )
    })

    it('returns original message for unknown error', () => {
      expect(parseSwapError('Some unknown error')).toBe('Some unknown error')
    })
  })
})
