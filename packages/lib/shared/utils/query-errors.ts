import { ensureError } from './errors'
import {
  isInvariantRatioPIErrorMessage,
  isInvariantRatioSimulationErrorMessage,
  isNotEnoughGasErrorMessage,
  isPausedErrorMessage,
  isUserRejectedError,
} from './error-filters'
import {
  AddLiquidityParams,
  stringifyHumanAmountsIn,
} from '@repo/lib/modules/pool/actions/add-liquidity/queries/add-liquidity-keys'
import { RemoveLiquidityParams } from '@repo/lib/modules/pool/actions/remove-liquidity/queries/remove-liquidity-keys'
import { CreatePoolInput } from '@repo/lib/modules/pool/actions/create/types'
import { InitPoolInputV3 } from '@balancer/sdk'
import { SimulateSwapParams } from '@repo/lib/modules/swap/queries/useSimulateSwapQuery'
import { SwapState } from '@repo/lib/modules/swap/swap.types'
import { SwapHandler } from '@repo/lib/modules/swap/handlers/Swap.handler'
import { cannotCalculatePriceImpactError } from '@repo/lib/modules/price-impact/price-impact.utils'
import { isDev } from '@repo/lib/config/app.config'
import { isPoolSurgingError } from './error-filters'

/**
 * Context attached to React Query errors for local diagnostics.
 * We use this type in React Query's "meta" property (exposed by wagmi).
 * More info: https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose#defining-on-demand-messages
 */
export type QueryErrorMetadata = {
  errorMessage: string
  errorName?: string
  context?: {
    extra?: Record<string, unknown>
    level?: 'fatal' | 'error'
  }
}

type ErrorExtra = Record<string, unknown>

type EdgeCasePoolMetaParams = {
  hasSurgeHook?: boolean
}

type AddMetaParams = AddLiquidityParams & {
  chainId: number
  blockNumber?: bigint
} & EdgeCasePoolMetaParams

export function queryErrorMetaForAddLiquidityHandler(errorMessage: string, params: AddMetaParams) {
  return createAddHandlerMetadata('HandlerQueryError', errorMessage, params)
}

type RemoveMetaParams = RemoveLiquidityParams & {
  chainId: number
  blockNumber?: bigint
} & EdgeCasePoolMetaParams

export function queryErrorMetaForRemoveLiquidityHandler(
  errorMessage: string,
  params: RemoveMetaParams
) {
  return createRemoveHandlerMetadata('HandlerQueryError', errorMessage, params)
}

export type SwapBuildCallExtras = {
  handler: SwapHandler
  swapState: SwapState
  slippage: string
  wethIsEth: boolean
}

export type SwapMetaParams = (SimulateSwapParams | SwapBuildCallExtras) & {
  chainId: number
  blockNumber?: bigint
}
export type CreatePoolMetaParams = CreatePoolInput & {
  blockNumber?: bigint
}

export function queryErrorMetaForCreatePoolHandler(
  errorMessage: string,
  params: CreatePoolMetaParams
) {
  return createCreatePoolMetadata('HandlerQueryError', errorMessage, params)
}

export type InitPoolMetaParams = InitPoolInputV3 & {
  blockNumber?: bigint
}

export function queryErrorMetaForInitializePoolHandler(
  errorMessage: string,
  params: InitPoolMetaParams
) {
  return createCreatePoolMetadata('HandlerQueryError', errorMessage, params)
}

export function queryErrorMetaForSwapHandler(errorMessage: string, params: SwapMetaParams) {
  return createSwapHandlerMetadata('HandlerQueryError', errorMessage, params)
}

/**
 * Used by wagmi-managed queries to attach context for simulation errors.
 */
export function queryErrorMetaForWagmiSimulation(errorMessage: string, extra: ErrorExtra) {
  return createFatalErrorMetadata('WagmiSimulationError', errorMessage, extra)
}

/**
 * Used by wagmi-managed queries to attach context for execution errors.
 */
export function queryErrorMetaForWagmiExecution(errorMessage: string, extra: ErrorExtra) {
  return createFatalErrorMetadata('WagmiExecutionError', errorMessage, extra)
}

export function logWagmiExecutionError(error: unknown, errorMessage: string, extra: ErrorExtra) {
  logError(error, queryErrorMetaForWagmiExecution(errorMessage, extra))
}

