import { FetchPoolProps } from '@repo/lib/modules/pool/pool.types'
import { ChainSlug } from '@repo/lib/modules/pool/pool.utils'
import { generatePoolMetadata, PoolLayout, PoolMetadata } from '@repo/lib/shared/layouts/PoolLayout'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{
  params: Promise<Omit<FetchPoolProps, 'chain'> & { chain: string }>
}>

function assertSonicRouteChain(chain: string): asserts chain is ChainSlug {
  if (chain !== ChainSlug.Sonic) notFound()
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const resolvedParams = await props.params
  const { chain } = resolvedParams
  assertSonicRouteChain(chain)
  const poolMetadata: PoolMetadata = await generatePoolMetadata({ ...resolvedParams, chain })

  return {
    ...poolMetadata.metadata,
    openGraph: {
      // We could use a more accurate dynamic image by variant, pool type, chain, etc
      images: '/images/opengraph/og-beets-pool.png',
    },
  }
}

export default async function PoolLayoutWrapper({ params, children }: Props) {
  const { id, chain, variant } = await params
  assertSonicRouteChain(chain)

  return (
    <PoolLayout chain={chain} id={id} variant={variant}>
      {children}
    </PoolLayout>
  )
}
