import { PoolsPage } from '@repo/lib/shared/pages/PoolsPage/PoolsPage'
import { BeetsPromoBanner } from '@/lib/components/promos/BeetsPromoBanner'
import { GetStakedSonicDataDocument } from '@repo/lib/shared/services/api/generated/graphql'
import { getApolloServerClient } from '@repo/lib/shared/services/api/apollo-server.client'
import {
  PoolPageStats,
  PoolPageStatsSkeleton,
} from '@repo/lib/shared/pages/PoolsPage/PoolPageStats'
import { Suspense } from 'react'

async function StakedSonicPoolPageStats() {
  const client = getApolloServerClient()

  const { data: stakedSonicData } = await client.query({
    query: GetStakedSonicDataDocument,
    variables: {},
  })

  if (!stakedSonicData) return null

  return (
    <PoolPageStats rewardsClaimed24h={stakedSonicData.stsGetGqlStakedSonicData.rewardsClaimed24h} />
  )
}

export default function PoolsPageWrapper() {
  return (
    <PoolsPage
      stats={
        <Suspense fallback={<PoolPageStatsSkeleton />}>
          <StakedSonicPoolPageStats />
        </Suspense>
      }
    >
      {/* TODO: add <PromoBanners /> at a later date */}
      <BeetsPromoBanner />
    </PoolsPage>
  )
}
