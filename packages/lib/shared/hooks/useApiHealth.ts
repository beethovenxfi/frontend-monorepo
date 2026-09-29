import { useQuery } from '@apollo/client/react'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'
import { GetApiHealthDocument, GetApiHealthQuery } from '../services/api/generated/graphql'
import { secondsToMilliseconds } from 'date-fns'

export function useApiHealth() {
  const { data, error, loading } = useQuery(GetApiHealthDocument, {
    variables: { chain: PROJECT_CONFIG.defaultNetwork },
    pollInterval: secondsToMilliseconds(15),
  })

  return {
    apiOK: getApiHealthStatus(data, error, loading),
  }
}

export function getApiHealthStatus(
  data: GetApiHealthQuery | undefined,
  error: unknown,
  loading: boolean
): boolean | undefined {
  if (error) return false
  if (data?.protocolMetricsChain != null) return true
  return loading ? undefined : false
}
