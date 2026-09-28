import { HumanAmount } from '@balancer/sdk'
import { Address } from 'viem'
import { sonic } from 'viem/chains'
import { sonicTokenBalances } from './fork-default-balances'

export type TokenBalance = {
  tokenAddress: Address
  decimals?: number
  value: HumanAmount
  slot?: bigint
}

export type ChainTokenBalance = TokenBalance & {
  chainId: number
}

export type TokenBalancesByChain = Record<number, TokenBalance[]>

export type ForkOptions = {
  chainId: number
  forkBalances: TokenBalancesByChain
}
declare global {
  interface Window {
    forkOptions?: ForkOptions
  }
}

const defaultForkBalances: TokenBalancesByChain = {
  [sonic.id]: sonicTokenBalances,
}

export const defaultManualForkOptions = {
  chainId: sonic.id,
  forkBalances: defaultForkBalances,
}
