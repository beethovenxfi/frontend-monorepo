import { getChainId } from '@repo/lib/config/app.config'
import { getNetworkConfig } from '@repo/lib/config/networks'
import { selectStakingService } from '@repo/lib/modules/staking/selectStakingService'
import { ManagedTransactionButton } from '@repo/lib/modules/transactions/transaction-steps/TransactionButton'
import {
  ManagedResult,
  TransactionLabels,
  TransactionStep,
} from '@repo/lib/modules/transactions/transaction-steps/lib'
import type { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { GqlPoolStakingTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import { sentryMetaForWagmiSimulation } from '@repo/lib/shared/utils/query-errors'
import { useMemo, useState } from 'react'
import { ManagedTransactionInput } from '../../../web3/contracts/useManagedTransaction'
import { useUserAccount } from '../../../web3/UserAccountProvider'
import { useClaimCallDataQuery } from './useClaimCallDataQuery'
import { ClaimableBalancesResult } from '@repo/lib/modules/portfolio/PortfolioClaim/useClaimableBalances'
import { ClaimablePool } from './ClaimProvider'
import { isTransactionSuccess } from '@repo/lib/modules/transactions/transaction-steps/transaction.helper'
import { TransactionBatchButton } from '@repo/lib/modules/transactions/transaction-steps/TransactionBatchButton'
import { buildBatchableTxCall } from '@repo/lib/modules/transactions/transaction-steps/tx-batch.helpers'

const claimAllRewardsStepId = 'claim-all-rewards'

export type ClaimAllRewardsStepParams = {
  pools: ClaimablePool[]
  claimableBalancesQuery: ClaimableBalancesResult
}

export function useClaimAllRewardsStep({
  pools,
  claimableBalancesQuery,
}: ClaimAllRewardsStepParams) {
  const [isClaimQueryEnabled, setIsClaimQueryEnabled] = useState(false)
  const { isConnected } = useUserAccount()
  const [transaction, setTransaction] = useState<ManagedResult | undefined>()

  const { claimableRewards, refetchClaimableRewards } = claimableBalancesQuery

  const pool = pools[0]

  if (!pool) {
    throw new Error('Pools should contain at least one element')
  }

  const chain = pool.chain as GqlChain
  const chainId = getChainId(chain)
  const stakingType = pool.staking?.type || GqlPoolStakingTypeValues.Gauge

  const claimRewardGauges = claimableRewards.map(r => r.gaugeAddress)
  const shouldClaimMany = claimRewardGauges.length > 1
  const stakingService = selectStakingService(chain, stakingType)

  const { data: claimData, isLoading } = useClaimCallDataQuery({
    claimRewardGauges,
    gaugeService: stakingService,
    enabled: isClaimQueryEnabled,
  })

  const labels: TransactionLabels = {
    init: `Claim${shouldClaimMany ? ' all' : ''}`,
    title: `Claim${shouldClaimMany ? ' all' : ''}`,
    confirming: 'Confirming claim...',
    confirmed: 'Claimed!',
    tooltip: shouldClaimMany
      ? 'Claim all rewards from your gauges'
      : 'Claim all rewards from your gauge',
  }

  const txSimulationMeta = sentryMetaForWagmiSimulation(
    'Error in wagmi tx simulation (Claim all rewards transaction)',
    {
      poolId: pool.id,
      chain,
      claimData,
      stakingType,
      claimRewardGauges,
    }
  )

  const props: ManagedTransactionInput = {
    labels,
    chainId,
    contractId: 'balancer.relayerV6',
    contractAddress: getNetworkConfig(chain).contracts.balancer.relayerV6,
    functionName: 'multicall',
    args: [claimData],
    enabled: claimRewardGauges.length > 0 && claimData.length > 0,
    txSimulationMeta,
    onTransactionChange: setTransaction,
  }

  const step = useMemo(
    (): TransactionStep => ({
      id: claimAllRewardsStepId,
      labels,
      stepType: 'claim',
      transaction,
      isComplete: () => isConnected && isTransactionSuccess(transaction),
      onActivated: () => setIsClaimQueryEnabled(true),
      onDeactivated: () => setIsClaimQueryEnabled(false),
      onSuccess: () => {
        refetchClaimableRewards()
      },
      renderAction: () => <ManagedTransactionButton id={claimAllRewardsStepId} {...props} />,
      renderBatchAction: (currentStep: TransactionStep) => (
        <TransactionBatchButton
          chainId={chainId}
          currentStep={currentStep}
          labels={labels}
          onTransactionChange={setTransaction}
        />
      ),
      // Last step in the batch: the multicall is preceded by the relayer approval
      isBatchEnd: true,
      batchableTxCall: claimData?.length
        ? buildBatchableTxCall(
            'balancer.relayerV6',
            getNetworkConfig(chain).contracts.balancer.relayerV6,
            'multicall',
            [claimData]
          )
        : undefined,
    }),
    [transaction, labels, refetchClaimableRewards, isConnected, props, claimData, chainId, chain]
  )

  return { step, isLoading }
}
