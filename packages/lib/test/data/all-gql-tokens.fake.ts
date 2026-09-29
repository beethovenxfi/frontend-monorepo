import { ApiToken } from '@repo/lib/modules/tokens/token.types'
import type { GqlToken } from '@repo/lib/shared/services/api/graphql-derived-types'
import type { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'
import { isSameAddress } from '@repo/lib/shared/utils/addresses'
import { Address } from 'viem'

export const fakeTokenSymbols = ['S', 'wS', 'stS', 'USDC', 'scUSD', 'FLY', 'anS', 'SiloWS'] as const
export type FakeTokenSymbol = (typeof fakeTokenSymbols)[number]

export const allFakeGqlTokens: GqlToken[] = [
  {
    __typename: 'GqlToken',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    name: 'Sonic',
    symbol: 'S',
    decimals: 18,
    chainId: 146,
    chain: GqlChainValues.Sonic,
    logoURI: '',
    priority: 0,
    tradable: true,
    isErc4626: false,
    isBufferAllowed: true,
    coingeckoId: null,
    priceRateProviderData: null,
  },
  {
    __typename: 'GqlToken',
    address: '0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38',
    name: 'Wrapped Sonic',
    symbol: 'wS',
    decimals: 18,
    chainId: 146,
    chain: GqlChainValues.Sonic,
    logoURI: '',
    priority: 0,
    tradable: true,
    isErc4626: false,
    isBufferAllowed: true,
    coingeckoId: null,
    priceRateProviderData: null,
  },
  {
    __typename: 'GqlToken',
    address: '0xe5da20f15420ad15de0fa650600afc998bbe3955',
    name: 'Beets Staked Sonic',
    symbol: 'stS',
    decimals: 18,
    chainId: 146,
    chain: GqlChainValues.Sonic,
    logoURI: '',
    priority: 0,
    tradable: true,
    isErc4626: false,
    isBufferAllowed: true,
    coingeckoId: null,
    priceRateProviderData: null,
  },
  {
    __typename: 'GqlToken',
    address: '0x29219dd400f2bf60e5a23d13be72b486d4038894',
    name: 'Bridged USDC',
    symbol: 'USDC',
    decimals: 6,
    chainId: 146,
    chain: GqlChainValues.Sonic,
    logoURI: '',
    priority: 0,
    tradable: true,
    isErc4626: false,
    isBufferAllowed: true,
    coingeckoId: null,
    priceRateProviderData: null,
  },
  {
    __typename: 'GqlToken',
    address: '0xd3dce716f3ef535c5ff8d041c1a41c3bd89b97ae',
    name: 'Sonic USD',
    symbol: 'scUSD',
    decimals: 6,
    chainId: 146,
    chain: GqlChainValues.Sonic,
    logoURI: '',
    priority: 0,
    tradable: true,
    isErc4626: false,
    isBufferAllowed: true,
    coingeckoId: null,
    priceRateProviderData: null,
  },
  {
    __typename: 'GqlToken',
    address: '0x6c9b3a74ae4779da5ca999371ee8950e8db3407f',
    name: 'fly.trade',
    symbol: 'FLY',
    decimals: 18,
    chainId: 146,
    chain: GqlChainValues.Sonic,
    logoURI: '',
    priority: 0,
    tradable: true,
    isErc4626: false,
    isBufferAllowed: true,
    coingeckoId: null,
    priceRateProviderData: null,
  },
  {
    __typename: 'GqlToken',
    address: '0x0c4e186eae8acaa7f7de1315d5ad174be39ec987',
    name: 'Sonic Anvil',
    symbol: 'anS',
    decimals: 18,
    chainId: 146,
    chain: GqlChainValues.Sonic,
    logoURI: '',
    priority: 0,
    tradable: true,
    isErc4626: false,
    isBufferAllowed: true,
    coingeckoId: null,
    priceRateProviderData: null,
  },
  {
    __typename: 'GqlToken',
    address: '0x016c306e103fbf48ec24810d078c65ad13c5f11b',
    name: 'Silo wS',
    symbol: 'SiloWS',
    decimals: 18,
    chainId: 146,
    chain: GqlChainValues.Sonic,
    logoURI: '',
    priority: 0,
    tradable: true,
    isErc4626: true,
    isBufferAllowed: true,
    coingeckoId: null,
    priceRateProviderData: null,
  },
]

export function fakeTokenBySymbol(symbol: FakeTokenSymbol) {
  const token = allFakeGqlTokens.find(token => token.symbol === symbol)

  if (!token) {
    console.log(
      'Available fake tokens: ',
      allFakeGqlTokens.map(token => token.symbol)
    )

    throw new Error(`Invalid symbol for fake token: ${symbol}`)
  }

  return token
}

export function fakeTokenByAddress(address: Address) {
  const token = allFakeGqlTokens.find(token => isSameAddress(token.address, address))

  if (!token) {
    console.log(
      'Available fake tokens: ',
      allFakeGqlTokens.map(token => token.symbol)
    )

    throw new Error(`Invalid address for fake token: ${address}`)
  }

  return token
}

export function fakeTokenByAddressAndChain(address: Address, chain: GqlChain) {
  const token = allFakeGqlTokens.find(
    token => isSameAddress(token.address, address) && token.chain === chain
  )

  if (!token) {
    console.log(
      'Available fake tokens: ',
      allFakeGqlTokens.map(token => token.symbol)
    )

    throw new Error(`Invalid address for fake token: ${address}, chain: ${chain}`)
  }

  return token
}

export function fakeGetToken(address: string, chain: GqlChain): ApiToken | undefined {
  return fakeTokenByAddressAndChain(address as Address, chain as GqlChain)
}
