import { TransactionStep } from '@repo/lib/modules/transactions/transaction-steps/lib'
import { getApprovalAndSwapSteps } from './useSwapSteps'

const mockTransactionStep = (id: string, completed = false): TransactionStep =>
  ({
    id,
    isComplete: () => completed,
    nestedSteps: [],
  }) as unknown as TransactionStep

const swapStep = mockTransactionStep('swapStep')
const signPermit2Step = mockTransactionStep('signPermit2Step')

const tokenApprovalSteps = [
  mockTransactionStep('tokenApprovalStep1'),
  mockTransactionStep('tokenApprovalStep2'),
]

const permit2ApprovalSteps = [
  mockTransactionStep('permit2ApprovalStep1'),
  mockTransactionStep('permit2ApprovalStep2'),
]

const baseProps = {
  tokenApprovalSteps,
  isPermit2: false,
  signPermit2Step,
  permit2ApprovalSteps,
  shouldUseSignatures: true,
  isNativeTokenIn: false,
  shouldBatchTransactions: false,
  swapStep,
}

describe('getApprovalAndSwapSteps', () => {
  describe('standard swaps', () => {
    it('standard swap', () => {
      const steps = getApprovalAndSwapSteps({ ...baseProps })

      expect(steps).toEqual([...tokenApprovalSteps, swapStep])
      expect(swapStep.nestedSteps).toEqual(tokenApprovalSteps)
    })

    it('standard swap with Safe tx batch', () => {
      const steps = getApprovalAndSwapSteps({
        ...baseProps,
        shouldBatchTransactions: true,
      })

      expect(steps).toEqual([swapStep])
      expect(swapStep.nestedSteps).toEqual(tokenApprovalSteps)
    })
  })

  describe('permit2 swaps', () => {
    it('permit2 swap with enabled signatures', () => {
      const steps = getApprovalAndSwapSteps({
        ...baseProps,
        isPermit2: true,
      })

      expect(steps).toEqual([...tokenApprovalSteps, signPermit2Step, swapStep])
    })

    it('permit2 swap with disabled signatures', () => {
      const steps = getApprovalAndSwapSteps({
        ...baseProps,
        isPermit2: true,
        shouldUseSignatures: false,
      })

      expect(steps).toEqual([...tokenApprovalSteps, ...permit2ApprovalSteps, swapStep])
    })

    it('permit2 swap with Safe tx batch and enabled signatures', () => {
      const steps = getApprovalAndSwapSteps({
        ...baseProps,
        isPermit2: true,
        shouldBatchTransactions: true,
      })

      // The permit2 signature stays visible: it is gasless, not part of the tx batch
      expect(steps).toEqual([signPermit2Step, swapStep])
      expect(swapStep.nestedSteps).toEqual(tokenApprovalSteps)
    })

    it('permit2 swap with Safe tx batch and disabled signatures', () => {
      const steps = getApprovalAndSwapSteps({
        ...baseProps,
        isPermit2: true,
        shouldUseSignatures: false,
        shouldBatchTransactions: true,
      })

      expect(steps).toEqual([swapStep])
      expect(swapStep.nestedSteps).toEqual([...tokenApprovalSteps, ...permit2ApprovalSteps])
    })

    it('native tokenIn requires no permit2 signature', () => {
      const steps = getApprovalAndSwapSteps({
        ...baseProps,
        isPermit2: true,
        isNativeTokenIn: true,
        shouldBatchTransactions: true,
      })

      expect(steps).toEqual([swapStep])
      expect(swapStep.nestedSteps).toEqual(tokenApprovalSteps)
    })

    it('permit2 swap without a signature step still attaches permit2 approvals when signatures are disabled', () => {
      // Regression: the approval branch must not depend on the signature step object
      const steps = getApprovalAndSwapSteps({
        ...baseProps,
        isPermit2: true,
        signPermit2Step: undefined,
        shouldUseSignatures: false,
      })

      expect(steps).toEqual([...tokenApprovalSteps, ...permit2ApprovalSteps, swapStep])
      expect(swapStep.nestedSteps).toEqual([...tokenApprovalSteps, ...permit2ApprovalSteps])
    })

    it('batched permit2 swap without a signature step still batches permit2 approvals', () => {
      const steps = getApprovalAndSwapSteps({
        ...baseProps,
        isPermit2: true,
        signPermit2Step: undefined,
        shouldUseSignatures: false,
        shouldBatchTransactions: true,
      })

      expect(steps).toEqual([swapStep])
      expect(swapStep.nestedSteps).toEqual([...tokenApprovalSteps, ...permit2ApprovalSteps])
    })
  })

  describe('batch edge cases', () => {
    it('does not batch when all approvals are complete', () => {
      const completedTokenApproval1 = mockTransactionStep('tokenApprovalStep1', true)
      const completedTokenApproval2 = mockTransactionStep('tokenApprovalStep2', true)
      const completedApprovals = [completedTokenApproval1, completedTokenApproval2]

      const steps = getApprovalAndSwapSteps({
        ...baseProps,
        tokenApprovalSteps: completedApprovals,
        shouldBatchTransactions: true,
      })

      expect(steps).toEqual([...completedApprovals, swapStep])
      expect(swapStep.nestedSteps).toEqual(completedApprovals)
    })
  })
})
