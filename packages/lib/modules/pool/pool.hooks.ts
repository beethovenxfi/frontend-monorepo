import { getPoolPath } from './pool.utils'
import { Pool } from './pool.types'
import { useRedirect } from '@repo/lib/shared/hooks/useRedirect'

export function usePoolRedirect(pool: Pool | undefined) {
  const path = pool ? getPoolPath(pool) : '/'

  const { redirectToPage: redirectToPoolPage } = useRedirect(path)

  return { redirectToPoolPage }
}
