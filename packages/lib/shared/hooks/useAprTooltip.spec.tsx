import { testHook } from '@repo/lib/test/utils/custom-renderers'
import { bn, fNum } from '../utils/numbers'
import { useAprTooltip } from './useAprTooltip'
import { aprTooltipDataMock } from './_mocks_/aprTooltipDataMock'
import BigNumber from 'bignumber.js'
import type { GqlPoolAprItem } from '../services/api/graphql-derived-types'
import { GqlChainValues } from '../services/api/graphql-enums'

const defaultNumberFormatter = (value: string) => bn(bn(value).toFixed(4, BigNumber.ROUND_HALF_UP))

function testUseAprTooltip({ aprItems }: { aprItems: GqlPoolAprItem[] }) {
  const { result } = testHook(() =>
    useAprTooltip({
      aprItems,
      numberFormatter: defaultNumberFormatter,
      chain: GqlChainValues.Sonic,
    })
  )

  return result
}

describe('useAprTooltip', () => {
  test('formats APRs with default formatter', () => {
    const result = testUseAprTooltip({ aprItems: aprTooltipDataMock.aprItems })

    expect(result.current.swapFeesDisplayed.toFixed()).toBe('0.0007')
    expect(fNum('apr', result.current.swapFeesDisplayed)).toBe('0.07%')

    const yieldBearingTokensApr = result.current.yieldBearingTokensDisplayed[0]!.apr
    expect(yieldBearingTokensApr.toFixed()).toBe('0.0068')
    expect(fNum('apr', yieldBearingTokensApr)).toBe('0.68%')

    const totalBaseDisplayed = result.current.totalBaseDisplayed
    expect(totalBaseDisplayed.toFixed()).toBe('0.0075')
    expect(fNum('apr', totalBaseDisplayed)).toBe('0.75%') // 0.07 + 0.0068 + 0.68 = 0.75
  })
})

// TODO: Add a Beets/Sonic pool with two yield-bearing ERC4626 token APRs,
// expecting yieldBearingTokensAprDisplayed to aggregate them and
// yieldBearingTokensDisplayed to list each token APR.

// TODO: Add a Beets/Sonic pool with multiple Merkl token incentives, expecting
// merklIncentivesAprDisplayed to aggregate them and merklTokensDisplayed to
// list each token APR.
