import type { GqlPoolBase } from '@repo/lib/shared/services/api/graphql-derived-types'
import { TokenCore } from './pool.types'
import { PoolToken, PoolCore, Pool } from './pool.types'
import { isAutoRange, isBoosted, isV3Pool } from './pool.helpers'
import { isSameAddress } from '@repo/lib/shared/utils/addresses'
import { Address } from 'viem'
import { sortBy, uniqBy } from 'lodash'
import { ApiToken, BalanceForFn } from '../tokens/token.types'
import { FeaturedPool } from './PoolProvider'
import { bn } from '@repo/lib/shared/utils/numbers'

export function getCompositionTokens(pool: PoolCore | FeaturedPool): PoolToken[] {
  return sortByIndex(excludeBptTokens(getPoolTokens(pool), pool.address))
}

/*
  The set of tokens that are reference tokens for the user so that they know at a glance what can be added to the pool.
   Used in the pool header and in the pools list.
*/
export function getUserReferenceTokens(pool: PoolCore | FeaturedPool): PoolToken[] {
  if (isBoosted(pool as Pick<PoolCore, 'protocolVersion' | 'tags'>)) {
    return sortByIndex(
      pool.poolTokens.map(token =>
        token.isErc4626 && token.useUnderlyingForAddRemove
          ? ({ ...token, ...token.underlyingToken } as PoolToken)
          : (token as PoolToken)
      )
    )
  }

  return sortByIndex(getCompositionTokens(pool))
}

export function isPool(pool: any): pool is Pool {
  return (pool as Pool).poolTokens !== undefined
}

function getPoolTokens(pool: PoolCore | FeaturedPool): PoolToken[] {
  if (isPool(pool)) {
    return pool.poolTokens as PoolToken[]
  }

  throw new Error('Invalid pool type: poolTokens must be defined')
}

function sortByIndex(tokens: PoolToken[]): PoolToken[] {
  return sortBy(tokens, 'index')
}

function excludeBptTokens(tokens: PoolToken[], poolAddress: string): PoolToken[] {
  return tokens
    .filter(token => !isSameAddress(token.address, poolAddress as Address)) // Exclude the BPT pool token itself
    .filter(token => token !== undefined) as PoolToken[]
}

/*
  Returns all the tokens in the structure of the given pool:
  top level tokens + ERC4626 underlying tokens.
*/
export function allPoolTokens(pool: Pool | GqlPoolBase): TokenCore[] {
  const extractUnderlyingTokens = (token: PoolToken): TokenCore[] => {
    if (shouldUseUnderlyingToken(token, pool)) {
      return [{ ...token.underlyingToken, index: token.index } as TokenCore]
    }

    return []
  }

  const poolTokens: PoolToken[] = pool.poolTokens as PoolToken[]

  const underlyingTokens: TokenCore[] = poolTokens.flatMap(extractUnderlyingTokens)

  const standardTopLevelTokens: PoolToken[] = poolTokens.flatMap(token => (token ? token : []))

  const allTokens = underlyingTokens.concat(toTokenCores(standardTopLevelTokens))

  const allTokensWithWrappedTokens = [...allTokens, ...getWrappedBoostedTokens(pool)] as TokenCore[]

  return uniqBy(allTokensWithWrappedTokens, 'address')
}

function toTokenCores(poolTokens: PoolToken[]): TokenCore[] {
  return poolTokens.map(
    t =>
      ({
        address: t.address as Address,
        name: t.name,
        symbol: t.symbol,
        decimals: t.decimals,
        index: t.index,
      }) as TokenCore
  )
}

export function shouldUseUnderlyingToken(token: ApiToken, pool: Pool | GqlPoolBase): boolean {
  if (
    isV3Pool(pool) &&
    token.isErc4626 &&
    token.useUnderlyingForAddRemove &&
    !token.underlyingToken
  ) {
    // This should never happen unless the API some some inconsistency
    throw new Error(
      `Underlying token is missing for ERC4626 token with address ${token.address} in chain ${pool.chain}`
    )
  }

  // AutoRange pools do not support adding with underlying tokens
  if (isAutoRange(pool.type)) return false
  // Only v3 pools should underlying tokens
  return (
    isV3Pool(pool) &&
    token.isErc4626 &&
    !!token.useUnderlyingForAddRemove &&
    !!token.underlyingToken
  )
}

