import type { Pool } from '@repo/lib/modules/pool/pool.types'
import { buildDefaultPoolTestProvider, testHook } from '@repo/lib/test/utils/custom-renderers'
import { waitFor } from '@testing-library/react'
import { getApiPoolMock } from '../../../__mocks__/api-mocks/api-mocks'
import { anSSiloWSBoosted } from '../../../__mocks__/pool-examples/boosted'

import { usePoolStateWithBalancesQuery } from './usePoolStateWithBalancesQuery'

async function testQuery(pool: Pool) {
  const { result } = testHook(() => usePoolStateWithBalancesQuery(pool), {
    wrapper: buildDefaultPoolTestProvider(pool as Pool),
  })

  return result
}

describe('usePoolStateWithBalances', () => {
  it('for a partial boosted pool', async () => {
    const pool = getApiPoolMock(anSSiloWSBoosted)

    const result = await testQuery(pool)

    await waitFor(() => {
      if (result.current.error) throw result.current.error
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data?.id).toBeDefined()
  })
})
