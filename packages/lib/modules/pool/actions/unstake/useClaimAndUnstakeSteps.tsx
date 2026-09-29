import { useApproveRelayerStep } from '@repo/lib/modules/relayer/useApproveRelayerStep'
import { getChainId } from '@repo/lib/config/app.config'
import { TransactionStep } from '@repo/lib/modules/transactions/transaction-steps/lib'
import { UnstakeParams, useClaimAndUnstakeStep } from './useClaimAndUnstakeStep'
import { useMemo } from 'react'
import { useShouldBatchTransactions } from '@repo/lib/modules/transactions/transaction-steps/tx-batch.hooks'

export function useClaimAndUnstakeSteps(unstakeParams: UnstakeParams): {
  isLoading: boolean
  steps: TransactionStep[]
} {
  const pool = unstakeParams.pool
  const chainId = getChainId(pool.chain)

  const { step: claimAndUnstakeStep, isLoading: isLoadingClaimAndUnstakeStep } =
    useClaimAndUnstakeStep(unstakeParams)

  const { step: relayerApprovalStep, isLoading: isLoadingRelayerApprovalStep } =
    useApproveRelayerStep(chainId)

  const shouldBatchTransactions = useShouldBatchTransactions()

  // Approvals are executed inside the same atomic batch as the multicall, so they
  // are hidden from the step list when batching (mirrors remove-liquidity).
  const steps = useMemo(
    () =>
      getApprovalAndUnstakeSteps({
        claimAndUnstakeStep,
        relayerApprovalStep,
        shouldBatchTransactions,
      }),
    [claimAndUnstakeStep, relayerApprovalStep, shouldBatchTransactions]
  )

  return {
    isLoading: isLoadingRelayerApprovalStep || isLoadingClaimAndUnstakeStep,
    steps,
  }
}

export function getApprovalAndUnstakeSteps({
  claimAndUnstakeStep,
  relayerApprovalStep,
  shouldBatchTransactions,
}: {
  claimAndUnstakeStep: TransactionStep
  relayerApprovalStep: TransactionStep
  shouldBatchTransactions: boolean
}): TransactionStep[] {
  const approvalSteps = [relayerApprovalStep]

  // Approvals that can be batched with the multicall are attached as nested steps
  claimAndUnstakeStep.nestedSteps = approvalSteps

  // When batching, the approvals are hidden from the step list (they run inside
  // the same atomic transaction as the claim and unstake multicall)
  return shouldBatchTransactions ? [claimAndUnstakeStep] : [...approvalSteps, claimAndUnstakeStep]
}
