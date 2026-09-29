'use client'

import { getGqlChain } from '@repo/lib/config/app.config'
import { SupportedChainId } from '@repo/lib/config/config.types'
import { useNetworkConfig } from '@repo/lib/config/useNetworkConfig'
import {
  ManagedResult,
  TransactionLabels,
} from '@repo/lib/modules/transactions/transaction-steps/lib'
import { captureWagmiExecutionError } from '@repo/lib/shared/utils/query-errors'
import { Address, ContractFunctionArgs, ContractFunctionName, erc20Abi } from 'viem'
import {
  useEstimateGas,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { useTxHash } from '../safe.hooks'
import { useChainSwitch } from '../useChainSwitch'
import { TransactionExecution, TransactionSimulation, WriteAbiMutability } from './contract.types'
import { useOnTransactionConfirmation } from './useOnTransactionConfirmation'
import { useOnTransactionSubmission } from './useOnTransactionSubmission'
import { getWaitForReceiptTimeout } from './wagmi-helpers'
import { onlyExplicitRefetch } from '@repo/lib/shared/utils/queries'

export interface ManagedErc20TransactionInput {
  tokenAddress: Address
  functionName: ContractFunctionName<typeof erc20Abi, WriteAbiMutability>
  labels: TransactionLabels
  isComplete?: () => boolean
  onTransactionChange: (transaction: ManagedResult) => void
  chainId: SupportedChainId
  args?: ContractFunctionArgs<typeof erc20Abi, WriteAbiMutability> | null
  enabled: boolean
  simulationMeta: Record<string, unknown>
}

export function useManagedErc20Transaction({
  tokenAddress,
  functionName,
  labels,
  chainId,
  args,
  enabled = true,
  simulationMeta,
}: ManagedErc20TransactionInput) {
  const { minConfirmations } = useNetworkConfig()
  const { shouldChangeNetwork } = useChainSwitch(chainId)

  const txConfig = {
    abi: erc20Abi,
    address: tokenAddress,
    functionName: functionName as ContractFunctionName<any, WriteAbiMutability>,
    // This any is 'safe'. The type provided to any is the same type for args that is inferred via the functionName
    args: args as any,
  }

  const simulateQuery = useSimulateContract({
    ...txConfig,
    chainId,
    query: {
      enabled: enabled && !shouldChangeNetwork,
      meta: simulationMeta,
      // Avoid background refetches while waiting for min block confirmations.
      ...onlyExplicitRefetch,
    },
  })

  const estimateGasQuery = useEstimateGas({
    ...txConfig,
    query: {
      enabled: !!txConfig && !shouldChangeNetwork,
      // Avoid background refetches while waiting for min block confirmations.
      ...onlyExplicitRefetch,
    },
  })

  const writeQuery = useWriteContract()

  const { txHash, isSafeTxLoading } = useTxHash({
    chainId,
    wagmiTxHash: writeQuery.data,
  })

  const transactionStatusQuery = useWaitForTransactionReceipt({
    chainId,
    hash: txHash,
    confirmations: minConfirmations,
    timeout: getWaitForReceiptTimeout(chainId),
  })

  const bundle = {
    chainId,
    simulation: estimateGasQuery as TransactionSimulation,
    execution: writeQuery as TransactionExecution,
    result: transactionStatusQuery,
    isSafeTxLoading,
  }

  // on successful submission to chain, add tx to cache
  useOnTransactionSubmission({
    labels,
    hash: txHash,
    chain: getGqlChain(chainId),
  })

  // on confirmation, update tx in tx cache
  useOnTransactionConfirmation({
    labels,
    status: bundle.result.data?.status,
    hash: bundle.result.data?.transactionHash,
  })

  const managedWriteAsync = async (
    overrideArgs?: ContractFunctionArgs<typeof erc20Abi, WriteAbiMutability>
  ) => {
    if (!simulateQuery.data) return

    const finalArgs = overrideArgs ?? args

    try {
      const request = {
        ...simulateQuery.data.request,
        args: finalArgs as any,
      }

      return await writeQuery.writeContractAsync(request)
    } catch (e: unknown) {
      captureWagmiExecutionError(e, 'Error in ERC20 transaction execution', {
        chainId,
        request: simulateQuery.data.request,
      })

      throw e
    }
  }

  return {
    ...bundle,
    executeAsync: managedWriteAsync,
  } satisfies ManagedResult
}
