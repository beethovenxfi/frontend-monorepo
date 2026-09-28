import { TransactionStep } from '@repo/lib/modules/transactions/transaction-steps/lib'
import { getApprovalAndClaimSteps } from './useClaimAllRewardsSteps'

const step = (id: string) => ({ id }) as TransactionStep

describe('getApprovalAndClaimSteps', () => {
  it.each([false, true])(
    'keeps only the relayer approval when batching is %s',
    shouldBatchTransactions => {
      const claimAllRewardsStep = step('claim')
      const relayerApprovalStep = step('relayer')

      const steps = getApprovalAndClaimSteps({
        claimAllRewardsStep,
        relayerApprovalStep,
        shouldBatchTransactions,
      })

      expect(claimAllRewardsStep.nestedSteps).toEqual([relayerApprovalStep])

      expect(steps).toEqual(
        shouldBatchTransactions ? [claimAllRewardsStep] : [relayerApprovalStep, claimAllRewardsStep]
      )
    }
  )
})
