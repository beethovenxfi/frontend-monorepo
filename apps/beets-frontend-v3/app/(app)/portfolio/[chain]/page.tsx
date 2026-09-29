import { TransactionStateProvider } from '@repo/lib/modules/transactions/transaction-steps/TransactionStateProvider'
import ClaimNetworkPoolsLayoutWrapper from '@repo/lib/modules/portfolio/PortfolioClaim/ClaimNetworkPools/ClaimNetworkPoolsLayoutWrapper'
import { ChainSlug } from '@repo/lib/modules/pool/pool.utils'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ chain: string }>
}

export default async function NetworkClaim({ params }: Props) {
  const { chain } = await params

  if (chain !== ChainSlug.Sonic) notFound()

  return (
    <TransactionStateProvider>
      <ClaimNetworkPoolsLayoutWrapper />
    </TransactionStateProvider>
  )
}
