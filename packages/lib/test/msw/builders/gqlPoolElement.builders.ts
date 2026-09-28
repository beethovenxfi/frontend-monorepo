import { poolId, wETHAddress, wjAuraAddress } from '@repo/lib/debug-helpers'
import {
  aTokenExpandedMock,
  someGqlTokenMocks,
} from '@repo/lib/modules/tokens/__mocks__/token.builders'
import { Pool } from '@repo/lib/modules/pool/pool.types'
import type { GqlPoolWeighted } from '@repo/lib/shared/services/api/graphql-derived-types'
import { GqlChainValues, GqlPoolTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import { DeepPartial } from '@apollo/client/utilities'
import { mock } from 'vitest-mock-extended'
import { aGqlStakingMock } from './gqlStaking.builders'
import { getPoolAddress } from '@balancer/sdk'

export function aWeightedPoolMock(...options: Partial<Pool>[]): Pool {
  const poolId = '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014'
  const tokens = someGqlTokenMocks(['wS', 'USDC'])

  const options2: Partial<Pool> = {
    id: poolId,
    address: getPoolAddress(poolId),
    poolTokens: tokens as unknown as Pool['poolTokens'],
    protocolVersion: 2,
    ...options,
  }

  return aPoolMock(options2)
}

export function aWjAuraWethPoolElementMock(...options: Partial<Pool>[]): Pool {
  const tokens = [
    aTokenExpandedMock({ address: wjAuraAddress }),
    aTokenExpandedMock({ address: wETHAddress }),
  ]

  const options2 = {
    id: poolId,
    address: getPoolAddress(poolId),
    poolTokens: tokens as unknown as Pool['poolTokens'],
    protocolVersion: 2,
    ...options,
  }

  return aPoolMock(options2)
}

export function toGqlWeighedPoolMock(pool: Pool): GqlPoolWeighted {
  return {
    ...pool,
    __typename: 'GqlPoolWeighted',
  } as GqlPoolWeighted
}

export function aPoolMock(...options: Partial<Pool>[]): Pool {
  const defaultPool = mock<Pool>()

  const defaultPool1: DeepPartial<Pool> = {
    __typename: 'GqlPoolWeighted',
    protocolVersion: 2,
    address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
    poolTokens: someGqlTokenMocks(['wS', 'USDC']),
    chain: GqlChainValues.Sonic,
    createTime: 1620153071,
    decimals: 18,
    dynamicData: {
      totalLiquidity: '176725796.079429',
      totalShares: '13131700.67391808961378162',
      volume24h: '545061.9941007149',
      fees24h: '5450.619941007149',
      holdersCount: '1917',
      swapFee: '0.01',
    },
    factory: '0xa5bf2ddf098bb0ef6d120c98217dd6b141c74ee0',
    id: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014',
    name: 'Weighted wS USDC',
    symbol: 'BPT-wS-USDC',
    staking: aGqlStakingMock(),
    type: GqlPoolTypeValues.Weighted,
  }

  return Object.assign({}, defaultPool, defaultPool1, ...options)
}