/**
 * Builds metadata for fatal query errors.
 */
export function createFatalErrorMetadata(
  errorName: string,
  errorMessage: string,
  extra: ErrorExtra
) {
  return createFatalMetadata(errorName, errorMessage, extra)
}

/**
 * Creates query error metadata for add-liquidity handlers.
 */
function createAddHandlerMetadata(
  errorName: string,
  errorMessage: string,
  params: AddLiquidityParams
) {
  const { pool, ...restParams } = params

  const extra: ErrorExtra = {
    handler: params.handler.constructor.name,
    params: {
      ...restParams,
      poolId: pool.id,
      poolType: pool.type,
      humanAmountsIn: stringifyHumanAmountsIn(pool, params.humanAmountsIn),
    },
  }

  return createFatalMetadata(errorName, errorMessage, extra)
}

/**
 * Creates query error metadata for remove-liquidity handlers.
 */
function createRemoveHandlerMetadata(
  errorName: string,
  errorMessage: string,
  params: RemoveMetaParams
) {
  const extra: ErrorExtra = {
    handler: params.handler.constructor.name,
    params,
  }

  return createFatalMetadata(errorName, errorMessage, extra)
}

/**
 * Creates query error metadata for swap handlers.
 */
function createSwapHandlerMetadata(
  errorName: string,
  errorMessage: string,
  params: SwapMetaParams
) {
  const { handler, ...rest } = params

  const extra: ErrorExtra = {
    handler: handler.constructor.name,
    params: rest,
  }

  return createFatalMetadata(errorName, errorMessage, extra)
}

/**
 * Creates query error metadata for create/initialize pool handlers.
 */
function createCreatePoolMetadata(
  errorName: string,
  errorMessage: string,
  params: CreatePoolMetaParams | InitPoolMetaParams
) {
  const extra: ErrorExtra = {
    params,
  }

  return createFatalMetadata(errorName, errorMessage, extra)
}

function createFatalMetadata(
  errorName: string,
  errorMessage: string,
  extra: ErrorExtra
): QueryErrorMetadata {
  const context: QueryErrorMetadata['context'] = {
    extra,
    level: 'fatal',
  }

  return {
    errorMessage,
    errorName,
    context,
  }
}

function logError(e: unknown, { context, errorMessage, errorName }: QueryErrorMetadata) {
  const causeError = ensureError(e)
  if (isUserRejectedError(causeError)) return

  const errorMessageWithCause = errorMessage + `\n\nCause: \n` + causeError.message
  const error = new Error(errorMessageWithCause, { cause: causeError })
  if (errorName) error.name = errorName
  console.error(error, context)
}

