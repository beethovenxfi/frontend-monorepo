import { TokenBalance } from './fork-options'

/*
  Edit the following defaults to setup scenarios for manual tests
  (E2E dev tests have their own fork option defaults)

  Some slots cannot be easily guessed so we hardcode them from here:
  https://github.com/balancer/b-sdk/blob/2f8df4f20c9c9e478c58c5169c30055488d227c5/test/lib/utils/addresses.ts#L208

  If not found on that list alternative tools can be used:
  - https://hackmd.io/@oS7_rZFHQnCFw_lsRei3nw/HJN1rQWmA
    `curl http://token-bss.xyz/eth/<token-address> | jq`
  - https://github.com/kendricktan/slot20
 */

export const sonicTokenBalances: TokenBalance[] = [
  {
    // bpt-anS-SiloWS pool token, added directly (not ERC4626). Shares slot; balanceOf applies a
    // multiplicative rate, so setErc20Balance derives the share amount rather than writing it raw.
    tokenAddress: '0x0c4e186eae8acaa7f7de1315d5ad174be39ec987', // anS
    value: '1000',
    slot: 157n,
  },
  {
    // Underlying of the SiloWS ERC4626 token in the bpt-anS-SiloWS boosted pool
    tokenAddress: '0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38', // wS
    value: '1000',
    slot: 0n,
  },
  {
    tokenAddress: '0xe6cc4d855b4fd4a9d02f46b9adae4c5efb1764b5', // LUDWIG
    value: '100000',
  },
  {
    tokenAddress: '0x3bce5cb273f0f148010bbea2470e7b5df84c7812', // scETH
    value: '0.01',
  },
  {
    tokenAddress: '0xbb30e76d9bb2cc9631f7fc5eb8e87b5aff32bfbd', // scBTC
    value: '0.01',
  },
  {
    tokenAddress: '0x29219dd400f2bf60e5a23d13be72b486d4038894', // USDC.e
    value: '1000',
    decimals: 6,
  },
  {
    tokenAddress: '0xd3dce716f3ef535c5ff8d041c1a41c3bd89b97ae', // scUSD
    value: '1000',
    decimals: 6,
  },
  {
    tokenAddress: '0x2d0e0814e62d80056181f5cd932274405966e4f0', // BEETS
    value: '1000000',
    decimals: 18,
  },
  {
    tokenAddress: '0xe5da20f15420ad15de0fa650600afc998bbe3955', // stS
    value: '1000',
    decimals: 18,
    slot: BigInt('0x52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace00'),
  },
]
