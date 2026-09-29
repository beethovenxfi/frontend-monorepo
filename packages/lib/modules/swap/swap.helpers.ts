import { OSwapAction, SdkSimulateSwapResponse, SwapAction, SwapState } from './swap.types'
import { SwapSimulationQueryResult } from './queries/useSimulateSwapQuery'
import { isBnParseable } from '@repo/lib/shared/utils/numbers'

export function swapActionPastTense(action: SwapAction): string {
  switch (action) {
    case OSwapAction.WRAP:
      return 'Wrapped'
    case OSwapAction.UNWRAP:
      return 'Unwrapped'
    case OSwapAction.SWAP:
      return 'Swapped'
    default:
      throw new Error('Unsupported swap action')
  }
}

const swapErrorPatterns = [
  {
    pattern: /WrapAmountTooSmall/,
    message: 'Your input is too small, please try a bigger amount.',
  },
]

export function parseSwapError(msg?: string): string {
  if (!msg) return 'Unknown error'
  const pattern = swapErrorPatterns.find(p => p.pattern.test(msg))
  return pattern ? pattern.message : msg
}

export function isV3SwapRoute(simulationQuery: SwapSimulationQueryResult): boolean {
  return orderRouteVersion(simulationQuery) === 3
}

export function orderRouteVersion(simulationQuery: SwapSimulationQueryResult): number {
  const queryData = simulationQuery.data as SdkSimulateSwapResponse
  const orderRouteVersion = queryData ? queryData.protocolVersion : 2
  return orderRouteVersion
}

// Heals invalid persisted amounts (e.g. '.') that older versions could write
// to localStorage, so affected users recover without clearing storage manually
export function sanitizeSwapState(state: SwapState): SwapState {
  const sanitizeToken = (token: SwapState['tokenIn']) =>
    token.amount !== '' && !isBnParseable(token.amount)
      ? { ...token, amount: '', scaledAmount: BigInt(0) }
      : token

  return {
    ...state,
    tokenIn: sanitizeToken(state.tokenIn),
    tokenOut: sanitizeToken(state.tokenOut),
  }
}
