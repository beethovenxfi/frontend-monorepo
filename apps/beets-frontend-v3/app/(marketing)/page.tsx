import { LandingPageLayout } from '@/lib/modules/landing-page/LandingPageLayout'
import { getApolloServerClient } from '@repo/lib/shared/services/api/apollo-server.client'
import { mins } from '@repo/lib/shared/utils/time'
import {
  GetProtocolStatsDocument,
  GetStakedSonicDataDocument,
} from '@repo/lib/shared/services/api/generated/graphql'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'

export default async function Home() {
  const client = getApolloServerClient()

  const variables = {
    chain: PROJECT_CONFIG.defaultNetwork,
  }

  const [{ data: protocolData }, { data: stakedSonicData }] = await Promise.all([
    client.query({
      query: GetProtocolStatsDocument,
      variables,
      context: {
        fetchOptions: {
          next: { revalidate: mins(10).toSecs() },
        },
      },
    }),
    client.query({
      query: GetStakedSonicDataDocument,
      variables: {},
    }),
  ])

  if (protocolData === undefined || stakedSonicData === undefined) {
    return null
  }

  return <LandingPageLayout protocolData={protocolData} stakedSonicData={stakedSonicData} />
}
