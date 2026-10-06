'use client'

import { Box, Container, HStack, VStack, Image, Text } from '@chakra-ui/react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import Link from 'next/link'
import FadeInOnView from '@repo/lib/shared/components/containers/FadeInOnView'

export default function ThirdPartyServices() {
  const services = [
    {
      name: 'dRPC',
      description:
        'Used to retrieve Sonic blockchain data and construct or simulate contract calls. RPC requests may include wallet addresses and transaction-related data, which are processed by dRPC and its infrastructure providers.',
      iconUrl: '/images/services/drpc.svg',
    },
    {
      name: 'Hypernative',
      description:
        'Used to screen wallet addresses for risk and compliance purposes. Wallet addresses are shared with Hypernative Inc. to perform these checks.',
      iconUrl: '/images/services/hypernative.svg',
    },
    {
      name: 'Vercel',
      description:
        'Used to deploy and host the UI and its API routes. Hosting infrastructure may process network and request information and retain operational logs or cached responses needed to run and secure the service.',
      iconUrl: '/images/services/vercel.svg',
    },
    {
      name: 'CoinGecko',
      description:
        'Used to fetch token information and prices. Requests include the token or network information needed to retrieve that data.',
      iconUrl: '/images/services/coingecko.svg',
    },
    {
      name: 'WalletConnect and wallet providers',
      description:
        'Used to connect wallets and request transaction signing. Depending on your chosen wallet and connection method, providers may process wallet addresses, connection or session information, and transaction requests under their own policies.',
      iconUrl: '/images/logos/walletConnectWallet.svg',
    },
  ]

  return (
    <Container py="2xl">
      <Prose>
        <div className="pb-4">
          <FadeInOnView>
            <div className="subsection">
              <Box mt="3xl" pb="sm">
                <h1>Use of third-party services</h1>
                <p>
                  <em>Last updated: October 6, 2026</em>
                </p>
                <p>
                  Beets is an open-source, permissionless, decentralized protocol. The smart
                  contracts that power the ecosystem may be used by anyone. This website is the
                  Beets web interface to the ecosystem on Sonic and is also open source. You are
                  free to fork it on GitHub and modify it as you wish.
                </p>
              </Box>
              <p>
                The UI and its supporting infrastructure use the services described below. The
                providers involved and the information they process depend on the features and
                wallet connections you use. Beets does not use these services for analytics,
                tracking, advertising, or affiliate promotional offers. See our{' '}
                <Link href="privacy-policy">Privacy policy</Link> for more about data processing,
                browser storage, and retention.
              </p>
              <VStack align="start" spacing="xl" w="full">
                {services.map(service => (
                  <HStack align="start" key={service.name} spacing="md">
                    <Image
                      alt={service.name}
                      borderRadius="full"
                      boxSize="50px"
                      src={service.iconUrl}
                    />
                    <VStack align="start" lineHeight={1} spacing="xs" w="full">
                      <Text as="span" fontSize="xl" fontWeight="bold">
                        {service.name}
                      </Text>
                      <Text as="span" color="grayText">
                        {service.description}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </div>
          </FadeInOnView>
        </div>
      </Prose>
    </Container>
  )
}