// Returns top level standard tokens + Erc4626 (only v3) underlying tokens
export function getBoostedActionableTokens(pool: Pool): ApiToken[] {
  const poolTokens = pool.poolTokens as PoolToken[]
  return poolTokens
    .flatMap(token =>
      shouldUseUnderlyingToken(token, pool)
        ? [
            {
              ...token,
              ...token.underlyingToken,
              wrappedToken: token,
              underlyingToken: undefined,
              isErc4626: false, // TODO: delete this when we migrate to useWrappedForAddRemove/useUnderlyingForAddRemove
            } as unknown as ApiToken,
          ]
        : [token as unknown as ApiToken]
    )
    .filter((token): token is ApiToken => token !== undefined)
}

// Returns wrapped boosted tokens
export function getWrappedBoostedTokens(pool: Pool | GqlPoolBase): ApiToken[] {
  return pool.poolTokens.filter(token =>
    shouldUseUnderlyingToken(token as unknown as ApiToken, pool)
  ) as unknown as ApiToken[]
}

export function getActionableTokenSymbol(tokenAddress: Address, pool: Pool): string {
  const token = allPoolTokens(pool).find(token => isSameAddress(token.address, tokenAddress))

  if (!token) {
    console.log('Token symbol not found for address ', tokenAddress)
    return ''
  }

  return token.symbol
}

/*
  Depending on the pool type, iterates pool.poolTokens and returns the list of GqlTokens that can be used in the pool's actions (add/remove/swap).

  For instance:
    If the pool is boosted, returns wrapped/underlying tokens depending of the wrapUnderlying array.
*/
export function getPoolActionableTokens(pool: Pool, wrapUnderlying?: boolean[]): ApiToken[] {
  if (!wrapUnderlying) {
    return getPoolActionableTokensWithoutWrapUnderlying(pool)
  }

  return getPoolActionableTokensWithoutWrapUnderlying(pool).map((token, index) => {
    if (wrapUnderlying[index]) {
      return token
    }

    return { ...token, ...token.wrappedToken, wrappedToken: undefined }
  })
}

function getPoolActionableTokensWithoutWrapUnderlying(pool: Pool): ApiToken[] {
  function excludeBptPoolToken(tokens: ApiToken[]): ApiToken[] {
    return tokens
      .filter(token => !isSameAddress(token.address, pool.address)) // Exclude the BPT pool token itself
      .filter(token => token !== undefined)
  }

  if (isBoosted(pool)) {
    return excludeBptPoolToken(getBoostedActionableTokens(pool))
  }

  return excludeBptPoolToken(pool.poolTokens as unknown as ApiToken[])
}

export function getDefaultWrapUnderlying(pool: Pool): boolean[] {
  /*
    Boosted tokens (wrappedToken defined): wrapUnderlying true by default
    No-Boosted tokens (wrappedToken undefined): wrapUnderlying always false
   */
  return getPoolActionableTokens(pool).map(t => (t.wrappedToken ? true : false))
}

export function getPriceRateRatio(pool: Pool) {
  const priceRates = getPoolActionableTokens(pool).map((token: ApiToken) => {
    return token.useUnderlyingForAddRemove ? token.priceRate : '1'
  })

  return bn(priceRates[0] || '1').div(priceRates[1] || '1')
}

/* Given a token (wrapped or underlying):
  - If wrapped token: returns a function that returns the wrapped token with its corresponding underlying token
  - If underlying token: returns a function that returns the underlying token with its corresponding wrapped token

  Sorted by:
  - token with more balance first
  - underlying token first
*/
export function getWrappedAndUnderlyingTokenFn(
  token: ApiToken,
  pool: Pool,
  balanceFor: BalanceForFn
): () => [ApiToken, ApiToken] | void {
  if (shouldUseUnderlyingToken(token, pool) && !!token.useWrappedForAddRemove) {
    return () => {
      token.wrappedToken = undefined
      const underlyingToken = { ...token, ...token.underlyingToken, wrappedToken: token }
      const wrappedToken = token
      return sortTokenPairByBalance([underlyingToken, wrappedToken], balanceFor)
    }
  }

  if (token.wrappedToken && !!token.wrappedToken.useWrappedForAddRemove) {
    const wrappedToken = token.wrappedToken

    return () => {
      const underlyingToken = token
      return sortTokenPairByBalance([underlyingToken, wrappedToken], balanceFor)
    }
  }

  return () => undefined
}

function sortTokenPairByBalance(
  tokens: [ApiToken, ApiToken],
  balanceFor: BalanceForFn
): [ApiToken, ApiToken] {
  return tokens.sort((a, b) => {
    const balanceA = balanceFor(a)?.amount || 0n
    const balanceB = balanceFor(b)?.amount || 0n

    if (balanceA === balanceB) return 0
    if (balanceA < balanceB) return 1
    return -1
  })
}

export function getActionableTokenAddresses(pool: Pool, wrapUnderlying?: boolean[]): Address[] {
  return getPoolActionableTokens(pool, wrapUnderlying).map(token => token.address as Address)
}
