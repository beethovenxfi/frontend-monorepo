import { act, renderHook } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'
import { useManagedTransaction, ManagedTransactionInput } from './useManagedTransaction'

const mocks = vi.hoisted(() => ({
  simulate: vi.fn(),
  estimateGas: vi.fn(),
  write: vi.fn(),
  chainSwitch: vi.fn(),
}))

vi.mock('wagmi', async importOriginal => ({
  ...(await importOriginal<typeof import('wagmi')>()),
  useSimulateContract: mocks.simulate,
  useEstimateGas: mocks.estimateGas,
  useWriteContract: () => ({ mutateAsync: mocks.write, status: 'idle' }),
  useWaitForTransactionReceipt: () => ({ status: 'pending' }),
}))

vi.mock('@repo/lib/config/useNetworkConfig', () => ({
  useNetworkConfig: () => ({ minConfirmations: 1 }),
}))

vi.mock('../useChainSwitch', () => ({ useChainSwitch: mocks.chainSwitch }))

vi.mock('@repo/lib/modules/web3/UserAccountProvider', () => ({
  useUserAccount: () => ({ userAddress: '0x0000000000000000000000000000000000000001' }),
}))

vi.mock('../safe.hooks', () => ({
  useTxHash: () => ({ txHash: undefined, isSafeTxLoading: false }),
}))

vi.mock('./useOnTransactionSubmission', () => ({ useOnTransactionSubmission: vi.fn() }))
vi.mock('./useOnTransactionConfirmation', () => ({ useOnTransactionConfirmation: vi.fn() }))

vi.mock('./useMockedTxHash', () => ({
  useMockedTxHash: () => ({ mockedTxHash: undefined, setMockedTxHash: vi.fn() }),
}))

const input: ManagedTransactionInput = {
  contractAddress: '0x0000000000000000000000000000000000000002',
  contractId: 'beets.lstStaking',
  functionName: 'undelegateMany',
  args: [[30n], [10n ** 19n]],
  labels: {
    init: 'Unstake',
    title: 'Unstake',
    confirming: 'Confirming',
    confirmed: 'Unstaked',
    tooltip: 'Unstake stS',
  },
  chainId: 146,
  enabled: true,
  onTransactionChange: vi.fn(),
}

const request = {
  address: input.contractAddress,
  functionName: input.functionName,
  args: input.args,
}

beforeEach(() => {
  vi.clearAllMocks()
  mocks.simulate.mockReturnValue({ data: undefined, isSuccess: false })
  mocks.estimateGas.mockReturnValue({ data: 53_000n, status: 'success' })
  mocks.chainSwitch.mockReturnValue({ shouldChangeNetwork: false })
})

test('waits for contract simulation even when gas estimation is ready', async () => {
  const { result, rerender } = renderHook(() => useManagedTransaction(input))

  expect(result.current.simulation.data).toBe(53_000n)
  expect(result.current.executeAsync).toBeUndefined()
  expect(mocks.write).not.toHaveBeenCalled()

  mocks.simulate.mockReturnValue({ data: { request }, isSuccess: true })
  rerender()

  expect(result.current.executeAsync).toBeTypeOf('function')

  await act(async () => {
    await result.current.executeAsync?.()
  })

  expect(mocks.write).toHaveBeenCalledExactlyOnceWith({ ...request, chainId: 146 })
})

test('does not execute when simulation has failed despite cached request data', () => {
  mocks.simulate.mockReturnValue({ data: { request }, isSuccess: false, isError: true })

  const { result } = renderHook(() => useManagedTransaction(input))

  expect(result.current.executeAsync).toBeUndefined()
})

test('does not execute a disabled transaction despite cached simulation data', () => {
  mocks.simulate.mockReturnValue({ data: { request }, isSuccess: true })

  const { result } = renderHook(() => useManagedTransaction({ ...input, enabled: false }))

  expect(result.current.executeAsync).toBeUndefined()
})

test('waits for the correct network despite cached simulation data', () => {
  mocks.simulate.mockReturnValue({ data: { request }, isSuccess: true })
  mocks.chainSwitch.mockReturnValue({ shouldChangeNetwork: true })

  const { result } = renderHook(() => useManagedTransaction(input))

  expect(result.current.executeAsync).toBeUndefined()
})
