import { useQuery } from '@apollo/client/react'
import { GetProtocolStatsDocument } from '../services/api/generated/graphql'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'

export function useProtocolStats() {
  const statQuery = useQuery(GetProtocolStatsDocument, {
    variables: {
      chain: PROJECT_CONFIG.defaultNetwork,
    },
  })

  return {
    statQuery,
  }
}
