import { describe, expect, it, vi } from 'vitest'
import { BaseVariant } from '@repo/lib/modules/pool/pool.types'
import PoolLayoutWrapper, { generateMetadata } from './layout'
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

vi.mock('@repo/lib/shared/layouts/PoolLayout', () => ({
  generatePoolMetadata: vi.fn(async () => ({
    metadata: {
      title: 'Sonic pool',
    },
  })),
  PoolLayout: vi.fn(({ children }) => children),
}))

describe('pool detail route chain guard', () => {
  const sonicParams = Promise.resolve({
    chain: 'sonic',
    id: '0xsonic',
    variant: BaseVariant.v3,
  })

  it('allows the Sonic pool route', async () => {
    const result = await PoolLayoutWrapper({
      params: sonicParams,
      children: 'pool content',
    })

    expect(isValidElement(result)).toBe(true)

    expect(result.props).toMatchObject({
      chain: 'sonic',
      id: '0xsonic',
      variant: BaseVariant.v3,
      children: 'pool content',
    })

    await expect(generateMetadata({ params: sonicParams, children: null })).resolves.toEqual({
      title: 'Sonic pool',
      openGraph: {
        images: '/images/opengraph/og-beets-pool.png',
      },
    })
  })

  it('returns 404 for a non-Sonic pool route', async () => {
    const params = Promise.resolve({
      chain: 'mainnet',
      id: '0xmainnet',
      variant: BaseVariant.v3,
    })

    await expect(
      PoolLayoutWrapper({
        params,
        children: 'pool content',
      })
    ).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404')

    await expect(generateMetadata({ params, children: null })).rejects.toThrow(
      'NEXT_HTTP_ERROR_FALLBACK;404'
    )
  })
})
