import { vi } from 'vitest'
import type { GqlChain, GqlSorSwapType } from '@repo/lib/shared/services/api/generated/graphql'
import { GqlChainValues, GqlSorSwapTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import type {
  BuildSwapInputs,
  SdkBuildSwapInputs,
  SdkSimulateSwapResponse,
  SimulateSwapInputs,
} from '../../modules/swap/swap.types'
import type { Address } from 'viem'

export const TEST_ADDRESSES = {
  s: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ws: '0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38',
  usdc: '0x29219dd400f2bf60e5a23d13be72b486d4038894',
  beets: '0x2d0e0814e62d80056181f5cd932274405966e4f0',
  vaultV2: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
} as const

export const TEST_ACCOUNT = '0x1111111111111111111111111111111111111111' as Address

export function createMockSdkSimulateSwapResponse(overrides?: {
  protocolVersion?: number
  callData?: string
  permit2CallData?: string
  router?: Address
}): {
  simulateResponse: SdkSimulateSwapResponse
  mockBuildCall: ReturnType<typeof vi.fn>
  mockBuildCallWithPermit2: ReturnType<typeof vi.fn>
} {
  const protocolVersion = overrides?.protocolVersion ?? 2
  const callData = overrides?.callData ?? '0xdefault_tx_data'
  const permit2CallData = overrides?.permit2CallData ?? '0xpermit2_tx_data'
  const router = overrides?.router ?? TEST_ADDRESSES.vaultV2

  const mockBuildCall = vi.fn().mockReturnValue({
    callData,
    value: BigInt(0),
    to: router,
  })

  const mockBuildCallWithPermit2 = vi.fn().mockReturnValue({
    callData: permit2CallData,
    value: BigInt(0),
    to: router,
  })

  const simulateResponse: SdkSimulateSwapResponse = {
    swap: {
      buildCall: mockBuildCall,
      buildCallWithPermit2: mockBuildCallWithPermit2,
    } as unknown as SdkSimulateSwapResponse['swap'],
    queryOutput: {
      to: router,
      swapKind: 'GIVEN_IN',
    } as unknown as SdkSimulateSwapResponse['queryOutput'],
    protocolVersion,
    hopCount: 1,
    router,
    paths: [],
    swapType: GqlSorSwapTypeValues.ExactIn,
    effectivePrice: '1',
    effectivePriceReversed: '1',
    returnAmount: '1.0',
  }

  return { simulateResponse, mockBuildCall, mockBuildCallWithPermit2 }
}

export function createSdkBuildSwapInputs(overrides?: {
  tokenInAddress?: Address
  tokenOutAddress?: Address
  tokenInAmount?: string
  tokenOutAmount?: string
  slippagePercent?: string
  account?: Address
  wethIsEth?: boolean
  selectedChain?: GqlChain
  swapType?: GqlSorSwapType
  protocolVersion?: number
  permit2?: BuildSwapInputs['permit2']
  simulateResponse?: SdkSimulateSwapResponse
}): SdkBuildSwapInputs {
  const simulateResponse =
    overrides?.simulateResponse ??
    createMockSdkSimulateSwapResponse({ protocolVersion: overrides?.protocolVersion })
      .simulateResponse

  return {
    tokenIn: {
      address: overrides?.tokenInAddress ?? TEST_ADDRESSES.ws,
      amount: overrides?.tokenInAmount ?? '1.0',
      scaledAmount: BigInt(1e18),
    },
    tokenOut: {
      address: overrides?.tokenOutAddress ?? TEST_ADDRESSES.usdc,
      amount: overrides?.tokenOutAmount ?? '100.0',
      scaledAmount: BigInt(1e20),
    },
    swapType: overrides?.swapType ?? GqlSorSwapTypeValues.ExactIn,
    selectedChain: overrides?.selectedChain ?? GqlChainValues.Sonic,
    account: overrides?.account ?? TEST_ACCOUNT,
    slippagePercent: overrides?.slippagePercent ?? '0.5',
    simulateResponse,
    wethIsEth: overrides?.wethIsEth ?? false,
    permit2: overrides?.permit2,
  }
}

export function createMockSimulateSwapInputs(overrides?: {
  chain?: GqlChain
  tokenIn?: Address
  tokenOut?: Address
  swapType?: GqlSorSwapType
  swapAmount?: string
}): SimulateSwapInputs {
  return {
    chain: overrides?.chain ?? GqlChainValues.Sonic,
    tokenIn: overrides?.tokenIn ?? TEST_ADDRESSES.s,
    tokenOut: overrides?.tokenOut ?? TEST_ADDRESSES.ws,
    swapType: overrides?.swapType ?? GqlSorSwapTypeValues.ExactIn,
    swapAmount: overrides?.swapAmount ?? '1.0',
  }
}
