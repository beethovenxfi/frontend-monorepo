import { zeroAddress } from 'viem'
import { buildDefaultPoolTestProvider, testHook } from '@repo/lib/test/utils/custom-renderers'
import { aPoolMock } from '@repo/lib/test/msw/builders/gqlPoolElement.builders'
import { GqlPoolTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import { abbreviateAddress } from '@repo/lib/shared/utils/addresses'
import { getApiPoolMock } from '../../../__mocks__/api-mocks/api-mocks'
import { scUsdStS, usdcFlyStS } from '../../../__mocks__/pool-examples/flat'
import { Pool } from '../../../pool.types'
import { useFormattedPoolAttributes } from './useFormattedPoolAttributes'

function testUseFormattedPoolAttributes(pool: Pool) {
  const { result } = testHook(() => useFormattedPoolAttributes(), {
    wrapper: buildDefaultPoolTestProvider(pool),
  })

  return result.current
}

function getAttribute(attributes: { title: string; value: string }[], title: string) {
  return attributes.find(attribute => attribute.title === title)
}

describe('useFormattedPoolAttributes', () => {
  it('marks a v2 pool with zero-address swap fee manager as immutable', () => {
    // GYROE pool on Sonic: poolCreator is null and swapFeeManager is the zero address
    const pool = aPoolMock({
      type: GqlPoolTypeValues.GyroE,
      poolCreator: null,
      swapFeeManager: zeroAddress,
      dynamicData: { swapFee: '0.001' } as Pool['dynamicData'],
    })

    const attributes = testUseFormattedPoolAttributes(pool)

    expect(getAttribute(attributes, 'Swap fees')?.value).toBe('0.1% (non-editable)')
    expect(getAttribute(attributes, 'Pool owner')?.value).toBe('No owner')
    expect(getAttribute(attributes, 'Attribute immutability')?.value).toBe('Immutable')
  })

  it('shows the swap fee manager as pool owner for a v2 pool', () => {
    // BPT-scUSD-stS (v2 weighted): poolCreator is null, swapFeeManager holds the owner
    const pool = getApiPoolMock(scUsdStS)

    const attributes = testUseFormattedPoolAttributes(pool)

    expect(getAttribute(attributes, 'Swap fees')?.value).toBe('0.4% (editable by pool owner)')

    expect(getAttribute(attributes, 'Pool owner')?.value).toBe(
      abbreviateAddress('0x97079f7e04b535fe7cd3f972ce558412dfb33946')
    )

    expect(getAttribute(attributes, 'Attribute immutability')?.value).toBe(
      'Immutable except for swap fees editable by pool owner'
    )
  })

  it('delegates swap fee management to governance for a v3 pool with zero-address manager', () => {
    // 25USDC-50FLY-25stS (v3 weighted): swapFeeManager is the zero address
    const pool = getApiPoolMock(usdcFlyStS)

    const attributes = testUseFormattedPoolAttributes(pool)

    expect(getAttribute(attributes, 'Swap fee manager')?.value).toBe('Delegate manager')
    expect(getAttribute(attributes, 'Swap fees')?.value).toContain('editable by governance')

    expect(getAttribute(attributes, 'Attribute immutability')?.value).toBe(
      'Immutable except for swap fees editable by governance'
    )
  })

  it('does not render undefined when the swap fee manager is missing', () => {
    const pool = aPoolMock({ poolCreator: null, swapFeeManager: null })

    const attributes = testUseFormattedPoolAttributes(pool)

    expect(getAttribute(attributes, 'Swap fees')?.value).toBe('1%')
    expect(getAttribute(attributes, 'Attribute immutability')?.value).toBe('Immutable')
    expect(getAttribute(attributes, 'Pool owner')).toBeUndefined()
    attributes.forEach(attribute => expect(attribute.value).not.toContain('undefined'))
  })
})
