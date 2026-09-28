import { Pool } from './pool.types'
import { getApiPoolMock } from './__mocks__/api-mocks/api-mocks'
import { subDays } from 'date-fns'
import {
  getPoolAddBlockedReason,
  shouldBlockAddLiquidity,
  getPoolActivityDateCaption,
  getPoolActivityTitle,
} from './pool.helpers'
import { anSSiloWSBoosted } from './__mocks__/pool-examples/boosted'
import { GqlPoolTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import { zeroAddress } from 'viem'

describe('shouldBlockAddLiquidity', () => {
  // TODO: Add a Beets/Sonic v2 pool containing an ERC4626 token and rate provider, covering:
  // - block add when a pool token is not allowed
  // - block exploited V2 composable stable pools with rate providers
  // - do not block exploited V2 composable stable pools without rate providers

  describe('v3 pool with ERC4626 tokens', () => {
    // TODO: Add a Beets/Sonic fully boosted pool with two reviewed ERC4626 tokens, covering:
    // - do not block when all tokenized vaults are reviewed and safe
    // - return multiple blocked reasons when several vaults are unsafe

    it('should block liquidity if the SiloWS tokenized vault is not reviewed', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      getPoolToken(pool, 0).erc4626ReviewData = null
      expect(shouldBlockAddLiquidity(pool)).toBe(true)
      expect(getPoolAddBlockedReason(pool)).toHaveLength(1)
    })

    it('Should block liquidity if the SiloWS tokenized vault is not reviewed as safe', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      getPoolToken(pool, 0).erc4626ReviewData!.summary = 'unsafe'
      expect(shouldBlockAddLiquidity(pool)).toBe(true)
      expect(getPoolAddBlockedReason(pool)).toHaveLength(1)
    })

    it('should block if pool is LBP', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      pool.type = GqlPoolTypeValues.LiquidityBootstrapping

      expect(shouldBlockAddLiquidity(pool)).toBe(true)
      expect(getPoolAddBlockedReason(pool)).toHaveLength(1)
    })

    it('should block if pool is paused', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      pool.dynamicData.isPaused = true

      expect(shouldBlockAddLiquidity(pool)).toBe(true)
      expect(getPoolAddBlockedReason(pool)).toHaveLength(1)
    })

    it('should block if pool is in recovery mode', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      pool.dynamicData.isInRecoveryMode = true

      expect(shouldBlockAddLiquidity(pool)).toBe(true)
      expect(getPoolAddBlockedReason(pool)).toHaveLength(1)
    })

    // TODO: Add a Beets/Sonic pool with hook review metadata, covering:
    // - block add when the pool hook is not reviewed
    // - block add when the pool hook review summary is unsafe

    it('should block if pool token is not reviewed', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      getPoolToken(pool, 0).priceRateProviderData = null

      expect(shouldBlockAddLiquidity(pool)).toBe(true)
      expect(getPoolAddBlockedReason(pool)).toHaveLength(1)
    })

    it('should block if pool token is not safe', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      getPoolToken(pool, 0).priceRateProviderData!.summary = 'unsafe'

      expect(shouldBlockAddLiquidity(pool)).toBe(true)
      expect(getPoolAddBlockedReason(pool)).toHaveLength(1)
    })

    it('should block if pool token is not allowed', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      getPoolToken(pool, 0).isAllowed = false

      expect(shouldBlockAddLiquidity(pool)).toBe(true)
      expect(getPoolAddBlockedReason(pool)).toHaveLength(1)
    })

    it('should not block if no reviewer', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      getPoolToken(pool, 0).priceRateProvider = null

      expect(shouldBlockAddLiquidity(pool)).toBe(false)
    })

    it('should not block if reviewer is zero address', () => {
      const pool = getApiPoolMock(anSSiloWSBoosted)
      getPoolToken(pool, 0).priceRateProvider = zeroAddress
      getPoolToken(pool, 0).priceRateProviderData!.summary = 'unsafe'

      expect(shouldBlockAddLiquidity(pool)).toBe(false)
    })
  })

  it('should not block add liquidity if the metadata explicitly allows it', () => {
    const pool = getApiPoolMock(anSSiloWSBoosted)
    expect(shouldBlockAddLiquidity(pool, { allowAddLiquidity: true })).toBe(false)
  })
})

describe('getPoolActivityTitle', () => {
  it('returns singular labels for a single event', () => {
    expect(getPoolActivityTitle('all', 1)).toBe('transaction')
    expect(getPoolActivityTitle('adds', 1)).toBe('add')
    expect(getPoolActivityTitle('removes', 1)).toBe('remove')
    expect(getPoolActivityTitle('swaps', 1)).toBe('swap')
  })

  it('returns plural labels for multiple events', () => {
    expect(getPoolActivityTitle('all', 2)).toBe('transactions')
    expect(getPoolActivityTitle('adds', 2)).toBe('adds')
    expect(getPoolActivityTitle('removes', 2)).toBe('removes')
    expect(getPoolActivityTitle('swaps', 2)).toBe('swaps')
  })

  it('returns an empty label when there is no active tab', () => {
    expect(getPoolActivityTitle(undefined, 0)).toBe('')
  })
})

// Helper: converts "N days ago" → Unix timestamp in seconds
function daysAgo(n: number): number {
  return Math.floor(subDays(new Date(), n).getTime() / 1000)
}

describe('getPoolActivityDateCaption', () => {
  it('returns "today" when activity is from today (0 days ago)', () => {
    expect(getPoolActivityDateCaption(daysAgo(0))).toBe('today')
  })

  it('returns "since yesterday" for activity from 1 day ago', () => {
    expect(getPoolActivityDateCaption(daysAgo(1))).toBe('since yesterday')
  })

  it('returns "in last 2 days" for activity from 2 days ago', () => {
    expect(getPoolActivityDateCaption(daysAgo(2))).toBe('in last 2 days')
  })

  it('returns "in last 7 days" for activity from a week ago', () => {
    expect(getPoolActivityDateCaption(daysAgo(7))).toBe('in last 7 days')
  })
})

function getPoolToken(pool: Pool, index: number) {
  const token = pool.poolTokens[index]
  if (!token) throw new Error(`Missing pool token at index ${index}`)
  return token
}
