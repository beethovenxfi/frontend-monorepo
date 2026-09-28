import { defineConfig, loadEnv } from '@wagmi/cli'
import { etherscan } from '@wagmi/cli/plugins'
import sonicNetworkConfig from '@repo/lib/config/networks/sonic'

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  })

  return {
    out: '../../packages/lib/modules/web3/contracts/abi/generated.ts',
    contracts: [],
    plugins: [
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY || '',
        chainId: 146,
        contracts: [
          {
            name: 'SonicStaking',
            address: sonicNetworkConfig.contracts.beets?.lstStaking,
          },
          {
            name: 'SFC',
            address: sonicNetworkConfig.contracts.beets?.sfc,
          },
          {
            name: 'SonicStakingWithdrawRequestHelper',
            address: sonicNetworkConfig.contracts.beets?.lstWithdrawRequestHelper,
          },
          {
            name: 'Reliquary',
            address: sonicNetworkConfig.contracts.beets?.reliquary,
          },
          {
            name: 'BeetsV2BatchRelayerLibrary',
            address: '0x1498437067d7bddc4c9427964f073ee1ab4f50fc',
          },
          {
            name: 'BeetsBatchRelayer',
            address: sonicNetworkConfig.contracts.balancer?.relayerV6,
          },
          {
            name: 'MagpieLoopedSonicRouter',
            address: sonicNetworkConfig.contracts.beets?.magpieLoopedSonicRouter,
          },
          {
            name: 'LoopedSonicVault',
            address: sonicNetworkConfig.contracts.beets?.loopedSonicVault,
          },
          {
            name: 'BalancerV2Vault',
            address: sonicNetworkConfig.contracts.balancer?.vaultV2,
          },
          {
            name: 'BalancerV2GaugeV5',
            address: '0xa472438718fe7785107fcbe584d39183a6420d36',
          },
          {
            name: 'BalancerV2ComposableStablePoolV5',
            address: '0xcd4d2b142235d5650ffa6a38787ed0b7d7a51c0c',
          },
          {
            name: 'BalancerV3StablePool',
            address: '0x3d71ad2852676f8a3644a37a2932e678c0b80cf3',
          },
          {
            name: 'BalancerV3WeightedPool',
            address: '0xa476b33460e792bac5cc294ba19f0543ab00dc01',
          },
          {
            name: 'GyroEclpPool',
            address: '0x7a2284a1f44fe05db25cbe382475d02ee8f339a7',
          },
          {
            name: 'ReClammPool',
            address: '0xa4c937817f99829ac4003a3475f17a2f0d6eaf7c',
          },
          {
            name: 'VaultAdmin',
            address: sonicNetworkConfig.contracts.balancer?.vaultAdminV3,
          },
        ],
      }),
    ],
  }
})
