import { renderHook } from '@testing-library/react'
import { useConnection, useDisconnect } from 'wagmi'
import { useUserAccountLogic } from './UserAccountProvider'
import { emptyAddress } from './contracts/wagmi-helpers'

const setIsConnectedToWC = vi.fn()
let isConnectedToWC = false

vi.mock('wagmi', () => ({
  useConnection: vi.fn(),
  useConnectionEffect: vi.fn(),
  useDisconnect: vi.fn(),
}))

vi.mock('@repo/lib/config/app.config', () => ({
  config: { appEnv: 'prod' },
  shouldUseAnvilFork: false,
}))

vi.mock('@repo/lib/shared/hooks/useIsMounted', () => ({ useIsMounted: () => true }))
vi.mock('./useSafeAppConnectionGuard', () => ({ useSafeAppConnectionGuard: vi.fn() }))

vi.mock('./wallet-connect/useWCConnectionLocalStorage', () => ({
  useWCConnectionLocalStorage: () => ({
    isConnectedToWC,
    setIsConnectedToWC,
  }),
}))

vi.mock('@repo/lib/test/utils/wagmi/fork.helpers', () => ({
  clearImpersonatedAddressLS: vi.fn(),
}))

const disconnect = vi.fn()
const address = '0x0000000000000000000000000000000000000001' as const

beforeEach(() => {
  vi.clearAllMocks()
  isConnectedToWC = false
  vi.mocked(useDisconnect).mockReturnValue({ mutate: disconnect } as any)

  vi.stubGlobal(
    'fetch',
    vi.fn(() => new Promise(() => {}))
  )
})

afterEach(() => vi.unstubAllGlobals())

test('a connected wallet is ready without waiting for an authorization service', () => {
  vi.mocked(useConnection).mockReturnValue({
    address,
    isConnecting: false,
    isConnected: true,
    connector: { id: 'injected' },
  } as any)

  const { result } = renderHook(() => useUserAccountLogic())

  expect(result.current.userAddress).toBe(address)
  expect(result.current.isConnected).toBe(true)
  expect(result.current.isLoading).toBe(false)
  expect(fetch).not.toHaveBeenCalled()
  expect(disconnect).not.toHaveBeenCalled()
})

test('records wallet-connect connections without authorization requests', () => {
  vi.mocked(useConnection).mockReturnValue({
    address,
    isConnecting: false,
    isConnected: true,
    connector: { id: 'walletConnect' },
  } as any)

  renderHook(() => useUserAccountLogic())

  expect(setIsConnectedToWC).toHaveBeenCalledWith(true)
  expect(fetch).not.toHaveBeenCalled()
})

test('a disconnected wallet stays disconnected without authorization requests', () => {
  vi.mocked(useConnection).mockReturnValue({
    address: undefined,
    isConnecting: false,
    isConnected: false,
  } as any)

  const { result } = renderHook(() => useUserAccountLogic())

  expect(result.current.userAddress).toBe(emptyAddress)
  expect(result.current.isConnected).toBe(false)
  expect(result.current.isLoading).toBe(false)
  expect(fetch).not.toHaveBeenCalled()
})

test('clears wallet-connect connection state when there is no connected address', () => {
  isConnectedToWC = true

  vi.mocked(useConnection).mockReturnValue({
    address: undefined,
    isConnecting: false,
    isConnected: false,
    connector: undefined,
  } as any)

  renderHook(() => useUserAccountLogic())

  expect(setIsConnectedToWC).toHaveBeenCalledWith(false)
  expect(fetch).not.toHaveBeenCalled()
})
