import { describe, expect, it, vi } from 'vitest'
import NetworkClaim from './page'
import { isValidElement } from 'react'

vi.mock('next/navigation', async importOriginal => {
  const actual = await importOriginal<typeof import('next/navigation')>()
  return {
    ...actual,
    notFound: vi.fn(() => {
      throw new Error('NEXT_HTTP_ERROR_FALLBACK;404')
    }),
  }
})

vi.mock('@repo/lib/modules/transactions/transaction-steps/TransactionStateProvider', () => ({
  TransactionStateProvider: vi.fn(({ children }) => children),
}))

vi.mock(
  '@repo/lib/modules/portfolio/PortfolioClaim/ClaimNetworkPools/ClaimNetworkPoolsLayoutWrapper',
  () => ({
    default: vi.fn(() => 'claim network pools'),
  })
)

describe('portfolio chain claim route guard', () => {
  it('allows the Sonic portfolio claim route', async () => {
    const result = await NetworkClaim({
      params: Promise.resolve({ chain: 'sonic' }),
    })

    expect(isValidElement(result)).toBe(true)
  })

  it('returns 404 for a non-Sonic portfolio claim route', async () => {
    await expect(
      NetworkClaim({
        params: Promise.resolve({ chain: 'mainnet' }),
      })
    ).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404')
  })
})
