import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'

export const fakeGqlTokens = [
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
  },
]
