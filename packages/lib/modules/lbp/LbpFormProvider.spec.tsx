import { testHook } from '@repo/lib/test/utils/custom-renderers'
import { clearLocalStorageMock, mockLocalStorage } from '@repo/lib/test/utils/localstorage-mock'
import { LS_KEYS } from '@repo/lib/modules/local-storage/local-storage.constants'
import { INITIAL_SALE_STRUCTURE } from './constants.lbp'
import { useLbpFormLogic } from './LbpFormProvider'
import { waitFor } from '@testing-library/react'

vi.mock('next/navigation', async importOriginal => {
  const actual = await importOriginal<typeof import('next/navigation')>()
  return {
    ...actual,
    usePathname: () => '/lbp/create',
    useSearchParams: () => new URLSearchParams(),
  }
})

beforeEach(() => {
  mockLocalStorage()
})

afterAll(() => {
  clearLocalStorageMock()
})

test('ignores malformed persisted sale amounts when calculating derived values', async () => {
  window.localStorage.setItem(
    LS_KEYS.LbpConfig.SaleStructure,
    JSON.stringify({ ...INITIAL_SALE_STRUCTURE, saleTokenAmount: '.' })
  )

  const rendered = testHook(() => useLbpFormLogic())

  await waitFor(() => expect(rendered.result.current.saleStructureForm.isHydrated).toBe(true))

  expect(rendered.result.current.launchTokenSeed).toBe(0)
  expect(rendered.result.current.totalValueRaw).toBe('0')
})
