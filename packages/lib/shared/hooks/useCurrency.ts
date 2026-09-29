'use client'

import { Numberish, fNum } from '../utils/numbers'

type CurrencyOpts = {
  withSymbol?: boolean
  abbreviated?: boolean
  noDecimals?: boolean
  forceThreeDecimals?: boolean
}

export function useCurrency() {
  function formatCurrency(value: string | undefined) {
    return `$${value ?? '0'}`
  }

  function parseCurrency(value: string) {
    return value.replace(/^\$/, '')
  }

  // Formats a USD value in fiat style.
  function toCurrency(
    usdVal: Numberish,
    {
      withSymbol = true,
      abbreviated = true,
      noDecimals = false,
      forceThreeDecimals = false,
    }: CurrencyOpts = {}
  ): string {
    const formattedAmount = fNum(noDecimals ? 'integer' : 'fiat', usdVal, {
      abbreviated,
      forceThreeDecimals,
    })

    if (formattedAmount.startsWith('<')) {
      return withSymbol ? '<$' + formattedAmount.substring(1) : formattedAmount
    }

    return withSymbol ? '$' + formattedAmount : formattedAmount
  }

  return { toCurrency, formatCurrency, parseCurrency }
}
