import { TransactionStep } from '@repo/lib/modules/transactions/transaction-steps/lib'
import { useMemo } from 'react'
import { ClaimAllRewardsStepParams, useClaimAllRewardsStep } from './useClaimAllRewardsStep'
import { useApproveRelayerStep } from '@repo/lib/modules/relayer/useApproveRelayerStep'
import { getChainId } from '@repo/lib/config/app.config'
import { useShouldBatchTransactions } from '@repo/lib/modules/transactions/transaction-steps/tx-batch.hooks'

export function useClaimAllRewardsSteps(params: ClaimAllRewardsStepParams) {
  const pool = params.pools[0]

  if (!pool) {
    throw new Error('Pools should contain at least one element')
  }

  const chainId = getChainId(pool.chain)

  const { step: relayerApprovalStep, isLoading: isLoadingRelayerApprovalStep } =
    useApproveRelayerStep(chainId)

  const { step: claimAllRewardsStep, isLoading: isLoadingClaimAllRewards } =
    useClaimAllRewardsStep(params)

  const shouldBatchTransactions = useShouldBatchTransactions()

  // Approvals are executed inside the same atomic batch as the multicall, so they
  // are hidden from the step list when batching (mirrors remove-liquidity).
  const steps = useMemo(
    () =>
      getApprovalAndClaimSteps({
        claimAllRewardsStep,
        relayerApprovalStep,
        shouldBatchTransactions,
      }),
    [claimAllRewardsStep, relayerApprovalStep, shouldBatchTransactions]
  )

  return {
    isLoading: isLoadingRelayerApprovalStep || isLoadingClaimAllRewards,
    steps,
  }
}

export function getApprovalAndClaimSteps({
  claimAllRewardsStep,
  relayerApprovalStep,
  shouldBatchTransactions,
}: {
  claimAllRewardsStep: TransactionStep
  relayerApprovalStep: TransactionStep
  shouldBatchTransactions: boolean
}): TransactionStep[] {
  const approvalSteps = [relayerApprovalStep]

  // Approvals that can be batched with the multicall are attached as nested steps
  claimAllRewardsStep.nestedSteps = approvalSteps

  // When batching, the approvals are hidden from the step list (they run inside
  // the same atomic transaction as the claim multicall)
  return shouldBatchTransactions ? [claimAllRewardsStep] : [...approvalSteps, claimAllRewardsStep]
}
