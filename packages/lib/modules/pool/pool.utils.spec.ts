import type { GqlPoolAprItem } from '@repo/lib/shared/services/api/graphql-derived-types'
import {
  GqlChainValues,
  GqlPoolAprItemTypeValues,
  GqlPoolTypeValues,
} from '@repo/lib/shared/services/api/graphql-enums'
import { describe, expect, test } from 'vitest'
import { BaseVariant } from './pool.types'
import { getPoolPath, getTotalApr } from './pool.utils'

describe('getTotalApr', () => {
  test('skips API APR values that BigNumber cannot parse', () => {
    const aprItems = [
      { type: GqlPoolAprItemTypeValues.SwapFee24h, apr: ' ' } as unknown as GqlPoolAprItem,
    ]

    const [minTotal, maxTotal] = getTotalApr(aprItems)

    expect(minTotal.toString()).toBe('0')
    expect(maxTotal.toString()).toBe('0')
  })
})

describe('getPoolPath', () => {
  const basePool = {
    id: '0xpoolid',
    chain: GqlChainValues.Sonic,
  }

  test('keeps v2 pool paths on the v2 variant', () => {
    expect(
      getPoolPath({
        ...basePool,
        type: GqlPoolTypeValues.Weighted,
        protocolVersion: 2,
      })
    ).toBe('/pools/sonic/v2/0xpoolid')
  })

  test('keeps Gyro and QuantAMM v3 pool paths on the v3 variant', () => {
    expect(
      getPoolPath({
        ...basePool,
        type: GqlPoolTypeValues.GyroE,
        protocolVersion: 3,
      })
    ).toBe('/pools/sonic/v3/0xpoolid')

    expect(
      getPoolPath({
        ...basePool,
        type: GqlPoolTypeValues.QuantAmmWeighted,
        protocolVersion: 3,
      })
    ).toBe('/pools/sonic/v3/0xpoolid')
  })

  test('rejects CowAMM and FX pool detail routes', () => {
    expect(() =>
      getPoolPath({
        ...basePool,
        type: GqlPoolTypeValues.CowAmm,
        protocolVersion: 1,
      })
    ).toThrow(/Unsupported pool type/)

    expect(() =>
      getPoolPath({
        ...basePool,
        type: GqlPoolTypeValues.Fx,
        protocolVersion: 2,
      })
    ).toThrow(/Unsupported pool type/)

    expect(() =>
      getPoolPath({
        ...basePool,
        type: GqlPoolTypeValues.Element,
        protocolVersion: 2,
      })
    ).toThrow(/Unsupported pool type/)
  })

  test('rejects unsupported explicit variants', () => {
    expect(() =>
      getPoolPath({
        ...basePool,
        type: GqlPoolTypeValues.Weighted,
        protocolVersion: 2,
        variant: 'cow',
      } as Parameters<typeof getPoolPath>[0] & { variant: string })
    ).toThrow(/Unsupported pool variant/)

    expect(
      getPoolPath({
        ...basePool,
        type: GqlPoolTypeValues.Weighted,
        protocolVersion: 2,
        variant: BaseVariant.v2,
      } as Parameters<typeof getPoolPath>[0] & { variant: BaseVariant })
    ).toBe('/pools/sonic/v2/0xpoolid')
  })
})
