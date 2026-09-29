import { TransactionStep } from '@repo/lib/modules/transactions/transaction-steps/lib'
import { getApprovalAndUnstakeSteps } from './useClaimAndUnstakeSteps'

const step = (id: string) => ({ id }) as TransactionStep

describe('getApprovalAndUnstakeSteps', () => {
  it.each([false, true])(
    'keeps only the relayer approval when batching is %s',
    shouldBatchTransactions => {
      const claimAndUnstakeStep = step('claim-and-unstake')
      const relayerApprovalStep = step('relayer')

      const steps = getApprovalAndUnstakeSteps({
        claimAndUnstakeStep,
        relayerApprovalStep,
        shouldBatchTransactions,
      })

      expect(claimAndUnstakeStep.nestedSteps).toEqual([relayerApprovalStep])

      expect(steps).toEqual(
        shouldBatchTransactions ? [claimAndUnstakeStep] : [relayerApprovalStep, claimAndUnstakeStep]
      )
    }
  )
})
