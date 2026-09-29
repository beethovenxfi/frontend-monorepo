import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'
import {
  FakeTokenSymbol,
  fakeGetToken,
  fakeTokenBySymbol,
  fakeTokenSymbols,
} from './all-gql-tokens.fake'

test('Has fake definitions for all the symbols in FakeTokenSymbol', () => {
  fakeTokenSymbols.forEach((symbol: FakeTokenSymbol) => {
    expect(fakeTokenBySymbol(symbol)).toBeDefined()
  })
})

test('fakeGetToken', () => {
  expect(
    fakeGetToken('0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38', GqlChainValues.Sonic)?.symbol
  ).toBe('wS')

  expect(
    fakeGetToken('0xe5da20f15420ad15de0fa650600afc998bbe3955', GqlChainValues.Sonic)?.symbol
  ).toBe('stS')

  expect(
    fakeGetToken('0x29219dd400f2bf60e5a23d13be72b486d4038894', GqlChainValues.Sonic)?.symbol
  ).toBe('USDC')
})
