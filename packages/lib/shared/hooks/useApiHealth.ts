import { useQuery } from '@apollo/client/react'
import { GetApiHealthDocument } from '../services/api/generated/graphql'
import { secondsToMilliseconds } from 'date-fns'

export function useApiHealth() {
  const { data, error, loading } = useQuery(GetApiHealthDocument, {
    pollInterval: secondsToMilliseconds(15),
  })

  return {
    apiOK: Boolean(data?.protocolMetricsChain?.poolCount) && !loading && !error,
  }
}
