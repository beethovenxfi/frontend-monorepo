import { waitFor } from '@testing-library/react'
import { decodeFunctionData } from 'viem'
import { beetsV2BatchRelayerLibraryAbi } from '@repo/lib/modules/web3/contracts/abi/generated'
import { BatchRelayerService } from '@repo/lib/shared/services/batch-relayer/batch-relayer.service'
import { GaugeService } from '@repo/lib/shared/services/staking/gauge.service'
import { testHook } from '@repo/lib/test/utils/custom-renderers'
import { useClaimCallDataQuery } from './useClaimCallDataQuery'

const gauge = '0x2d42910d826e5500579d121596e98a6eb33c0a1b' as const

const gaugeService = new GaugeService(
  BatchRelayerService.create('0x1111111111111111111111111111111111111111')
)

describe('useClaimCallDataQuery', () => {
  it('encodes only a gauge reward claim', async () => {
    const { result } = testHook(() =>
      useClaimCallDataQuery({ claimRewardGauges: [gauge], gaugeService })
    )

    await waitFor(() => expect(result.current.data).toHaveLength(1))

    expect(
      decodeFunctionData({ abi: beetsV2BatchRelayerLibraryAbi, data: result.current.data[0]! })
        .functionName
    ).toBe('gaugeClaimRewards')
  })

  it('produces no call data when there are no rewards', () => {
    const { result } = testHook(() =>
      useClaimCallDataQuery({ claimRewardGauges: [], gaugeService })
    )

    expect(result.current.data).toEqual([])
  })
})
