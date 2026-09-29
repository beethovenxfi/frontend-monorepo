import {
  getTenderlyUrl,
  queryErrorMetaForWagmiSimulation,
  shouldIgnore,
  shouldIgnoreQueryError,
} from './query-errors'

describe('query error metadata', () => {
  it('retains transaction context for local diagnostics', () => {
    const meta = queryErrorMetaForWagmiSimulation('Simulation failed', {
      chainId: 146,
      tenderlyUrl: 'https://dashboard.tenderly.co/simulation',
    })

    expect(meta.errorMessage).toBe('Simulation failed')

    expect(meta.context?.extra).toEqual({
      chainId: 146,
      tenderlyUrl: 'https://dashboard.tenderly.co/simulation',
    })

    expect(getTenderlyUrl(meta)).toBe('https://dashboard.tenderly.co/simulation')
  })
})

describe('shouldIgnore', () => {
  it('suppresses common non-actionable wallet errors', () => {
    expect(shouldIgnore('e.getAccounts is not a function')).toBe(true)
    expect(shouldIgnore('ResizeObserver loop limit exceeded')).toBe(true)
  })

  it('does not suppress unknown errors', () => {
    expect(shouldIgnore('Unexpected pool query failure')).toBe(false)
    expect(shouldIgnore('')).toBe(false)
  })
})

describe('shouldIgnoreQueryError', () => {
  it('suppresses expected stable-surge hook failures when the pool has a surge hook', () => {
    const error = new Error('AfterAddLiquidityHookFailed()')

    const errorMeta = {
      errorMessage: 'Expected surge error',
      context: { extra: { params: { hasSurgeHook: true } } },
    }

    expect(shouldIgnoreQueryError(error, errorMeta)).toBe(true)

    expect(
      shouldIgnoreQueryError(error, {
        errorMessage: 'Expected surge error',
        context: { extra: { params: { hasSurgeHook: false } } },
      })
    ).toBe(false)
  })
})
