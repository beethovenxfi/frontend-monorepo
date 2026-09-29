import { describe, expect, it, vi } from 'vitest'
import { sonic } from 'viem/chains'
import { resetFork } from './fork.helpers'
import { drpcUrlByChainId } from '@repo/lib/shared/utils/rpc'

vi.mock('@repo/lib/shared/utils/rpc', () => ({
  drpcUrlByChainId: vi.fn((chainId: number) => `https://rpc.example/${chainId}`),
}))

vi.mock('viem', async importOriginal => {
  const actual = await importOriginal<typeof import('viem')>()
  return {
    ...actual,
    createTestClient: vi.fn(() => ({
      reset: vi.fn(),
    })),
    createPublicClient: vi.fn(() => ({})),
  }
})

describe('resetFork', () => {
  it('defaults fork resets to Sonic', () => {
    process.env.NEXT_PRIVATE_DRPC_KEY = 'key'

    resetFork()

    expect(drpcUrlByChainId).toHaveBeenCalledWith(sonic.id, 'key')
  })
})
