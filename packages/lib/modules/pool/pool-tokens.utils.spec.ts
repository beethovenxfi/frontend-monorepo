import { anSSiloWSBoosted } from './__mocks__/pool-examples/boosted'
import { scUsdStS } from './__mocks__/pool-examples/flat'
import { tokenSymbols } from './__mocks__/pool-examples/pool-example-helpers'
import { PoolExample } from './__mocks__/pool-examples/pool-examples.types'
import {
  getCompositionTokens,
  getUserReferenceTokens,
  getWrappedBoostedTokens,
  getPoolActionableTokens,
} from './pool-tokens.utils'
import { getApiPoolMock } from './__mocks__/api-mocks/api-mocks'

// Testing utils that can be kept in the test:
function getCompositionTokenSymbols(poolExample: PoolExample): string[] {
  const pool = getApiPoolMock(poolExample)

  return tokenSymbols(getCompositionTokens(pool))
}

function getUserReferenceTokenSymbols(poolExample: PoolExample): string[] {
  const pool = getApiPoolMock(poolExample)

  return tokenSymbols(getUserReferenceTokens(pool))
}

function getUserReferenceTokensWeights(poolExample: PoolExample): (string | undefined)[] {
  const pool = getApiPoolMock(poolExample)

  return getUserReferenceTokens(pool).map(t => t.weight)
}

function getUserReferenceTokensURIs(poolExample: PoolExample): (string | null | undefined)[] {
  const pool = getApiPoolMock(poolExample)

  return getUserReferenceTokens(pool).map(t => t.logoURI)
}

function getCompositionTokensWeights(poolExample: PoolExample): (string | undefined)[] {
  const pool = getApiPoolMock(poolExample)

  return getCompositionTokens(pool).map(t => t.weight)
}

function getCompositionTokensURIs(poolExample: PoolExample): (string | null | undefined)[] {
  const pool = getApiPoolMock(poolExample)

  return getCompositionTokens(pool).map(t => t.logoURI)
}

function getPoolActionableTokenSymbols(
  poolExample: PoolExample,
  wrapUnderlying?: boolean[]
): string[] {
  const pool = getApiPoolMock(poolExample)

  return getPoolActionableTokens(pool, wrapUnderlying).map(t => t.symbol)
}

function getWrappedBoostedTokenSymbols(poolExample: PoolExample): string[] {
  const pool = getApiPoolMock(poolExample)

  return getWrappedBoostedTokens(pool).map(t => t.symbol)
}

describe('getDisplayTokens for flat pools', () => {
  it('Sonic v2 weighted scUSD/stS', () => {
    expect(getCompositionTokenSymbols(scUsdStS)).toEqual(['scUSD', 'stS'])
    expect(getUserReferenceTokenSymbols(scUsdStS)).toEqual(['scUSD', 'stS'])
    expect(getUserReferenceTokensWeights(scUsdStS)).toEqual(['0.3', '0.7'])
    expect(getCompositionTokensWeights(scUsdStS)).toEqual(['0.3', '0.7'])
    expect(getUserReferenceTokensURIs(scUsdStS)).toEqual(getCompositionTokensURIs(scUsdStS))

    expect(getUserReferenceTokensURIs(scUsdStS)).toEqual([
      'https://i.ibb.co/PFw2zkx/scUSD64.png',
      'https://raw.githubusercontent.com/beethovenxfi/tokenlists/main/src/assets/images/tokens/0xe5da20f15420ad15de0fa650600afc998bbe3955.png',
    ])

    expect(getPoolActionableTokenSymbols(scUsdStS)).toEqual(['scUSD', 'stS'])
  })

  // TODO: Add a Beets/Sonic v2 pool with a non-boosted ERC4626 token, covering
  // composition/reference/actionable tokens for flat v2 pools.

  // TODO: Add a Beets/Sonic v2 stable pool with ERC4626 tokens (v2 pools are not
  // boosted so they should not expose underlying tokens as actionable).
})

describe('getDisplayTokens for BOOSTED pools', () => {
  // TODO: Add a Beets/Sonic fully boosted pool with custom ERC4626 vaults,
  // covering composition tokens, underlying reference tokens and wrapped
  // boosted tokens.

  it('Sonic partial boosted', () => {
    expect(getCompositionTokenSymbols(anSSiloWSBoosted)).toEqual(['SiloWS', 'anS'])
    expect(getUserReferenceTokenSymbols(anSSiloWSBoosted)).toEqual(['anS', 'wS'])
    expect(getPoolActionableTokenSymbols(anSSiloWSBoosted)).toEqual(['wS', 'anS'])
    expect(getWrappedBoostedTokenSymbols(anSSiloWSBoosted)).toEqual(['SiloWS'])
  })
})

describe('Sonic partial boosted actionable tokens', () => {
  it('uses the underlying token when wrapping is enabled', () => {
    expect(getPoolActionableTokenSymbols(anSSiloWSBoosted, [true, true])).toEqual(['wS', 'anS'])
    expect(getPoolActionableTokenSymbols(anSSiloWSBoosted, [true, false])).toEqual(['wS', 'anS'])
  })

  it('uses SiloWS when wrapping is disabled', () => {
    expect(getPoolActionableTokenSymbols(anSSiloWSBoosted, [false, false])).toEqual([
      'SiloWS',
      'anS',
    ])

    expect(getPoolActionableTokenSymbols(anSSiloWSBoosted, [false, true])).toEqual([
      'SiloWS',
      'anS',
    ])
  })
})

// TODO: Add a Beets/Sonic fully boosted pool with two ERC4626 tokens, covering:
// - underlying tokens used as actionable by default
// - wrapped/underlying pair sorting by wallet balance
// - getWrappedAndUnderlyingTokenFn returning empty when useWrappedForAddRemove is false
// - getActionableTokenAddresses with/without wrapping
// - getBoostedActionableTokens pairing wrapped and underlying tokens
