import { GqlChainValues } from '@repo/lib/shared/services/api/graphql-enums'
import { PoolExample } from './pool-examples.types'

export const usdcFlyStS: PoolExample = {
  name: 'bpt-25USDC-50FLY-25stS',
  description: 'v3 weighted',
  poolId: '0xa476b33460e792bac5cc294ba19f0543ab00dc01',
  poolChain: GqlChainValues.Sonic,
  version: 3,
  // Symbol starts with a number so an explicit mock name is required
  mockName: 'bpt_25USDC_50FLY_25stSMock',
}

export const scUsdStS: PoolExample = {
  name: 'BPT-scUSD-stS',
  description: 'Sonic v2 pool whose BPT is a real ERC20 (unlike virtual v3 BPTs)',
  poolId: '0x25ca5451cd5a50ab1d324b5e64f32c0799661891000200000000000000000018',
  poolAddress: '0x25ca5451cd5a50ab1d324b5e64f32c0799661891',
  poolChain: GqlChainValues.Sonic,
  version: 2,
  mockName: 'bpt_scUSD_stSMock',
}

export const flatPoolExamples = [usdcFlyStS, scUsdStS]
