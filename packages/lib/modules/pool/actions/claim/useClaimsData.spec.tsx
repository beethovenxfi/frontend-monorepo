import { vi } from 'vitest'
import { bn } from '@repo/lib/shared/utils/numbers'
import { testHook } from '@repo/lib/test/utils/custom-renderers'
import { useClaimsData } from './useClaimsData'

const { useClaimableBalancesMock } = vi.hoisted(() => ({
  useClaimableBalancesMock: vi.fn(),
}))

vi.mock('@repo/lib/modules/portfolio/PortfolioClaim/useClaimableBalances', () => ({
  useClaimableBalances: useClaimableBalancesMock,
}))

describe('useClaimsData', () => {
  it('exposes loading and empty rewards from the retained gauge query', () => {
    useClaimableBalancesMock.mockReturnValue({
      claimableRewards: [],
      isLoadingClaimableRewards: true,
    })

    const { result } = testHook(() => useClaimsData([]))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.hasNoRewards).toBe(true)
    expect(result.current.totalClaimableUsd).toBe('0')
  })

  it('sums claimable Sonic gauge rewards after loading', () => {
    const rewards = [{ fiatBalance: bn(2) }, { fiatBalance: bn(3) }]

    useClaimableBalancesMock.mockReturnValue({
      claimableRewards: rewards,
      isLoadingClaimableRewards: false,
    })

    const { result } = testHook(() => useClaimsData([]))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.hasNoRewards).toBe(false)
    expect(result.current.allClaimableRewards).toBe(rewards)
    expect(result.current.totalClaimableUsd).toBe('5')
  })
})