export function shouldIgnore(message: string, stackTrace = ''): boolean {
  if (isUserRejectedError(new Error(message))) return true

  if (isNotEnoughGasErrorMessage(message)) return true

  /*
    There are some edge cases where price impact calculation is not possible so we display "Unknown price impact".
    These are expected input states, not actionable application errors.
   */
  if (cannotCalculatePriceImpactError(new Error(message))) return true

  /*
   This is a known rainbow-kit/wagmi related issue that is randomly happening to many users.
   It does not crash the app so we are ignoring it.
   More context: https://github.com/rainbow-me/rainbowkit/issues/2238
  */
  if (message.includes('provider.disconnect is not a function')) return true
  if (stackTrace.includes('provider.disconnect is not a function')) return true

  /*
    This error is caused by different wallet extensions (btc.js, solana.js, sui.js ) when trying to register.
    It does not crash the app and it's not controlled by our app so the only thing we can do is ignore it.

    Context: https://github.com/wallet-standard/wallet-standard/issues/96
   */
  if (
    message.includes(`Cannot destructure property 'register' of 'undefined' as it is undefined.`)
  ) {
    return true
  }

  /*
    Thrown from useWalletClient() when loading a pool page from scratch.
    It looks like is is caused by the useWalletClient call in AddTokenToWalletButton but it does not affect it's behavior.
  */
  if (message.includes('.getAccounts is not a function')) return true

  /*
    Error thrown by Library detector chrome extension:
    https://chromewebstore.google.com/detail/library-detector/cgaocdmhkmfnkdkbnckgmpopcbpaaejo?hl=en
  */
  if (message.includes(`Cannot set properties of null (setting 'content')`)) return true

  /*
    Frequent errors in rainbowkit + wagmi that do not mean a real crash
  */
  if (message.includes('Connector not connected')) return true
  if (message.includes('Provider not found')) return true

  /*
    More info: https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
  */
  if (message.includes('ResizeObserver loop limit exceeded')) return true

  /*
    Wallet Connect bug when switching certain networks.
    It does not crash the app.
    More info: https://github.com/MetaMask/metamask-mobile/issues/9157
  */
  if (message.includes('Missing or invalid. emit() chainId')) return true

  /*
    Some extensions cause this error
  */
  if (
    message.startsWith('Maximum call stack size exceeded') &&
    stackTrace.includes('injectWalletGuard.js')
  ) {
    return true
  }

  if (
    message.startsWith('Maximum call stack size exceeded') &&
    stackTrace.includes('HTMLMediaElement.canPlayType')
  ) {
    return true
  }

  /*
    com.okex.wallet injects code that causes this error
  */
  if (message.startsWith('Cannot redefine property:') && stackTrace.includes('inject.bundle.js')) {
    return true
  }

  /*
    Wagmi error which does not crash.
    Can be reproduced by:
      1. Connect with Rabby
      2. Disconnect Rabby from the app
      3. Click "Connect wallet" and chose WalletConnect
  */
  if (
    message === "Cannot read properties of undefined (reading 'address')" &&
    stackTrace.includes('getWalletClient.js')
  ) {
    return true
  }

  /*
    Extension related error which does not crash.
  */
  if (
    message ===
      "Cannot destructure property 'address' of '(intermediate value)' as it is undefined." &&
    stackTrace.includes('extensionPageScript.js')
  ) {
    return true
  }

  /*
    Waller Connect bug
    More info: https://github.com/WalletConnect/walletconnect-monorepo/issues/4318
  */
  if (message.startsWith('WebSocket connection failed for host: wss://relay.walletconnect.com')) {
    return true
  }

  if (message.startsWith('WebSocket connection closed abnormally with code: 3000')) {
    return true
  }

  /*
    Ignores issues with this kind of message:

    The source https://balancer.fi/[URI] has not been authorized yet

    We cannot reproduce but it looks like it does not crash the app.

    https://vercel.com/balancer/frontend-v3/deployments?range={%22start%22:%222024-09-02T22:00:00.000Z%22,%22end%22:%222024-09-03T21:59:59.999Z%22}

  */
  if (
    message.includes('The source https://balancer.fi') &&
    message.includes('has not been authorized yet')
  ) {
    return true
  }

  if (isPausedErrorMessage(message)) return true

  /*
    When hitting Invariant Ratio Above max error (only in v3 pools) we enforce proportional UX, so this is an expected flow.
    Context: https://github.com/balancer/balancer-maths/blob/8aaf871acd9e138ba855f03be723cdfd630f4246/typescript/src/weighted/weightedMath.ts#L10
    */
  if (isInvariantRatioSimulationErrorMessage(message) || isInvariantRatioPIErrorMessage(message)) {
    return true
  }

  /*
    Error thrown from Metamask when:
    1. The extension popup is ignored by the user
    2. They close the RainbowKit "Connect a wallet" modal
    3. They click "Connect wallet" and chose "Metamask" a second time

    As the extension modal was still opened in the background, MM will throw this error, that can be safely ignored as the Rainbowkit modal clearly states:
    "Confirm connection in the extension"
   */
  if (message.includes(`Request of type 'wallet_requestPermissions' already pending for origin`)) {
    return true
  }

  // Ignore ensName lookup errors happening in development
  if (
    isDev &&
    message.includes(`The contract does not have the function "reverse"`) &&
    stackTrace.includes('getEnsName')
  ) {
    return true
  }

  if (message.includes('Unreachable URL')) return true

  return false
}

export function shouldIgnoreQueryError(error: Error, errorMeta?: QueryErrorMetadata): boolean {
  if (shouldIgnore(error.message, error.stack)) return true

  const params = errorMeta?.context?.extra?.params as { hasSurgeHook?: boolean } | undefined
  return isPoolSurgingError(error.message, params?.hasSurgeHook ?? false)
}

export function getTenderlyUrl(errorMetadata?: QueryErrorMetadata) {
  if (!errorMetadata) return
  return errorMetadata.context?.extra?.tenderlyUrl as string | undefined
}
