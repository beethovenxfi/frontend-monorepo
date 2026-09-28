import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { ApolloClient } from '@apollo/client'
import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'
import { NativeWrapHandler } from './NativeWrap.handler'
import { TEST_ADDRESSES, createSdkBuildSwapInputs } from '@repo/lib/test/utils/swap-test-utils'

vi.mock('@repo/lib/config/app.config', async importOriginal => {
  const actual = await importOriginal<typeof import('@repo/lib/config/app.config')>()
  return {
    ...actual,
    getNetworkConfig: vi.fn(() => ({
      chainId: 146,
      chain: GqlChainValues.Sonic,
      tokens: {
        addresses: {
          wNativeAsset: TEST_ADDRESSES.weth,
        },
        nativeAsset: { address: TEST_ADDRESSES.eth },
      },
      contracts: { balancer: { vaultV2: TEST_ADDRESSES.vaultV2 } },
    })),
    getChainId: vi.fn(() => 146),
    getNativeAssetAddress: vi.fn(() => TEST_ADDRESSES.eth),
    getWrappedNativeAssetAddress: vi.fn(() => TEST_ADDRESSES.weth),
  }
})

vi.mock('@repo/lib/shared/utils/addresses', async importOriginal => {
  const actual = await importOriginal<typeof import('@repo/lib/shared/utils/addresses')>()
  return {
    ...actual,
    isNativeAsset: vi.fn(
      (_chain: string, token: string) => token.toLowerCase() === TEST_ADDRESSES.eth
    ),
    isSameAddress: vi.fn(
      (a?: string, b?: string) => !!(a && b && a.toLowerCase() === b.toLowerCase())
    ),
  }
})

vi.mock('@repo/lib/modules/web3/transports', async importOriginal => {
  const actual = await importOriginal<typeof import('@repo/lib/modules/web3/transports')>()
  return { ...actual, getRpcUrl: vi.fn(() => 'https://mainnet.infura.io/v3/test') }
})

vi.mock('@balancer/sdk', async importOriginal => {
  const actual = await importOriginal<typeof import('@balancer/sdk')>()
  return {
    ...actual,
    Slippage: { fromPercentage: vi.fn((pct: string) => ({ value: Number(pct) / 100 })) },
    SwapKind: { GivenIn: 'GIVEN_IN', GivenOut: 'GIVEN_OUT' },
    Token: class {
      constructor(
        public chainId: number,
        public address: string,
        public decimals: number
      ) {}
    },
    TokenAmount: {
      fromHumanAmount: vi.fn(() => ({ amount: BigInt(1e18), token: { decimals: 18 } })),
    },
  }
})

vi.mock('viem', async importOriginal => {
  const actual = await importOriginal<typeof import('viem')>()
  return {
    ...actual,
    encodeFunctionData: vi.fn(params => `0xencoded_${params.functionName}` as `0x${string}`),
  }
})

describe('NativeWrapHandler.build', () => {
  let handler: NativeWrapHandler

  beforeEach(() => {
    handler = new NativeWrapHandler({ query: vi.fn() } as unknown as ApolloClient)
  })

  it('builds wrap transaction with correct value', () => {
    const tx = handler.build(
      createSdkBuildSwapInputs({
        tokenInAddress: TEST_ADDRESSES.eth,
        tokenOutAddress: TEST_ADDRESSES.weth,
        wethIsEth: true,
      })
    )

    expect(tx.to).toBe(TEST_ADDRESSES.weth)
    expect(tx.value).toBe(BigInt(1e18))
  })

  it('builds unwrap transaction with zero value', () => {
    const tx = handler.build(
      createSdkBuildSwapInputs({
        tokenInAddress: TEST_ADDRESSES.weth,
        tokenOutAddress: TEST_ADDRESSES.eth,
      })
    )

    expect(tx.to).toBe(TEST_ADDRESSES.weth)
    expect(tx.value).toBe(BigInt(0))
  })

  it('throws for non-valid wrap tokens', () => {
    expect(() =>
      handler.build(
        createSdkBuildSwapInputs({
          tokenInAddress: TEST_ADDRESSES.bal,
          tokenOutAddress: TEST_ADDRESSES.weth,
        })
      )
    ).toThrow('Non valid wrap tokens')
  })
})
