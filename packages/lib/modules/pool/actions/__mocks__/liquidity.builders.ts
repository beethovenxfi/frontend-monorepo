const BEETS_ADDRESS = '0x2d0e0814e62d80056181f5cd932274405966e4f0'
import { TokenAmount, Token, HumanAmount } from '@balancer/sdk'
import { Address, parseUnits } from 'viem'
import { mock } from 'vitest-mock-extended'

export function aTokenAmountMock(tokenAddress: Address, amount: HumanAmount): TokenAmount {
  const defaultTokenAmount: TokenAmount = mock<TokenAmount>({
    amount: parseUnits(amount, 18),
    token: aToken({ address: tokenAddress }),
  })

  return Object.assign({}, defaultTokenAmount)
}

export function aToken(options?: Partial<Token>): Token {
  const defaultToken = mock<Token>({
    address: BEETS_ADDRESS,
    chainId: 146,
    decimals: 18,
    symbol: 'Test token',
  })

  return Object.assign({}, defaultToken, options)
}
