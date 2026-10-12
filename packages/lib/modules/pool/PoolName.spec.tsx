import { ChakraProvider } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'
import { PoolName } from './PoolName'
import { getApiPoolMock } from './__mocks__/api-mocks/api-mocks'
import { anSSiloWSBoosted } from './__mocks__/pool-examples/boosted'
import { scUsdStS, usdcFlyStS } from './__mocks__/pool-examples/flat'
import type { Pool } from './pool.types'
import { toGqlWeighedPoolMock } from '@repo/lib/test/msw/builders/gqlPoolElement.builders'

function renderPoolName(pool: Pool, showUnderlying?: boolean) {
  return render(
    <ChakraProvider>
      <PoolName pool={pool} showUnderlying={showUnderlying} />
    </ChakraProvider>
  )
}

describe('PoolName', () => {
  it('renders action-header token names in index order with weights and separators', () => {
    const pool = getApiPoolMock(usdcFlyStS)
    pool.poolTokens.reverse()

    const { container } = renderPoolName(pool)

    const tokenNames = Array.from(container.querySelectorAll('span'))
      .map(node => node.textContent)
      .filter(Boolean)

    expect(tokenNames).toEqual(['USDC 25%', 'FLY 50%', 'stS 25%'])
    expect(screen.getAllByText('/')).toHaveLength(2)
    expect(screen.getByText('stS 25%').nextElementSibling).toBeEmptyDOMElement()
  })

  it('excludes pool-address BPT tokens from ordinary pool names', () => {
    const pool = toGqlWeighedPoolMock(getApiPoolMock(scUsdStS))

    pool.poolTokens.push({
      ...pool.poolTokens[0]!,
      address: pool.address,
      symbol: 'POOL-BPT',
      index: 2,
    })

    renderPoolName(pool)

    expect(screen.getByText('scUSD 30%')).toBeInTheDocument()
    expect(screen.getByText('stS 70%')).toBeInTheDocument()
    expect(screen.queryByText(/POOL-BPT/)).not.toBeInTheDocument()
    expect(screen.getAllByText('/')).toHaveLength(1)
  })

  it('renders boosted portfolio-claim pool names without weights', () => {
    renderPoolName(getApiPoolMock(anSSiloWSBoosted))

    expect(screen.getByText('anS')).toBeInTheDocument()
    expect(screen.getByText('wS')).toBeInTheDocument()
    expect(screen.queryByText('SiloWS')).not.toBeInTheDocument()
    expect(screen.getAllByText('/')).toHaveLength(1)
  })

  it('shows wrapped symbols by default when underlying tokens are available', () => {
    const pool = getApiPoolMock(anSSiloWSBoosted)
    // Disable automatic boosted substitution to isolate the showUnderlying option.
    pool.tags = []

    renderPoolName(pool)

    expect(screen.getByText('SiloWS')).toBeInTheDocument()
    expect(screen.queryByText('wS')).not.toBeInTheDocument()
  })

  it('shows underlying symbols only when requested for tokens that have one', () => {
    const pool = getApiPoolMock(anSSiloWSBoosted)
    pool.tags = []

    renderPoolName(pool, true)

    expect(screen.getByText('wS')).toBeInTheDocument()
    expect(screen.getByText('anS')).toBeInTheDocument()
    expect(screen.queryByText('SiloWS')).not.toBeInTheDocument()
  })

  it('falls back to wrapped symbols when the underlying token is absent', () => {
    const pool = getApiPoolMock(anSSiloWSBoosted)
    pool.tags = []
    pool.poolTokens = pool.poolTokens.map(token => ({ ...token, underlyingToken: null }))

    renderPoolName(pool, true)

    expect(screen.getByText('SiloWS')).toBeInTheDocument()
    expect(screen.getByText('anS')).toBeInTheDocument()
  })
})
