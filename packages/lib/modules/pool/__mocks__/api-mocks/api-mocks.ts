import { Pool } from '../../pool.types'
import { PoolExample } from '../pool-examples/pool-examples.types'

import { allApiMocks } from './allApiMocks'

const allPoolApiMocks: Pool[] = [...allApiMocks]

export function getApiPoolMock(poolIdOrExample: string | PoolExample): Pool {
  const poolId: string =
    typeof poolIdOrExample === 'string' ? poolIdOrExample : poolIdOrExample.poolId

  const pool = allPoolApiMocks.find(pool => pool.id.toLowerCase() === poolId.toLowerCase())

  if (!pool) {
    throw new Error(
      `Api mock not found for poolId: ${poolId}
      Double check that savePoolMock is creating your pool and that allApiMocks includes the pool you're looking for.`
    )
  }

  return structuredClone(pool) as Pool
}
