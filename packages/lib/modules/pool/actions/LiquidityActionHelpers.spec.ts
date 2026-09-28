import { HumanTokenAmountWithSymbol } from '@repo/lib/modules/tokens/token.types'
import { mock } from 'vitest-mock-extended'
import { getApiPoolMock } from '../__mocks__/api-mocks/api-mocks'
import { scUsdStS, usdcFlyStS } from '../__mocks__/pool-examples/flat'
import { allPoolTokens } from '../pool-tokens.utils'
import { Pool } from '../pool.types'
import {
  LiquidityActionHelpers,
  areEmptyAmounts,
  requiresProportionalInput,
  requiresProportionalInputReason,
  roundDecimals,
  shouldUseRecoveryRemoveLiquidity,
  supportsProportionalAddLiquidityKind,
  supportsProportionalAddLiquidityReasons,
  toPoolState,
} from './LiquidityActionHelpers'
import { GqlPoolTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import { sonicTokens } from '@repo/lib/test/integration/sonic-fixtures'
const scUsdAddress = '0xd3dce716f3ef535c5ff8d041c1a41c3bd89b97ae' as const

describe('Calculates toInputAmounts from allPoolTokens', () => {
  it('for Sonic v2 weighted pool with no nested tokens', () => {
    const pool = getApiPoolMock(scUsdStS)

    const humanAmountsIn: HumanTokenAmountWithSymbol[] = [
      { humanAmount: '100', tokenAddress: sonicTokens.sts, symbol: 'stS' },
    ]

    expect(allPoolTokens(pool).map(t => t.address)).toEqual([
      pool.poolTokens[0]?.address,
      sonicTokens.sts,
    ])

    const helpers = new LiquidityActionHelpers(pool)

    expect(helpers.toInputAmounts(humanAmountsIn)).toEqual([
      {
        address: sonicTokens.sts,
        decimals: 18,
        rawAmount: 100000000000000000000n,
        symbol: 'stS',
      },
    ])
  })
})

// TODO: Add a Beets/Sonic fully boosted pool with two ERC4626 tokens, covering:
// - allPoolTokens returns underlying tokens for the wrapped ERC4626 pool tokens
// - toInputAmounts resolves underlying token decimals
// - boostedPoolState maps pool tokens with their underlying tokens

// TODO: Add a Beets/Sonic partially boosted pool where one ERC4626 token has
// useUnderlyingForAddRemove === false, covering boostedPoolState token mapping.

// TODO: Add a Beets/Sonic v2 pool containing an ERC4626 token, covering that
// allPoolTokens keeps the wrapped token (v2 pools are not boosted).

describe('areEmptyAmounts', () => {
  test('when all humanAmounts are empty, zero or zero with decimals', () => {
    const humanAmountsIn: HumanTokenAmountWithSymbol[] = [
      { tokenAddress: '0x198d7387Fa97A73F05b8578CdEFf8F2A1f34Cd1F', humanAmount: '', symbol: '' },
      { tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', humanAmount: '0', symbol: '' },
      {
        tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756bb3',
        humanAmount: '0.00',
        symbol: '',
      },
    ]

    expect(areEmptyAmounts(humanAmountsIn)).toBeTruthy()
  })

  test('when  humanAmounts is an empty array', () => {
    const humanAmountsIn: HumanTokenAmountWithSymbol[] = []
    expect(areEmptyAmounts(humanAmountsIn)).toBeTruthy()
  })
})

describe('detects pools requiring recovery removal', () => {
  test('when the pool is in recovery and paused', () => {
    const pausedAndInRecoveryPool: Pool = mock<Pool>({
      dynamicData: { isInRecoveryMode: true, isPaused: true },
    })

    expect(shouldUseRecoveryRemoveLiquidity(pausedAndInRecoveryPool)).toBeTruthy()
  })

  // TODO: Add a Beets/Sonic recovery-mode pool affected by CSP, or drop the
  // Balancer-specific recovery warning coverage.
})

it('returns poolState', () => {
  const poolMock = getApiPoolMock(scUsdStS)
  const helpers = new LiquidityActionHelpers(poolMock)
  expect(helpers.poolState.id).toBe(poolMock.id)
})

describe('toInputAmounts', () => {
  it('when the token input is empty', () => {
    const helpers = new LiquidityActionHelpers(getApiPoolMock(scUsdStS))
    const humanTokenAmountsWithAddress: HumanTokenAmountWithSymbol[] = []
    expect(helpers.toInputAmounts(humanTokenAmountsWithAddress)).toEqual([])
  })

  it('when the token input includes multiple pool tokens', () => {
    const helpers = new LiquidityActionHelpers(getApiPoolMock(scUsdStS))

    const humanTokenAmountsWithAddress: HumanTokenAmountWithSymbol[] = [
      { tokenAddress: scUsdAddress, humanAmount: '10', symbol: '' },
      { tokenAddress: sonicTokens.sts, humanAmount: '20', symbol: 'stS' },
    ]

    expect(helpers.toInputAmounts(humanTokenAmountsWithAddress)).toEqual([
      {
        address: scUsdAddress,
        decimals: 6,
        rawAmount: 10000000n,
        symbol: 'scUSD',
      },
      {
        address: sonicTokens.sts,
        decimals: 18,
        rawAmount: 20000000000000000000n,
        symbol: 'stS',
      },
    ])
  })

  it('when the token input is the native asset', () => {
    const helpers = new LiquidityActionHelpers(getApiPoolMock(scUsdStS))

    const humanTokenAmountsWithAddress: HumanTokenAmountWithSymbol[] = [
      { tokenAddress: sonicTokens.s, humanAmount: '30', symbol: 'S' },
    ]

    expect(helpers.toInputAmounts(humanTokenAmountsWithAddress)).toEqual([
      {
        address: sonicTokens.s,
        decimals: 18,
        rawAmount: 30000000000000000000n,
        symbol: 'S',
      },
    ])
  })

  it('when the token input is zero', () => {
    const helpers = new LiquidityActionHelpers(getApiPoolMock(scUsdStS))

    const humanTokenAmountsWithAddress: HumanTokenAmountWithSymbol[] = [
      { tokenAddress: sonicTokens.ws, humanAmount: '0', symbol: 'wS' },
    ]

    expect(helpers.toInputAmounts(humanTokenAmountsWithAddress)).toEqual([])
  })

  it('when the token input is in scientific notation', () => {
    const helpers = new LiquidityActionHelpers(getApiPoolMock(scUsdStS))

    const humanTokenAmountsWithAddress: HumanTokenAmountWithSymbol[] = [
      { tokenAddress: sonicTokens.sts, humanAmount: '6.1713167421e-8', symbol: 'stS' },
    ]

    expect(helpers.toInputAmounts(humanTokenAmountsWithAddress)).toEqual([
      {
        address: sonicTokens.sts,
        decimals: 18,
        rawAmount: 61713167421n,
        symbol: 'stS',
      },
    ])
  })
})

describe('toSdkInputAmounts', () => {
  it('swaps the native asset by the wrapped native asset', () => {
    const helpers = new LiquidityActionHelpers(getApiPoolMock(scUsdStS))

    const humanTokenAmountsWithAddress: HumanTokenAmountWithSymbol[] = [
      { tokenAddress: sonicTokens.s, humanAmount: '30', symbol: 'stS' },
    ]

    expect(helpers.toSdkInputAmounts(humanTokenAmountsWithAddress)).toEqual([
      {
        address: sonicTokens.ws,
        decimals: 18,
        rawAmount: 30000000000000000000n,
        symbol: 'stS',
      },
    ])
  })
})

test('trimDecimals', () => {
  const humanTokenAmountsWithAddress: HumanTokenAmountWithSymbol[] = [
    { tokenAddress: sonicTokens.s, humanAmount: '0.001013801345314809', symbol: 'S' },
    { tokenAddress: sonicTokens.ws, humanAmount: '0.001302248169953014', symbol: 'wS' },
  ]

  expect(roundDecimals(humanTokenAmountsWithAddress)).toEqual([
    {
      humanAmount: '0.0010138013',
      tokenAddress: sonicTokens.s,
    },
    {
      humanAmount: '0.0013022481',
      tokenAddress: sonicTokens.ws,
    },
  ])
})

test('toPoolState keeps pool type when pool is V3 (it does not call mapPoolType)', () => {
  // We don't need a real QuantAMM mock as changing the type is enough
  const quantAMMPool = {
    ...getApiPoolMock(usdcFlyStS),
    type: GqlPoolTypeValues.QuantAmmWeighted,
  }

  expect(toPoolState(quantAMMPool).type).toEqual(GqlPoolTypeValues.QuantAmmWeighted)
})

describe('supportsProportionalAddLiquidityKind', () => {
  it('should not allow proportional add for v2 stable pools', () => {
    const pool = getApiPoolMock(scUsdStS)
    pool.type = GqlPoolTypeValues.Stable

    expect(supportsProportionalAddLiquidityKind(pool)).toBe(false)
    expect(supportsProportionalAddLiquidityReasons(pool)).not.toBeUndefined()
  })

  // TODO: Add a Beets/Sonic v2 WeightedPool2TokensFactory pool; Sonic has no
  // configured factory so isWeightedPool2Tokens cannot be exercised yet.

  it('should not allow proportional add for weightedV1 pools (non v3)', () => {
    const pool = getApiPoolMock(scUsdStS)
    pool.version = 1
    pool.type = GqlPoolTypeValues.Weighted
    pool.protocolVersion = 2

    expect(supportsProportionalAddLiquidityKind(pool)).toBe(false)
    expect(supportsProportionalAddLiquidityReasons(pool)).not.toBeUndefined()
  })

  it('should allow proportional add for weightedV1 pools (v3)', () => {
    const pool = getApiPoolMock(usdcFlyStS)
    pool.version = 1
    pool.type = GqlPoolTypeValues.Weighted
    pool.protocolVersion = 3

    expect(supportsProportionalAddLiquidityKind(pool)).toBe(true)
    expect(supportsProportionalAddLiquidityReasons(pool)).toBeUndefined()
  })

  it('should allow proportional add for other pools (e.g. autoRange)', () => {
    const pool = getApiPoolMock(usdcFlyStS)
    pool.type = GqlPoolTypeValues.Reclamm
    pool.protocolVersion = 3

    expect(supportsProportionalAddLiquidityKind(pool)).toBe(true)
    expect(supportsProportionalAddLiquidityReasons(pool)).toBeUndefined()
  })
})

describe('requiresProportionalInput', () => {
  // TODO: Add Beets/Sonic Gyro/ECLP pool fixtures (v2 and v3), covering that
  // v2 gyro pools require proportional input and v3 gyro pools do not.

  it('should require when unbalanced liquidity is disabled on v3', () => {
    const pool = getApiPoolMock(usdcFlyStS)

    pool.liquidityManagement = {
      __typename: 'LiquidityManagement',
      disableUnbalancedLiquidity: true,
    }

    expect(requiresProportionalInput(pool)).toBe(true)
    expect(requiresProportionalInputReason(pool)).not.toBeUndefined()
  })

  it('should allow unbalanced add liquidity for other pools (e.g. v3 weighted)', () => {
    const pool = getApiPoolMock(usdcFlyStS)

    expect(requiresProportionalInput(pool)).toBe(false)
    expect(requiresProportionalInputReason(pool)).toBeUndefined()
  })
})
