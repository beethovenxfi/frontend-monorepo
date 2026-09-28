//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BalancerV2ComposableStablePoolV5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xcd4d2b142235d5650ffa6a38787ed0b7d7a51c0c)
 */
export const balancerV2ComposableStablePoolV5Abi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ComposableStablePool.NewPoolParams',
        type: 'tuple',
        components: [
          { name: 'vault', internalType: 'contract IVault', type: 'address' },
          {
            name: 'protocolFeeProvider',
            internalType: 'contract IProtocolFeePercentagesProvider',
            type: 'address',
          },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          {
            name: 'tokens',
            internalType: 'contract IERC20[]',
            type: 'address[]',
          },
          {
            name: 'rateProviders',
            internalType: 'contract IRateProvider[]',
            type: 'address[]',
          },
          {
            name: 'tokenRateCacheDurations',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          {
            name: 'exemptFromYieldProtocolFeeFlag',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'amplificationParameter',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'swapFeePercentage',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'pauseWindowDuration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'bufferPeriodDuration',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'version', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'startValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AmpUpdateStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'currentValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AmpUpdateStopped',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'PausedStateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeType',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'protocolFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProtocolFeePercentageCacheUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'enabled', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'RecoveryModeStateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'swapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SwapFeePercentageChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'rate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenRateCacheUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'provider',
        internalType: 'contract IRateProvider',
        type: 'address',
        indexed: true,
      },
      {
        name: 'cacheDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenRateProviderSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DELEGATE_PROTOCOL_SWAP_FEES_SENTINEL',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'disableRecoveryMode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'enableRecoveryMode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'getActionId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getActualSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAmplificationParameter',
    outputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'isUpdating', internalType: 'bool', type: 'bool' },
      { name: 'precision', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAuthorizer',
    outputs: [{ name: '', internalType: 'contract IAuthorizer', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBptIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDomainSeparator',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastJoinExitData',
    outputs: [
      {
        name: 'lastJoinExitAmplification',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'lastPostJoinExitInvariant',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumBpt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'getNextNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPausedState',
    outputs: [
      { name: 'paused', internalType: 'bool', type: 'bool' },
      { name: 'pauseWindowEndTime', internalType: 'uint256', type: 'uint256' },
      { name: 'bufferPeriodEndTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPoolId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'feeType', internalType: 'uint256', type: 'uint256' }],
    name: 'getProtocolFeePercentageCache',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProtocolFeesCollector',
    outputs: [
      {
        name: '',
        internalType: 'contract IProtocolFeesCollector',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProtocolSwapFeeDelegation',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRateProviders',
    outputs: [{ name: '', internalType: 'contract IRateProvider[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getScalingFactors',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'contract IERC20', type: 'address' }],
    name: 'getTokenRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'contract IERC20', type: 'address' }],
    name: 'getTokenRateCache',
    outputs: [
      { name: 'rate', internalType: 'uint256', type: 'uint256' },
      { name: 'oldRate', internalType: 'uint256', type: 'uint256' },
      { name: 'duration', internalType: 'uint256', type: 'uint256' },
      { name: 'expires', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVault',
    outputs: [{ name: '', internalType: 'contract IVault', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'inRecoveryMode',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isExemptFromYieldProtocolFee',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'contract IERC20', type: 'address' }],
    name: 'isTokenExemptFromYieldProtocolFee',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'protocolSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'userData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onExitPool',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'protocolSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'userData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onJoinPool',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'swapRequest',
        internalType: 'struct IPoolSwapStructs.SwapRequest',
        type: 'tuple',
        components: [
          { name: 'kind', internalType: 'enum IVault.SwapKind', type: 'uint8' },
          { name: 'tokenIn', internalType: 'contract IERC20', type: 'address' },
          {
            name: 'tokenOut',
            internalType: 'contract IERC20',
            type: 'address',
          },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'address', type: 'address' },
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'indexIn', internalType: 'uint256', type: 'uint256' },
      { name: 'indexOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'onSwap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'protocolSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'userData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'queryExit',
    outputs: [
      { name: 'bptIn', internalType: 'uint256', type: 'uint256' },
      { name: 'amountsOut', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'protocolSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'userData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'queryJoin',
    outputs: [
      { name: 'bptOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountsIn', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'poolConfig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setAssetManagerPoolConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'swapFeePercentage', internalType: 'uint256', type: 'uint256' }],
    name: 'setSwapFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'duration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setTokenRateCacheDuration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'rawEndValue', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'startAmplificationParameterUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stopAmplificationParameterUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'updateProtocolFeePercentageCache',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'contract IERC20', type: 'address' }],
    name: 'updateTokenRateCache',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xcd4d2b142235d5650ffa6a38787ed0b7d7a51c0c)
 */
export const balancerV2ComposableStablePoolV5Address = {
  146: '0xCd4D2b142235D5650fFA6A38787eD0b7d7A51c0C',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xcd4d2b142235d5650ffa6a38787ed0b7d7a51c0c)
 */
export const balancerV2ComposableStablePoolV5Config = {
  address: balancerV2ComposableStablePoolV5Address,
  abi: balancerV2ComposableStablePoolV5Abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BalancerV2GaugeV5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xa472438718fe7785107fcbe584d39183a6420d36)
 */
export const balancerV2GaugeV5Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_owner', type: 'address', indexed: true },
      { name: '_spender', type: 'address', indexed: true },
      { name: '_value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_from', type: 'address', indexed: true },
      { name: '_to', type: 'address', indexed: true },
      { name: '_value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_user', type: 'address', indexed: true },
      { name: '_value', type: 'uint256', indexed: false },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_user', type: 'address', indexed: true },
      { name: '_value', type: 'uint256', indexed: false },
    ],
    name: 'Withdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_user', type: 'address', indexed: true },
      { name: '_original_balance', type: 'uint256', indexed: false },
      { name: '_original_supply', type: 'uint256', indexed: false },
      { name: '_working_balance', type: 'uint256', indexed: false },
      { name: '_working_supply', type: 'uint256', indexed: false },
    ],
    name: 'UpdateLiquidityLimit',
  },
  {
    type: 'constructor',
    inputs: [
      { name: '_voting_escrow_delegation_proxy', type: 'address' },
      { name: '_bal_pseudo_minter', type: 'address' },
      { name: '_beets_dao_multisig', type: 'address' },
      { name: '_bal_vault', type: 'address' },
      { name: '_version', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_value', type: 'uint256' },
      { name: '_user', type: 'address' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_value', type: 'uint256' },
      { name: '_user', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
      { name: '_deadline', type: 'uint256' },
      { name: '_v', type: 'uint8' },
      { name: '_r', type: 'bytes32' },
      { name: '_s', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_added_value', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_subtracted_value', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', type: 'address' }],
    name: 'user_checkpoint',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', type: 'address' }],
    name: 'claimable_tokens',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_addr', type: 'address' },
      { name: '_token', type: 'address' },
    ],
    name: 'claimed_reward',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', type: 'address' },
      { name: '_reward_token', type: 'address' },
    ],
    name: 'claimable_reward',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_receiver', type: 'address' }],
    name: 'set_rewards_receiver',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claim_rewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_addr', type: 'address' }],
    name: 'claim_rewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_addr', type: 'address' },
      { name: '_receiver', type: 'address' },
    ],
    name: 'claim_rewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_addr', type: 'address' },
      { name: '_receiver', type: 'address' },
      { name: '_reward_indexes', type: 'uint256[]' },
    ],
    name: 'claim_rewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_reward_token', type: 'address' },
      { name: '_distributor', type: 'address' },
    ],
    name: 'add_reward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_reward_token', type: 'address' },
      { name: '_distributor', type: 'address' },
    ],
    name: 'set_reward_distributor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_reward_token', type: 'address' },
      { name: '_amount', type: 'uint256' },
    ],
    name: 'deposit_reward_token',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'killGauge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unkillGauge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'integrate_checkpoint',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'bal_token',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'bal_pseudo_minter',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'voting_escrow_delegation_proxy',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'authorizer_adaptor',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_lp_token', type: 'address' },
      { name: '_version', type: 'string' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lp_token',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'working_balances',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'working_supply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'period',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    name: 'period_timestamp',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'integrate_checkpoint_of',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'integrate_fraction',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    name: 'integrate_inv_supply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'integrate_inv_supply_of',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'reward_count',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    name: 'reward_tokens',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'reward_data',
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'distributor', type: 'address' },
          { name: 'period_finish', type: 'uint256' },
          { name: 'rate', type: 'uint256' },
          { name: 'last_update', type: 'uint256' },
          { name: 'integral', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'rewards_receiver',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'arg0', type: 'address' },
      { name: 'arg1', type: 'address' },
    ],
    name: 'reward_integral_for',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'is_killed',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    name: 'inflation_rate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xa472438718fe7785107fcbe584d39183a6420d36)
 */
export const balancerV2GaugeV5Address = {
  146: '0xa472438718Fe7785107fCbE584d39183a6420D36',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xa472438718fe7785107fcbe584d39183a6420d36)
 */
export const balancerV2GaugeV5Config = {
  address: balancerV2GaugeV5Address,
  abi: balancerV2GaugeV5Abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BalancerV2Vault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xba12222222228d8ba445958a75a0704d566bf2c8)
 */
export const balancerV2VaultAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'authorizer',
        internalType: 'contract IAuthorizer',
        type: 'address',
      },
      { name: 'weth', internalType: 'contract IWETH', type: 'address' },
      { name: 'pauseWindowDuration', internalType: 'uint256', type: 'uint256' },
      {
        name: 'bufferPeriodDuration',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newAuthorizer',
        internalType: 'contract IAuthorizer',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AuthorizerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ExternalBalanceTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'contract IFlashLoanRecipient',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'feeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FlashLoan',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: true,
      },
      { name: 'delta', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'InternalBalanceChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'PausedStateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'poolId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'liquidityProvider',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokens',
        internalType: 'contract IERC20[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'deltas',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
      {
        name: 'protocolFeeAmounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'PoolBalanceChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'poolId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'assetManager',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: true,
      },
      {
        name: 'cashDelta',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
      {
        name: 'managedDelta',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
    ],
    name: 'PoolBalanceManaged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'poolId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'poolAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'specialization',
        internalType: 'enum IVault.PoolSpecialization',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'PoolRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'relayer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'RelayerApprovalChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'poolId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'tokenIn',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOut',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountIn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountOut',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'poolId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'tokens',
        internalType: 'contract IERC20[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'TokensDeregistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'poolId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'tokens',
        internalType: 'contract IERC20[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'assetManagers',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'TokensRegistered',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WETH',
    outputs: [{ name: '', internalType: 'contract IWETH', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'kind', internalType: 'enum IVault.SwapKind', type: 'uint8' },
      {
        name: 'swaps',
        internalType: 'struct IVault.BatchSwapStep[]',
        type: 'tuple[]',
        components: [
          { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'assetInIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'assetOutIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'assets', internalType: 'contract IAsset[]', type: 'address[]' },
      {
        name: 'funds',
        internalType: 'struct IVault.FundManagement',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'fromInternalBalance', internalType: 'bool', type: 'bool' },
          {
            name: 'recipient',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'toInternalBalance', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: 'limits', internalType: 'int256[]', type: 'int256[]' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'batchSwap',
    outputs: [{ name: 'assetDeltas', internalType: 'int256[]', type: 'int256[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
    ],
    name: 'deregisterTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address payable', type: 'address' },
      {
        name: 'request',
        internalType: 'struct IVault.ExitPoolRequest',
        type: 'tuple',
        components: [
          {
            name: 'assets',
            internalType: 'contract IAsset[]',
            type: 'address[]',
          },
          {
            name: 'minAmountsOut',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
          { name: 'toInternalBalance', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'exitPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'recipient',
        internalType: 'contract IFlashLoanRecipient',
        type: 'address',
      },
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'userData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'flashLoan',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'getActionId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAuthorizer',
    outputs: [{ name: '', internalType: 'contract IAuthorizer', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDomainSeparator',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
    ],
    name: 'getInternalBalance',
    outputs: [{ name: 'balances', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getNextNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPausedState',
    outputs: [
      { name: 'paused', internalType: 'bool', type: 'bool' },
      { name: 'pauseWindowEndTime', internalType: 'uint256', type: 'uint256' },
      { name: 'bufferPeriodEndTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'poolId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getPool',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'enum IVault.PoolSpecialization',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
    ],
    name: 'getPoolTokenInfo',
    outputs: [
      { name: 'cash', internalType: 'uint256', type: 'uint256' },
      { name: 'managed', internalType: 'uint256', type: 'uint256' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
      { name: 'assetManager', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'poolId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getPoolTokens',
    outputs: [
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProtocolFeesCollector',
    outputs: [
      {
        name: '',
        internalType: 'contract ProtocolFeesCollector',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'relayer', internalType: 'address', type: 'address' },
    ],
    name: 'hasApprovedRelayer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      {
        name: 'request',
        internalType: 'struct IVault.JoinPoolRequest',
        type: 'tuple',
        components: [
          {
            name: 'assets',
            internalType: 'contract IAsset[]',
            type: 'address[]',
          },
          {
            name: 'maxAmountsIn',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
          { name: 'fromInternalBalance', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'joinPool',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'ops',
        internalType: 'struct IVault.PoolBalanceOp[]',
        type: 'tuple[]',
        components: [
          {
            name: 'kind',
            internalType: 'enum IVault.PoolBalanceOpKind',
            type: 'uint8',
          },
          { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'token', internalType: 'contract IERC20', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'managePoolBalance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'ops',
        internalType: 'struct IVault.UserBalanceOp[]',
        type: 'tuple[]',
        components: [
          {
            name: 'kind',
            internalType: 'enum IVault.UserBalanceOpKind',
            type: 'uint8',
          },
          { name: 'asset', internalType: 'contract IAsset', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'sender', internalType: 'address', type: 'address' },
          {
            name: 'recipient',
            internalType: 'address payable',
            type: 'address',
          },
        ],
      },
    ],
    name: 'manageUserBalance',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'kind', internalType: 'enum IVault.SwapKind', type: 'uint8' },
      {
        name: 'swaps',
        internalType: 'struct IVault.BatchSwapStep[]',
        type: 'tuple[]',
        components: [
          { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'assetInIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'assetOutIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'assets', internalType: 'contract IAsset[]', type: 'address[]' },
      {
        name: 'funds',
        internalType: 'struct IVault.FundManagement',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'fromInternalBalance', internalType: 'bool', type: 'bool' },
          {
            name: 'recipient',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'toInternalBalance', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'queryBatchSwap',
    outputs: [{ name: '', internalType: 'int256[]', type: 'int256[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'specialization',
        internalType: 'enum IVault.PoolSpecialization',
        type: 'uint8',
      },
    ],
    name: 'registerPool',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
      { name: 'assetManagers', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'registerTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newAuthorizer',
        internalType: 'contract IAuthorizer',
        type: 'address',
      },
    ],
    name: 'setAuthorizer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'relayer', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setRelayerApproval',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'singleSwap',
        internalType: 'struct IVault.SingleSwap',
        type: 'tuple',
        components: [
          { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'kind', internalType: 'enum IVault.SwapKind', type: 'uint8' },
          { name: 'assetIn', internalType: 'contract IAsset', type: 'address' },
          {
            name: 'assetOut',
            internalType: 'contract IAsset',
            type: 'address',
          },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: 'funds',
        internalType: 'struct IVault.FundManagement',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'fromInternalBalance', internalType: 'bool', type: 'bool' },
          {
            name: 'recipient',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'toInternalBalance', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swap',
    outputs: [{ name: 'amountCalculated', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xba12222222228d8ba445958a75a0704d566bf2c8)
 */
export const balancerV2VaultAddress = {
  146: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xba12222222228d8ba445958a75a0704d566bf2c8)
 */
export const balancerV2VaultConfig = {
  address: balancerV2VaultAddress,
  abi: balancerV2VaultAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BalancerV3StablePool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x3d71ad2852676f8a3644a37a2932e678c0b80cf3)
 */
export const balancerV3StablePoolAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'params',
        internalType: 'struct StablePool.NewPoolParams',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          {
            name: 'amplificationParameter',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'version', internalType: 'string', type: 'string' },
        ],
      },
      { name: 'vault', internalType: 'contract IVault', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AmpUpdateAlreadyStarted' },
  { type: 'error', inputs: [], name: 'AmpUpdateDurationTooShort' },
  { type: 'error', inputs: [], name: 'AmpUpdateNotStarted' },
  { type: 'error', inputs: [], name: 'AmpUpdateRateTooFast' },
  { type: 'error', inputs: [], name: 'AmplificationFactorTooHigh' },
  { type: 'error', inputs: [], name: 'AmplificationFactorTooLow' },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC2612InvalidSigner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAccountNonce',
  },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'SenderIsNotVault',
  },
  { type: 'error', inputs: [], name: 'SenderNotAllowed' },
  { type: 'error', inputs: [], name: 'StableComputeBalanceDidNotConverge' },
  { type: 'error', inputs: [], name: 'StableInvariantDidNotConverge' },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
  { type: 'error', inputs: [], name: 'ZeroDivision' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'startValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AmpUpdateStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'currentValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AmpUpdateStopped',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'balancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: 'tokenInIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'invariantRatio', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computeBalance',
    outputs: [{ name: 'newBalance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'balancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: 'rounding', internalType: 'enum Rounding', type: 'uint8' },
    ],
    name: 'computeInvariant',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'emitApproval',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'emitTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'getActionId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAggregateFeePercentages',
    outputs: [
      {
        name: 'aggregateSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'aggregateYieldFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAmplificationParameter',
    outputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'isUpdating', internalType: 'bool', type: 'bool' },
      { name: 'precision', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAmplificationState',
    outputs: [
      {
        name: 'amplificationState',
        internalType: 'struct AmplificationState',
        type: 'tuple',
        components: [
          { name: 'startValue', internalType: 'uint64', type: 'uint64' },
          { name: 'endValue', internalType: 'uint64', type: 'uint64' },
          { name: 'startTime', internalType: 'uint32', type: 'uint32' },
          { name: 'endTime', internalType: 'uint32', type: 'uint32' },
        ],
      },
      { name: 'precision', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentLiveBalances',
    outputs: [
      {
        name: 'balancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaximumInvariantRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaximumSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumInvariantRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getStablePoolDynamicData',
    outputs: [
      {
        name: 'data',
        internalType: 'struct StablePoolDynamicData',
        type: 'tuple',
        components: [
          {
            name: 'balancesLiveScaled18',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'tokenRates', internalType: 'uint256[]', type: 'uint256[]' },
          {
            name: 'staticSwapFeePercentage',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'bptRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amplificationParameter',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'startValue', internalType: 'uint256', type: 'uint256' },
          { name: 'endValue', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint32', type: 'uint32' },
          { name: 'endTime', internalType: 'uint32', type: 'uint32' },
          { name: 'isAmpUpdating', internalType: 'bool', type: 'bool' },
          { name: 'isPoolInitialized', internalType: 'bool', type: 'bool' },
          { name: 'isPoolPaused', internalType: 'bool', type: 'bool' },
          { name: 'isPoolInRecoveryMode', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getStablePoolImmutableData',
    outputs: [
      {
        name: 'data',
        internalType: 'struct StablePoolImmutableData',
        type: 'tuple',
        components: [
          {
            name: 'tokens',
            internalType: 'contract IERC20[]',
            type: 'address[]',
          },
          {
            name: 'decimalScalingFactors',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          {
            name: 'amplificationParameterPrecision',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getStaticSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTokenInfo',
    outputs: [
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
      {
        name: 'tokenInfo',
        internalType: 'struct TokenInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'tokenType', internalType: 'enum TokenType', type: 'uint8' },
          {
            name: 'rateProvider',
            internalType: 'contract IRateProvider',
            type: 'address',
          },
          { name: 'paysYieldFees', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: 'balancesRaw', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'lastBalancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTokens',
    outputs: [{ name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVault',
    outputs: [{ name: '', internalType: 'contract IVault', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'incrementNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'request',
        internalType: 'struct PoolSwapParams',
        type: 'tuple',
        components: [
          { name: 'kind', internalType: 'enum SwapKind', type: 'uint8' },
          {
            name: 'amountGivenScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'balancesScaled18',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'indexIn', internalType: 'uint256', type: 'uint256' },
          { name: 'indexOut', internalType: 'uint256', type: 'uint256' },
          { name: 'router', internalType: 'address', type: 'address' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'onSwap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'rawEndValue', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'startAmplificationParameterUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stopAmplificationParameterUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x3d71ad2852676f8a3644a37a2932e678c0b80cf3)
 */
export const balancerV3StablePoolAddress = {
  146: '0x3d71ad2852676f8A3644A37A2932e678c0B80Cf3',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x3d71ad2852676f8a3644a37a2932e678c0b80cf3)
 */
export const balancerV3StablePoolConfig = {
  address: balancerV3StablePoolAddress,
  abi: balancerV3StablePoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BalancerV3WeightedPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xa476b33460e792bac5cc294ba19f0543ab00dc01)
 */
export const balancerV3WeightedPoolAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'params',
        internalType: 'struct WeightedPool.NewPoolParams',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'numTokens', internalType: 'uint256', type: 'uint256' },
          {
            name: 'normalizedWeights',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'version', internalType: 'string', type: 'string' },
        ],
      },
      { name: 'vault', internalType: 'contract IVault', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'BaseOutOfBounds' },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC2612InvalidSigner',
  },
  { type: 'error', inputs: [], name: 'ExponentOutOfBounds' },
  { type: 'error', inputs: [], name: 'InputLengthMismatch' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAccountNonce',
  },
  { type: 'error', inputs: [], name: 'InvalidExponent' },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  { type: 'error', inputs: [], name: 'InvalidToken' },
  { type: 'error', inputs: [], name: 'MaxInRatio' },
  { type: 'error', inputs: [], name: 'MaxOutRatio' },
  { type: 'error', inputs: [], name: 'MinWeight' },
  { type: 'error', inputs: [], name: 'NormalizedWeightInvariant' },
  { type: 'error', inputs: [], name: 'ProductOutOfBounds' },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'SenderIsNotVault',
  },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
  { type: 'error', inputs: [], name: 'WeightedPoolBptRateUnsupported' },
  { type: 'error', inputs: [], name: 'ZeroDivision' },
  { type: 'error', inputs: [], name: 'ZeroInvariant' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'balancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: 'tokenInIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'invariantRatio', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computeBalance',
    outputs: [{ name: 'newBalance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'balancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: 'rounding', internalType: 'enum Rounding', type: 'uint8' },
    ],
    name: 'computeInvariant',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'emitApproval',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'emitTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAggregateFeePercentages',
    outputs: [
      {
        name: 'aggregateSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'aggregateYieldFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentLiveBalances',
    outputs: [
      {
        name: 'balancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaximumInvariantRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaximumSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumInvariantRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getNormalizedWeights',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getStaticSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTokenInfo',
    outputs: [
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
      {
        name: 'tokenInfo',
        internalType: 'struct TokenInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'tokenType', internalType: 'enum TokenType', type: 'uint8' },
          {
            name: 'rateProvider',
            internalType: 'contract IRateProvider',
            type: 'address',
          },
          { name: 'paysYieldFees', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: 'balancesRaw', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'lastBalancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTokens',
    outputs: [{ name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVault',
    outputs: [{ name: '', internalType: 'contract IVault', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getWeightedPoolDynamicData',
    outputs: [
      {
        name: 'data',
        internalType: 'struct WeightedPoolDynamicData',
        type: 'tuple',
        components: [
          {
            name: 'balancesLiveScaled18',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'tokenRates', internalType: 'uint256[]', type: 'uint256[]' },
          {
            name: 'staticSwapFeePercentage',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'isPoolInitialized', internalType: 'bool', type: 'bool' },
          { name: 'isPoolPaused', internalType: 'bool', type: 'bool' },
          { name: 'isPoolInRecoveryMode', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getWeightedPoolImmutableData',
    outputs: [
      {
        name: 'data',
        internalType: 'struct WeightedPoolImmutableData',
        type: 'tuple',
        components: [
          {
            name: 'tokens',
            internalType: 'contract IERC20[]',
            type: 'address[]',
          },
          {
            name: 'decimalScalingFactors',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          {
            name: 'normalizedWeights',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'incrementNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'request',
        internalType: 'struct PoolSwapParams',
        type: 'tuple',
        components: [
          { name: 'kind', internalType: 'enum SwapKind', type: 'uint8' },
          {
            name: 'amountGivenScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'balancesScaled18',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'indexIn', internalType: 'uint256', type: 'uint256' },
          { name: 'indexOut', internalType: 'uint256', type: 'uint256' },
          { name: 'router', internalType: 'address', type: 'address' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'onSwap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xa476b33460e792bac5cc294ba19f0543ab00dc01)
 */
export const balancerV3WeightedPoolAddress = {
  146: '0xa476B33460E792Bac5CC294ba19F0543aB00DC01',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xa476b33460e792bac5cc294ba19f0543ab00dc01)
 */
export const balancerV3WeightedPoolConfig = {
  address: balancerV3WeightedPoolAddress,
  abi: balancerV3WeightedPoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BeetsBatchRelayer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x7b52D5ef006E59e3227629f97F182D6442380bb6)
 */
export const beetsBatchRelayerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'vault', internalType: 'contract IVault', type: 'address' },
      { name: 'libraryAddress', internalType: 'address', type: 'address' },
      { name: 'queryLibrary', internalType: 'address', type: 'address' },
      { name: 'version', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLibrary',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getQueryLibrary',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVault',
    outputs: [{ name: '', internalType: 'contract IVault', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'vaultActionsQueryMulticall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x7b52D5ef006E59e3227629f97F182D6442380bb6)
 */
export const beetsBatchRelayerAddress = {
  146: '0x7b52D5ef006E59e3227629f97F182D6442380bb6',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x7b52D5ef006E59e3227629f97F182D6442380bb6)
 */
export const beetsBatchRelayerConfig = {
  address: beetsBatchRelayerAddress,
  abi: beetsBatchRelayerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BeetsV2BatchRelayerLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x1498437067d7bddc4c9427964f073ee1ab4f50fc)
 */
export const beetsV2BatchRelayerLibraryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'vault', internalType: 'contract IVault', type: 'address' },
      { name: 'wstETH', internalType: 'contract IERC20', type: 'address' },
      {
        name: 'minter',
        internalType: 'contract IBalancerMinter',
        type: 'address',
      },
      { name: 'canCallUserCheckpoint', internalType: 'bool', type: 'bool' },
      { name: 'version', internalType: 'string', type: 'string' },
      {
        name: 'reliquary',
        internalType: 'contract IReliquary',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approveVault',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'kind', internalType: 'enum IVault.SwapKind', type: 'uint8' },
      {
        name: 'swaps',
        internalType: 'struct IVault.BatchSwapStep[]',
        type: 'tuple[]',
        components: [
          { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'assetInIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'assetOutIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'assets', internalType: 'contract IAsset[]', type: 'address[]' },
      {
        name: 'funds',
        internalType: 'struct IVault.FundManagement',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'fromInternalBalance', internalType: 'bool', type: 'bool' },
          {
            name: 'recipient',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'toInternalBalance', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: 'limits', internalType: 'int256[]', type: 'int256[]' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      {
        name: 'outputReferences',
        internalType: 'struct VaultActions.OutputReference[]',
        type: 'tuple[]',
        components: [
          { name: 'index', internalType: 'uint256', type: 'uint256' },
          { name: 'key', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'batchSwap',
    outputs: [{ name: 'results', internalType: 'int256[]', type: 'int256[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'canCallUserCheckpoint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'kind',
        internalType: 'enum VaultActions.PoolKind',
        type: 'uint8',
      },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address payable', type: 'address' },
      {
        name: 'request',
        internalType: 'struct IVault.ExitPoolRequest',
        type: 'tuple',
        components: [
          {
            name: 'assets',
            internalType: 'contract IAsset[]',
            type: 'address[]',
          },
          {
            name: 'minAmountsOut',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
          { name: 'toInternalBalance', internalType: 'bool', type: 'bool' },
        ],
      },
      {
        name: 'outputReferences',
        internalType: 'struct VaultActions.OutputReference[]',
        type: 'tuple[]',
        components: [
          { name: 'index', internalType: 'uint256', type: 'uint256' },
          { name: 'key', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'exitPool',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      {
        name: 'gauges',
        internalType: 'contract IStakingLiquidityGauge[]',
        type: 'address[]',
      },
    ],
    name: 'gaugeCheckpoint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'gauges',
        internalType: 'contract IStakingLiquidityGauge[]',
        type: 'address[]',
      },
    ],
    name: 'gaugeClaimRewards',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'gauge',
        internalType: 'contract IStakingLiquidityGauge',
        type: 'address',
      },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'gaugeDeposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gauges', internalType: 'address[]', type: 'address[]' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'gaugeMint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'approval', internalType: 'bool', type: 'bool' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'gaugeSetMinterApproval',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'gauge',
        internalType: 'contract IStakingLiquidityGauge',
        type: 'address',
      },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'gaugeWithdraw',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getEntrypoint',
    outputs: [{ name: '', internalType: 'contract IBalancerRelayer', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVault',
    outputs: [{ name: '', internalType: 'contract IVault', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'kind',
        internalType: 'enum VaultActions.PoolKind',
        type: 'uint8',
      },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      {
        name: 'request',
        internalType: 'struct IVault.JoinPoolRequest',
        type: 'tuple',
        components: [
          {
            name: 'assets',
            internalType: 'contract IAsset[]',
            type: 'address[]',
          },
          {
            name: 'maxAmountsIn',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
          { name: 'fromInternalBalance', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'joinPool',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'ops',
        internalType: 'struct IVault.UserBalanceOp[]',
        type: 'tuple[]',
        components: [
          {
            name: 'kind',
            internalType: 'enum IVault.UserBalanceOpKind',
            type: 'uint8',
          },
          { name: 'asset', internalType: 'contract IAsset', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'sender', internalType: 'address', type: 'address' },
          {
            name: 'recipient',
            internalType: 'address payable',
            type: 'address',
          },
        ],
      },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      {
        name: 'outputReferences',
        internalType: 'struct VaultActions.OutputReference[]',
        type: 'tuple[]',
        components: [
          { name: 'index', internalType: 'uint256', type: 'uint256' },
          { name: 'key', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'manageUserBalance',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'ref', internalType: 'uint256', type: 'uint256' }],
    name: 'peekChainedReferenceValue',
    outputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'poolId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'reliquaryCreateRelicAndDeposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'relicId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'reliquaryDeposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'relicIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'reliquaryHarvestAll',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'relicId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'reliquaryWithdrawAndHarvest',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'relayer', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
      { name: 'authorisation', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setRelayerApproval',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stakeETH',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stakeETHAndWrap',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'singleSwap',
        internalType: 'struct IVault.SingleSwap',
        type: 'tuple',
        components: [
          { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'kind', internalType: 'enum IVault.SwapKind', type: 'uint8' },
          { name: 'assetIn', internalType: 'contract IAsset', type: 'address' },
          {
            name: 'assetOut',
            internalType: 'contract IAsset',
            type: 'address',
          },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: 'funds',
        internalType: 'struct IVault.FundManagement',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'fromInternalBalance', internalType: 'bool', type: 'bool' },
          {
            name: 'recipient',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'toInternalBalance', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swap',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'unwrapWstETH',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20Permit', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'vaultPermit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'token',
        internalType: 'contract IERC20PermitDAI',
        type: 'address',
      },
      { name: 'holder', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'allowed', internalType: 'bool', type: 'bool' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'vaultPermitDAI',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'outputReference', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'wrapStETH',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x1498437067d7bddc4c9427964f073ee1ab4f50fc)
 */
export const beetsV2BatchRelayerLibraryAddress = {
  146: '0x1498437067d7bdDc4C9427964F073eE1AB4f50fC',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x1498437067d7bddc4c9427964f073ee1ab4f50fc)
 */
export const beetsV2BatchRelayerLibraryConfig = {
  address: beetsV2BatchRelayerLibraryAddress,
  abi: beetsV2BatchRelayerLibraryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GyroEclpPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x7a2284a1f44fe05db25cbe382475d02ee8f339a7)
 */
export const gyroEclpPoolAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'params',
        internalType: 'struct GyroECLPPool.GyroParams',
        type: 'tuple',
        components: [
          {
            name: 'baseParams',
            internalType: 'struct ExtensibleWeightedPool2Tokens.NewPoolParams',
            type: 'tuple',
            components: [
              {
                name: 'vault',
                internalType: 'contract IVault',
                type: 'address',
              },
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'symbol', internalType: 'string', type: 'string' },
              {
                name: 'token0',
                internalType: 'contract IERC20',
                type: 'address',
              },
              {
                name: 'token1',
                internalType: 'contract IERC20',
                type: 'address',
              },
              {
                name: 'swapFeePercentage',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'pauseWindowDuration',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'bufferPeriodDuration',
                internalType: 'uint256',
                type: 'uint256',
              },
              { name: 'owner', internalType: 'address', type: 'address' },
            ],
          },
          {
            name: 'eclpParams',
            internalType: 'struct GyroECLPMath.Params',
            type: 'tuple',
            components: [
              { name: 'alpha', internalType: 'int256', type: 'int256' },
              { name: 'beta', internalType: 'int256', type: 'int256' },
              { name: 'c', internalType: 'int256', type: 'int256' },
              { name: 's', internalType: 'int256', type: 'int256' },
              { name: 'lambda', internalType: 'int256', type: 'int256' },
            ],
          },
          {
            name: 'derivedEclpParams',
            internalType: 'struct GyroECLPMath.DerivedParams',
            type: 'tuple',
            components: [
              {
                name: 'tauAlpha',
                internalType: 'struct GyroECLPMath.Vector2',
                type: 'tuple',
                components: [
                  { name: 'x', internalType: 'int256', type: 'int256' },
                  { name: 'y', internalType: 'int256', type: 'int256' },
                ],
              },
              {
                name: 'tauBeta',
                internalType: 'struct GyroECLPMath.Vector2',
                type: 'tuple',
                components: [
                  { name: 'x', internalType: 'int256', type: 'int256' },
                  { name: 'y', internalType: 'int256', type: 'int256' },
                ],
              },
              { name: 'u', internalType: 'int256', type: 'int256' },
              { name: 'v', internalType: 'int256', type: 'int256' },
              { name: 'w', internalType: 'int256', type: 'int256' },
              { name: 'z', internalType: 'int256', type: 'int256' },
              { name: 'dSq', internalType: 'int256', type: 'int256' },
            ],
          },
          { name: 'rateProvider0', internalType: 'address', type: 'address' },
          { name: 'rateProvider1', internalType: 'address', type: 'address' },
          { name: 'capManager', internalType: 'address', type: 'address' },
          {
            name: 'capParams',
            internalType: 'struct ICappedLiquidity.CapParams',
            type: 'tuple',
            components: [
              { name: 'capEnabled', internalType: 'bool', type: 'bool' },
              {
                name: 'perAddressCap',
                internalType: 'uint120',
                type: 'uint120',
              },
              { name: 'globalCap', internalType: 'uint128', type: 'uint128' },
            ],
          },
          { name: 'pauseManager', internalType: 'address', type: 'address' },
        ],
      },
      { name: 'configAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'capManager',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'CapManagerUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'params',
        internalType: 'struct ICappedLiquidity.CapParams',
        type: 'tuple',
        components: [
          { name: 'capEnabled', internalType: 'bool', type: 'bool' },
          { name: 'perAddressCap', internalType: 'uint120', type: 'uint120' },
          { name: 'globalCap', internalType: 'uint128', type: 'uint128' },
        ],
        indexed: false,
      },
    ],
    name: 'CapParamsUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'derivedParamsValidated',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'ECLPDerivedParamsValidated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'paramsValidated',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'ECLPParamsValidated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'invariantAfterJoin',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'InvariantAterInitializeJoin',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldInvariant',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newInvariant',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'InvariantOldAndNew',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldPauseManager',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newPauseManager',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PauseManagerChanged',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'PausedLocally' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'PausedStateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'swapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SwapFeePercentageChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'balances',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'invariant',
        internalType: 'struct GyroECLPMath.Vector2',
        type: 'tuple',
        components: [
          { name: 'x', internalType: 'int256', type: 'int256' },
          { name: 'y', internalType: 'int256', type: 'int256' },
        ],
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SwapParams',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'UnpausedLocally' },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'capManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'capParams',
    outputs: [
      {
        name: '',
        internalType: 'struct ICappedLiquidity.CapParams',
        type: 'tuple',
        components: [
          { name: 'capEnabled', internalType: 'bool', type: 'bool' },
          { name: 'perAddressCap', internalType: 'uint120', type: 'uint120' },
          { name: 'globalCap', internalType: 'uint128', type: 'uint128' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_pauseManager', internalType: 'address', type: 'address' }],
    name: 'changePauseManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'getActionId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getActualSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAuthorizer',
    outputs: [{ name: '', internalType: 'contract IAuthorizer', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getECLPParams',
    outputs: [
      {
        name: 'params',
        internalType: 'struct GyroECLPMath.Params',
        type: 'tuple',
        components: [
          { name: 'alpha', internalType: 'int256', type: 'int256' },
          { name: 'beta', internalType: 'int256', type: 'int256' },
          { name: 'c', internalType: 'int256', type: 'int256' },
          { name: 's', internalType: 'int256', type: 'int256' },
          { name: 'lambda', internalType: 'int256', type: 'int256' },
        ],
      },
      {
        name: 'd',
        internalType: 'struct GyroECLPMath.DerivedParams',
        type: 'tuple',
        components: [
          {
            name: 'tauAlpha',
            internalType: 'struct GyroECLPMath.Vector2',
            type: 'tuple',
            components: [
              { name: 'x', internalType: 'int256', type: 'int256' },
              { name: 'y', internalType: 'int256', type: 'int256' },
            ],
          },
          {
            name: 'tauBeta',
            internalType: 'struct GyroECLPMath.Vector2',
            type: 'tuple',
            components: [
              { name: 'x', internalType: 'int256', type: 'int256' },
              { name: 'y', internalType: 'int256', type: 'int256' },
            ],
          },
          { name: 'u', internalType: 'int256', type: 'int256' },
          { name: 'v', internalType: 'int256', type: 'int256' },
          { name: 'w', internalType: 'int256', type: 'int256' },
          { name: 'z', internalType: 'int256', type: 'int256' },
          { name: 'dSq', internalType: 'int256', type: 'int256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getFeesMetadata',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getInvariant',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getInvariantDivActualSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastInvariant',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMiscData',
    outputs: [
      { name: 'logInvariant', internalType: 'int256', type: 'int256' },
      { name: 'logTotalSupply', internalType: 'int256', type: 'int256' },
      {
        name: 'oracleSampleCreationTimestamp',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'oracleIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'oracleEnabled', internalType: 'bool', type: 'bool' },
      { name: 'swapFeePercentage', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getNormalizedWeights',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPausedState',
    outputs: [
      { name: 'paused', internalType: 'bool', type: 'bool' },
      { name: 'pauseWindowEndTime', internalType: 'uint256', type: 'uint256' },
      { name: 'bufferPeriodEndTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPoolId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPrice',
    outputs: [{ name: 'spotPrice', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTokenRates',
    outputs: [
      { name: 'rate0', internalType: 'uint256', type: 'uint256' },
      { name: 'rate1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVault',
    outputs: [{ name: '', internalType: 'contract IVault', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gyroConfig',
    outputs: [{ name: '', internalType: 'contract IGyroConfig', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'protocolSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'userData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onExitPool',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'protocolSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'userData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onJoinPool',
    outputs: [
      { name: 'amountsIn', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'dueProtocolFeeAmounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'request',
        internalType: 'struct IPoolSwapStructs.SwapRequest',
        type: 'tuple',
        components: [
          { name: 'kind', internalType: 'enum IVault.SwapKind', type: 'uint8' },
          { name: 'tokenIn', internalType: 'contract IERC20', type: 'address' },
          {
            name: 'tokenOut',
            internalType: 'contract IERC20',
            type: 'address',
          },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'address', type: 'address' },
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'balanceTokenIn', internalType: 'uint256', type: 'uint256' },
      { name: 'balanceTokenOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'onSwap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pauseManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'protocolSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'userData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'queryExit',
    outputs: [
      { name: 'bptIn', internalType: 'uint256', type: 'uint256' },
      { name: 'amountsOut', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'balances', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastChangeBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'protocolSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'userData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'queryJoin',
    outputs: [
      { name: 'bptOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountsIn', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rateProvider0',
    outputs: [{ name: '', internalType: 'contract IRateProvider', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rateProvider1',
    outputs: [{ name: '', internalType: 'contract IRateProvider', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_capManager', internalType: 'address', type: 'address' }],
    name: 'setCapManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ICappedLiquidity.CapParams',
        type: 'tuple',
        components: [
          { name: 'capEnabled', internalType: 'bool', type: 'bool' },
          { name: 'perAddressCap', internalType: 'uint120', type: 'uint120' },
          { name: 'globalCap', internalType: 'uint128', type: 'uint128' },
        ],
      },
    ],
    name: 'setCapParams',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'swapFeePercentage', internalType: 'uint256', type: 'uint256' }],
    name: 'setSwapFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x7a2284a1f44fe05db25cbe382475d02ee8f339a7)
 */
export const gyroEclpPoolAddress = {
  146: '0x7a2284a1f44Fe05dB25CbE382475D02ee8F339a7',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x7a2284a1f44fe05db25cbe382475d02ee8f339a7)
 */
export const gyroEclpPoolConfig = {
  address: gyroEclpPoolAddress,
  abi: gyroEclpPoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LoopedSonicVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xc76995054ce51dfbbc954840d699b2f33d2538ee)
 */
export const loopedSonicVaultAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_weth', internalType: 'address', type: 'address' },
      { name: '_lst', internalType: 'address', type: 'address' },
      { name: '_aavePool', internalType: 'address', type: 'address' },
      { name: '_eModeCategoryId', internalType: 'uint8', type: 'uint8' },
      {
        name: '_aaveCapoRateProvider',
        internalType: 'address',
        type: 'address',
      },
      { name: '_targetHealthFactor', internalType: 'uint256', type: 'uint256' },
      {
        name: '_allowedUnwindSlippagePercent',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_admin', internalType: 'address', type: 'address' },
      { name: '_treasuryAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'AllowedUnwindSlippageNotInBps' },
  { type: 'error', inputs: [], name: 'AllowedUnwindSlippageTooHigh' },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'AmountGreaterThanWethDebt' },
  { type: 'error', inputs: [], name: 'AmountLessThanMin' },
  { type: 'error', inputs: [], name: 'DepositsPaused' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'HealthFactorNotInRange' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'InsufficientLstSessionBalance' },
  { type: 'error', inputs: [], name: 'InsufficientWethSessionBalance' },
  { type: 'error', inputs: [], name: 'InvalidCollateralAfterWithdraw' },
  { type: 'error', inputs: [], name: 'InvalidDebtAfterWithdraw' },
  { type: 'error', inputs: [], name: 'InvalidHealthFactorAfterUnwind' },
  { type: 'error', inputs: [], name: 'InvalidHealthFactorBeforeUnwind' },
  { type: 'error', inputs: [], name: 'InvalidNavAfterWithdraw' },
  { type: 'error', inputs: [], name: 'Locked' },
  { type: 'error', inputs: [], name: 'LstRateChanged' },
  { type: 'error', inputs: [], name: 'LstSessionBalanceNotZero' },
  { type: 'error', inputs: [], name: 'NavIncreaseBelowMin' },
  { type: 'error', inputs: [], name: 'NotAllowed' },
  { type: 'error', inputs: [], name: 'NotEnoughShares' },
  { type: 'error', inputs: [], name: 'NotEnoughWeth' },
  { type: 'error', inputs: [], name: 'NotInitialized' },
  { type: 'error', inputs: [], name: 'NotLocked' },
  { type: 'error', inputs: [], name: 'NotTrustedRouter' },
  { type: 'error', inputs: [], name: 'ProtocolFeePercentNotInBps' },
  { type: 'error', inputs: [], name: 'ProtocolFeePercentTooHigh' },
  { type: 'error', inputs: [], name: 'RouterAlreadyTrusted' },
  { type: 'error', inputs: [], name: 'RouterNotTrusted' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  { type: 'error', inputs: [], name: 'SenderNotWethContract' },
  { type: 'error', inputs: [], name: 'SharesExceedTotalSupply' },
  { type: 'error', inputs: [], name: 'TargetHealthFactorTooLow' },
  { type: 'error', inputs: [], name: 'TotalSupplyNotZero' },
  { type: 'error', inputs: [], name: 'UnwindAmountBelowMin' },
  { type: 'error', inputs: [], name: 'UnwindsPaused' },
  { type: 'error', inputs: [], name: 'WethSessionBalanceNotZero' },
  { type: 'error', inputs: [], name: 'WithdrawsPaused' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  { type: 'error', inputs: [], name: 'ZeroShares' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'wethAmountBorrowed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AaveBorrowWeth',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'aaveCapoRateProvider',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AaveCapoRateProviderChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'wethAmountRepaid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AaveRepayWeth',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'lstAmountSupplied',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AaveSupplyLst',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'lstAmountWithdrawn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AaveWithdrawLst',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'allowedUnwindSlippagePercent',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AllowedUnwindSlippagePercentChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sharesMinted',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'navIncreaseEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalCollateralEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalDebtEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'DepositsPausedChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sharesMinted',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'navIncreaseEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalCollateralEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalDebtEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Initialize',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'protocolFeePercent',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProtocolFeePercentChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PullLst',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PullWeth',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SendLst',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SendWeth',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'wethAmountDeposited',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'lstAmountReceived',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeWeth',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'targetHealthFactor',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TargetHealthFactorChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'treasuryAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'TreasuryAddressChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'TrustedRouterAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'TrustedRouterRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'lstAmountCollateralWithdrawn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'wethAmountDebtRepaid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalCollateralEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalDebtEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unwind',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'UnwindsPausedChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sharesBurned',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'navDecreaseEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalCollateralEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalDebtEth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'WithdrawsPausedChanged',
  },
  {
    type: 'function',
    inputs: [],
    name: 'AAVE_E_MODE_CATEGORY_ID',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'AAVE_POOL',
    outputs: [{ name: '', internalType: 'contract IPool', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'AAVE_VARIABLE_INTEREST_RATE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INIT_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LST',
    outputs: [{ name: '', internalType: 'contract ISonicStaking', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LST_A_TOKEN',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_PROTOCOL_FEE_PERCENT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_UNWIND_SLIPPAGE_PERCENT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_DEPOSIT_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_LST_DEPOSIT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_NAV_INCREASE_ETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_SHARES_TO_REDEEM',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_TARGET_HEALTH_FACTOR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_UNWIND_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OPERATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UNWIND_HF_MARGIN',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UNWIND_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WETH',
    outputs: [{ name: '', internalType: 'contract IWETH', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WETH_VARIABLE_DEBT_TOKEN',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'aaveBorrowWeth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'aaveCapoRateProvider',
    outputs: [
      {
        name: '',
        internalType: 'contract IAaveCapoRateProvider',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'aaveRepayWeth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'aaveSupplyLst',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'aaveWithdrawLst',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'actualSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'addTrustedRouter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'allowedUnwindSlippagePercent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'athRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'callbackData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'deposit',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'depositsPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAaveLstCollateralAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAaveLstCollateralAmountInEth',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAaveWethDebtAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBorrowAmountForLoopInEth',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'getCollateralAndDebtForShares',
    outputs: [
      { name: 'collateralInLst', internalType: 'uint256', type: 'uint256' },
      { name: 'debtInEth', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getHealthFactor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFeeSharesToBeMinted',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSessionBalances',
    outputs: [
      { name: 'wethSessionBalance', internalType: 'uint256', type: 'uint256' },
      { name: 'lstSessionBalance', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVaultSnapshot',
    outputs: [
      {
        name: 'data',
        internalType: 'struct VaultSnapshot.Data',
        type: 'tuple',
        components: [
          {
            name: 'lstCollateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'lstCollateralAmountInEth',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'wethDebtAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'liquidationThreshold',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'ltv', internalType: 'uint256', type: 'uint256' },
          { name: 'actualSupply', internalType: 'uint256', type: 'uint256' },
          {
            name: 'lstATokenBalance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'wethDebtTokenBalance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'lstLiquidityIndex',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'wethVariableBorrowIndex',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isInitialized',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'protocolFeePercent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'pullLst',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'pullWeth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'removeTrustedRouter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'sendLst',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'sendWeth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_aaveCapoRateProvider',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setAaveCapoRateProvider',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_allowedUnwindSlippagePercent',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setAllowedUnwindSlippagePercent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setDepositsPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_protocolFeePercent', internalType: 'uint256', type: 'uint256' }],
    name: 'setProtocolFeePercent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_targetHealthFactor', internalType: 'uint256', type: 'uint256' }],
    name: 'setTargetHealthFactor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_treasuryAddress', internalType: 'address', type: 'address' }],
    name: 'setTreasuryAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setUnwindsPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setWithdrawsPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stakeWeth',
    outputs: [{ name: 'lstAmount', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetHealthFactor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasuryAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'trustedRouters',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lstAmountToWithdraw', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'unwind',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unwindsPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sharesToRedeem', internalType: 'uint256', type: 'uint256' },
      { name: 'callbackData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawsPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xc76995054ce51dfbbc954840d699b2f33d2538ee)
 */
export const loopedSonicVaultAddress = {
  146: '0xC76995054Ce51DfBBC954840D699b2F33D2538Ee',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xc76995054ce51dfbbc954840d699b2f33d2538ee)
 */
export const loopedSonicVaultConfig = {
  address: loopedSonicVaultAddress,
  abi: loopedSonicVaultAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MagpieLoopedSonicRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xd1e0b8dc3a4cd1a892fe1b46e0aed30c35f6a087)
 */
export const magpieLoopedSonicRouterAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_vault',
        internalType: 'contract LoopedSonicVault',
        type: 'address',
      },
      {
        name: '_magpieRouter',
        internalType: 'contract IMagpieRouterV3_1',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AmountOutBelowMin' },
  { type: 'error', inputs: [], name: 'BadInitiator' },
  { type: 'error', inputs: [], name: 'NotAavePool' },
  { type: 'error', inputs: [], name: 'NotEnoughLst' },
  { type: 'error', inputs: [], name: 'NotVault' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ADDRESSES_PROVIDER',
    outputs: [
      {
        name: '',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAGPIE_ROUTER',
    outputs: [{ name: '', internalType: 'contract IMagpieRouterV3_1', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_LOOP_ITERATIONS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'POOL',
    outputs: [{ name: '', internalType: 'contract IPool', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VAULT',
    outputs: [{ name: '', internalType: 'contract LoopedSonicVault', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'initialAssets', internalType: 'uint256', type: 'uint256' }],
    name: 'depositCallback',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'flashLoanAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'flashLoanFee', internalType: 'uint256', type: 'uint256' },
      { name: 'initiator', internalType: 'address', type: 'address' },
      { name: 'params', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'executeOperation',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountShares', internalType: 'uint256', type: 'uint256' },
      { name: 'minWethAmountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'convertLstToWethData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct BaseLoopedSonicRouter.WithdrawParams',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'amountShares', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minWethAmountOut',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'collateralInLst', internalType: 'uint256', type: 'uint256' },
          { name: 'debtInEth', internalType: 'uint256', type: 'uint256' },
          {
            name: 'convertLstToWethData',
            internalType: 'bytes',
            type: 'bytes',
          },
        ],
      },
    ],
    name: 'withdrawCallback',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountShares', internalType: 'uint256', type: 'uint256' },
      { name: 'minWethAmountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'convertLstToWethData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'withdrawWithFlashLoan',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct BaseLoopedSonicRouter.WithdrawParams',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'amountShares', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minWethAmountOut',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'collateralInLst', internalType: 'uint256', type: 'uint256' },
          { name: 'debtInEth', internalType: 'uint256', type: 'uint256' },
          {
            name: 'convertLstToWethData',
            internalType: 'bytes',
            type: 'bytes',
          },
        ],
      },
      { name: 'flashLoanFee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawWithFlashLoanCallback',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xd1e0b8dc3a4cd1a892fe1b46e0aed30c35f6a087)
 */
export const magpieLoopedSonicRouterAddress = {
  146: '0xD1e0B8Dc3A4Cd1A892FE1b46E0AEd30c35f6A087',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xd1e0b8dc3a4cd1a892fe1b46e0aed30c35f6a087)
 */
export const magpieLoopedSonicRouterConfig = {
  address: magpieLoopedSonicRouterAddress,
  abi: magpieLoopedSonicRouterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReClammPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xa4c937817f99829ac4003a3475f17a2f0d6eaf7c)
 */
export const reClammPoolAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ReClammPoolParams',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'version', internalType: 'string', type: 'string' },
          {
            name: 'dailyPriceShiftExponent',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'centerednessMargin',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'initialMinPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'initialMaxPrice', internalType: 'uint256', type: 'uint256' },
          {
            name: 'initialTargetPrice',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'tokenAPriceIncludesRate',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'tokenBPriceIncludesRate',
            internalType: 'bool',
            type: 'bool',
          },
        ],
      },
      { name: 'vault', internalType: 'contract IVault', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AmountOutGreaterThanBalance' },
  { type: 'error', inputs: [], name: 'BalanceRatioExceedsTolerance' },
  { type: 'error', inputs: [], name: 'BaseOutOfBounds' },
  { type: 'error', inputs: [], name: 'DailyPriceShiftExponentTooHigh' },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC2612InvalidSigner',
  },
  { type: 'error', inputs: [], name: 'ExponentOutOfBounds' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAccountNonce',
  },
  { type: 'error', inputs: [], name: 'InvalidCenterednessMargin' },
  { type: 'error', inputs: [], name: 'InvalidExponent' },
  { type: 'error', inputs: [], name: 'InvalidInitialPrice' },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  {
    type: 'error',
    inputs: [
      { name: 'resolvedStartTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidStartTime',
  },
  { type: 'error', inputs: [], name: 'InvalidStartTime' },
  { type: 'error', inputs: [], name: 'InvalidToken' },
  { type: 'error', inputs: [], name: 'NotImplemented' },
  { type: 'error', inputs: [], name: 'PoolNotInitialized' },
  { type: 'error', inputs: [], name: 'PoolOutsideTargetRange' },
  {
    type: 'error',
    inputs: [
      {
        name: 'fourthRootPriceRatioDelta',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'PriceRatioDeltaBelowMin',
  },
  { type: 'error', inputs: [], name: 'PriceRatioNotUpdating' },
  { type: 'error', inputs: [], name: 'PriceRatioUpdateDurationTooShort' },
  { type: 'error', inputs: [], name: 'PriceRatioUpdateTooFast' },
  { type: 'error', inputs: [], name: 'ProductOutOfBounds' },
  { type: 'error', inputs: [], name: 'ReClammPoolBptRateUnsupported' },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'SenderIsNotVault',
  },
  { type: 'error', inputs: [], name: 'SenderNotAllowed' },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
  { type: 'error', inputs: [], name: 'VaultIsNotLocked' },
  { type: 'error', inputs: [], name: 'VaultNotSet' },
  { type: 'error', inputs: [], name: 'WrongInitializationPrices' },
  { type: 'error', inputs: [], name: 'ZeroDivision' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'centerednessMargin',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CenterednessMarginUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'dailyPriceShiftExponent',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'dailyPriceShiftBase',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DailyPriceShiftExponentUpdated',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lastTimestamp',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
    ],
    name: 'LastTimestampUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'startFourthRootPriceRatio',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endFourthRootPriceRatio',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'priceRatioUpdateStartTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'priceRatioUpdateEndTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PriceRatioStateUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'virtualBalanceA',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'virtualBalanceB',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'VirtualBalancesUpdated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computeBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'computeCurrentFourthRootPriceRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'computeCurrentPoolCenteredness',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'computeCurrentPriceRange',
    outputs: [
      { name: 'minPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'maxPrice', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'computeCurrentPriceRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'computeCurrentSpotPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'computeCurrentVirtualBalances',
    outputs: [
      {
        name: 'currentVirtualBalanceA',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'currentVirtualBalanceB',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'changed', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'referenceToken',
        internalType: 'contract IERC20',
        type: 'address',
      },
      {
        name: 'referenceAmountInRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'computeInitialBalancesRaw',
    outputs: [
      {
        name: 'initialBalancesRaw',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'balancesScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: 'rounding', internalType: 'enum Rounding', type: 'uint8' },
    ],
    name: 'computeInvariant',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'emitApproval',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'emitTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'getActionId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAggregateFeePercentages',
    outputs: [
      {
        name: 'aggregateSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'aggregateYieldFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCenterednessMargin',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentLiveBalances',
    outputs: [
      {
        name: 'balancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDailyPriceShiftBase',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDailyPriceShiftExponent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getHookFlags',
    outputs: [
      {
        name: 'hookFlags',
        internalType: 'struct HookFlags',
        type: 'tuple',
        components: [
          {
            name: 'enableHookAdjustedAmounts',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallBeforeInitialize',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallAfterInitialize',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallComputeDynamicSwapFee',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'shouldCallBeforeSwap', internalType: 'bool', type: 'bool' },
          { name: 'shouldCallAfterSwap', internalType: 'bool', type: 'bool' },
          {
            name: 'shouldCallBeforeAddLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallAfterAddLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallBeforeRemoveLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallAfterRemoveLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastTimestamp',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastVirtualBalances',
    outputs: [
      { name: 'virtualBalanceA', internalType: 'uint256', type: 'uint256' },
      { name: 'virtualBalanceB', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaximumInvariantRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaximumSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumInvariantRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPriceRatioState',
    outputs: [
      {
        name: '',
        internalType: 'struct PriceRatioState',
        type: 'tuple',
        components: [
          {
            name: 'startFourthRootPriceRatio',
            internalType: 'uint96',
            type: 'uint96',
          },
          {
            name: 'endFourthRootPriceRatio',
            internalType: 'uint96',
            type: 'uint96',
          },
          {
            name: 'priceRatioUpdateStartTime',
            internalType: 'uint32',
            type: 'uint32',
          },
          {
            name: 'priceRatioUpdateEndTime',
            internalType: 'uint32',
            type: 'uint32',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReClammPoolDynamicData',
    outputs: [
      {
        name: 'data',
        internalType: 'struct ReClammPoolDynamicData',
        type: 'tuple',
        components: [
          {
            name: 'balancesLiveScaled18',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'tokenRates', internalType: 'uint256[]', type: 'uint256[]' },
          {
            name: 'staticSwapFeePercentage',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'lastTimestamp', internalType: 'uint256', type: 'uint256' },
          {
            name: 'lastVirtualBalances',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          {
            name: 'dailyPriceShiftExponent',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'dailyPriceShiftBase',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'centerednessMargin',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'currentPriceRatio',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'currentFourthRootPriceRatio',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'startFourthRootPriceRatio',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'endFourthRootPriceRatio',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'priceRatioUpdateStartTime',
            internalType: 'uint32',
            type: 'uint32',
          },
          {
            name: 'priceRatioUpdateEndTime',
            internalType: 'uint32',
            type: 'uint32',
          },
          { name: 'isPoolInitialized', internalType: 'bool', type: 'bool' },
          { name: 'isPoolPaused', internalType: 'bool', type: 'bool' },
          { name: 'isPoolInRecoveryMode', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReClammPoolImmutableData',
    outputs: [
      {
        name: 'data',
        internalType: 'struct ReClammPoolImmutableData',
        type: 'tuple',
        components: [
          {
            name: 'tokens',
            internalType: 'contract IERC20[]',
            type: 'address[]',
          },
          {
            name: 'decimalScalingFactors',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          {
            name: 'tokenAPriceIncludesRate',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'tokenBPriceIncludesRate',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'minSwapFeePercentage',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'maxSwapFeePercentage',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'initialMinPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'initialMaxPrice', internalType: 'uint256', type: 'uint256' },
          {
            name: 'initialTargetPrice',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'initialDailyPriceShiftExponent',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'initialCenterednessMargin',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'maxCenterednessMargin',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'maxDailyPriceShiftExponent',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'maxDailyPriceRatioUpdateRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'minPriceRatioUpdateDuration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'minPriceRatioDelta',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'balanceRatioAndPriceTolerance',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getStaticSwapFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTokenInfo',
    outputs: [
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
      {
        name: 'tokenInfo',
        internalType: 'struct TokenInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'tokenType', internalType: 'enum TokenType', type: 'uint8' },
          {
            name: 'rateProvider',
            internalType: 'contract IRateProvider',
            type: 'address',
          },
          { name: 'paysYieldFees', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: 'balancesRaw', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'lastBalancesLiveScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTokens',
    outputs: [{ name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVault',
    outputs: [{ name: '', internalType: 'contract IVault', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'incrementNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isPoolWithinTargetRange',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isPoolWithinTargetRangeUsingCurrentVirtualBalances',
    outputs: [
      { name: 'isWithinTargetRange', internalType: 'bool', type: 'bool' },
      { name: 'virtualBalancesChanged', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'enum AddLiquidityKind', type: 'uint8' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amountsInRaw', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onAfterAddLiquidity',
    outputs: [
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onAfterInitialize',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'enum RemoveLiquidityKind', type: 'uint8' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amountsOutRaw', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onAfterRemoveLiquidity',
    outputs: [
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct AfterSwapParams',
        type: 'tuple',
        components: [
          { name: 'kind', internalType: 'enum SwapKind', type: 'uint8' },
          { name: 'tokenIn', internalType: 'contract IERC20', type: 'address' },
          {
            name: 'tokenOut',
            internalType: 'contract IERC20',
            type: 'address',
          },
          {
            name: 'amountInScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amountOutScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'tokenInBalanceScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'tokenOutBalanceScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amountCalculatedScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amountCalculatedRaw',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'router', internalType: 'address', type: 'address' },
          { name: 'pool', internalType: 'address', type: 'address' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'onAfterSwap',
    outputs: [
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: '', internalType: 'enum AddLiquidityKind', type: 'uint8' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'exactBptAmountOut', internalType: 'uint256', type: 'uint256' },
      {
        name: 'balancesScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onBeforeAddLiquidity',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'balancesScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onBeforeInitialize',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: '', internalType: 'enum RemoveLiquidityKind', type: 'uint8' },
      { name: 'exactBptAmountIn', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'balancesScaled18',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onBeforeRemoveLiquidity',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct PoolSwapParams',
        type: 'tuple',
        components: [
          { name: 'kind', internalType: 'enum SwapKind', type: 'uint8' },
          {
            name: 'amountGivenScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'balancesScaled18',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'indexIn', internalType: 'uint256', type: 'uint256' },
          { name: 'indexOut', internalType: 'uint256', type: 'uint256' },
          { name: 'router', internalType: 'address', type: 'address' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'onBeforeSwap',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct PoolSwapParams',
        type: 'tuple',
        components: [
          { name: 'kind', internalType: 'enum SwapKind', type: 'uint8' },
          {
            name: 'amountGivenScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'balancesScaled18',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'indexIn', internalType: 'uint256', type: 'uint256' },
          { name: 'indexOut', internalType: 'uint256', type: 'uint256' },
          { name: 'router', internalType: 'address', type: 'address' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'onComputeDynamicSwapFeePercentage',
    outputs: [
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      {
        name: 'tokenConfig',
        internalType: 'struct TokenConfig[]',
        type: 'tuple[]',
        components: [
          { name: 'token', internalType: 'contract IERC20', type: 'address' },
          { name: 'tokenType', internalType: 'enum TokenType', type: 'uint8' },
          {
            name: 'rateProvider',
            internalType: 'contract IRateProvider',
            type: 'address',
          },
          { name: 'paysYieldFees', internalType: 'bool', type: 'bool' },
        ],
      },
      {
        name: 'liquidityManagement',
        internalType: 'struct LiquidityManagement',
        type: 'tuple',
        components: [
          {
            name: 'disableUnbalancedLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'enableAddLiquidityCustom',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'enableRemoveLiquidityCustom',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'enableDonation', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'onRegister',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'request',
        internalType: 'struct PoolSwapParams',
        type: 'tuple',
        components: [
          { name: 'kind', internalType: 'enum SwapKind', type: 'uint8' },
          {
            name: 'amountGivenScaled18',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'balancesScaled18',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'indexIn', internalType: 'uint256', type: 'uint256' },
          { name: 'indexOut', internalType: 'uint256', type: 'uint256' },
          { name: 'router', internalType: 'address', type: 'address' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'onSwap',
    outputs: [
      {
        name: 'amountCalculatedScaled18',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newCenterednessMargin',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setCenterednessMargin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newDailyPriceShiftExponent',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setDailyPriceShiftExponent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'endPriceRatio', internalType: 'uint256', type: 'uint256' },
      {
        name: 'priceRatioUpdateStartTime',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'priceRatioUpdateEndTime',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'startPriceRatioUpdate',
    outputs: [
      {
        name: 'actualPriceRatioUpdateStartTime',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stopPriceRatioUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xa4c937817f99829ac4003a3475f17a2f0d6eaf7c)
 */
export const reClammPoolAddress = {
  146: '0xA4c937817f99829aC4003a3475f17a2F0d6eAF7c',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xa4c937817f99829ac4003a3475f17a2f0d6eaf7c)
 */
export const reClammPoolConfig = {
  address: reClammPoolAddress,
  abi: reClammPoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reliquary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x973670ce19594f857a7cd85ee834c7a74a941684)
 */
export const reliquaryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_rewardToken', internalType: 'address', type: 'address' },
      { name: '_emissionCurve', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'ArrayLengthMismatch' },
  { type: 'error', inputs: [], name: 'BurningPrincipal' },
  { type: 'error', inputs: [], name: 'BurningRewards' },
  { type: 'error', inputs: [], name: 'DuplicateRelicIds' },
  { type: 'error', inputs: [], name: 'EmptyArray' },
  { type: 'error', inputs: [], name: 'MaxEmissionRateExceeded' },
  { type: 'error', inputs: [], name: 'MergingEmptyRelics' },
  { type: 'error', inputs: [], name: 'NonExistentPool' },
  { type: 'error', inputs: [], name: 'NonExistentRelic' },
  { type: 'error', inputs: [], name: 'NonZeroFirstMaturity' },
  { type: 'error', inputs: [], name: 'NotApprovedOrOwner' },
  { type: 'error', inputs: [], name: 'NotOwner' },
  { type: 'error', inputs: [], name: 'RelicsNotOfSamePool' },
  { type: 'error', inputs: [], name: 'RewardTokenAsPoolToken' },
  { type: 'error', inputs: [], name: 'UnsortedMaturityLevels' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  { type: 'error', inputs: [], name: 'ZeroTotalAllocPoint' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'relicId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'CreateRelic',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'relicId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'relicId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'EmergencyWithdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'relicId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Harvest',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'relicId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newLevel',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LevelChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'allocPoint',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'poolToken',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'rewarder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nftDescriptor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LogPoolAddition',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'allocPoint',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'rewarder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nftDescriptor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LogPoolModified',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'emissionCurveAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'LogSetEmissionCurve',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'lastRewardTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'lpSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'accRewardPerShare',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LogUpdatePool',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'toId', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Merge',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'toId', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Shift',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'toId', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Split',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'relicId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'allocPoint', internalType: 'uint256', type: 'uint256' },
      { name: '_poolToken', internalType: 'address', type: 'address' },
      { name: '_rewarder', internalType: 'address', type: 'address' },
      {
        name: 'requiredMaturities',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      {
        name: 'levelMultipliers',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: '_nftDescriptor', internalType: 'address', type: 'address' },
    ],
    name: 'addPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createRelicAndDeposit',
    outputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'relicId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'relicId', internalType: 'uint256', type: 'uint256' }],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'emissionCurve',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pid', internalType: 'uint256', type: 'uint256' }],
    name: 'getLevelInfo',
    outputs: [
      {
        name: 'levelInfo',
        internalType: 'struct LevelInfo',
        type: 'tuple',
        components: [
          {
            name: 'requiredMaturities',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          { name: 'multipliers', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'balance', internalType: 'uint256[]', type: 'uint256[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pid', internalType: 'uint256', type: 'uint256' }],
    name: 'getPoolInfo',
    outputs: [
      {
        name: 'pool',
        internalType: 'struct PoolInfo',
        type: 'tuple',
        components: [
          {
            name: 'accRewardPerShare',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'lastRewardTime', internalType: 'uint256', type: 'uint256' },
          { name: 'allocPoint', internalType: 'uint256', type: 'uint256' },
          { name: 'name', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'relicId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPositionForId',
    outputs: [
      {
        name: 'position',
        internalType: 'struct PositionInfo',
        type: 'tuple',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'rewardDebt', internalType: 'uint256', type: 'uint256' },
          { name: 'rewardCredit', internalType: 'uint256', type: 'uint256' },
          { name: 'entry', internalType: 'uint256', type: 'uint256' },
          { name: 'poolId', internalType: 'uint256', type: 'uint256' },
          { name: 'level', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRoleMember',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'relicId', internalType: 'uint256', type: 'uint256' },
      { name: 'harvestTo', internalType: 'address', type: 'address' },
    ],
    name: 'harvest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'relicId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isApprovedOrOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'relicId', internalType: 'uint256', type: 'uint256' }],
    name: 'levelOnUpdate',
    outputs: [{ name: 'level', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pids', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'massUpdatePools',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fromId', internalType: 'uint256', type: 'uint256' },
      { name: 'toId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'merge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'allocPoint', internalType: 'uint256', type: 'uint256' },
      { name: '_rewarder', internalType: 'address', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: '_nftDescriptor', internalType: 'address', type: 'address' },
      { name: 'overwriteRewarder', internalType: 'bool', type: 'bool' },
    ],
    name: 'modifyPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'nftDescriptor',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'relicId', internalType: 'uint256', type: 'uint256' }],
    name: 'pendingReward',
    outputs: [{ name: 'pending', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'pendingRewardsOfOwner',
    outputs: [
      {
        name: 'pendingRewards',
        internalType: 'struct PendingReward[]',
        type: 'tuple[]',
        components: [
          { name: 'relicId', internalType: 'uint256', type: 'uint256' },
          { name: 'poolId', internalType: 'uint256', type: 'uint256' },
          { name: 'pendingReward', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'poolLength',
    outputs: [{ name: 'pools', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'poolToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'relicPositionsOfOwner',
    outputs: [
      { name: 'relicIds', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'positionInfos',
        internalType: 'struct PositionInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'rewardDebt', internalType: 'uint256', type: 'uint256' },
          { name: 'rewardCredit', internalType: 'uint256', type: 'uint256' },
          { name: 'entry', internalType: 'uint256', type: 'uint256' },
          { name: 'poolId', internalType: 'uint256', type: 'uint256' },
          { name: 'level', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'rewarder',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_emissionCurve', internalType: 'address', type: 'address' }],
    name: 'setEmissionCurve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fromId', internalType: 'uint256', type: 'uint256' },
      { name: 'toId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'shift',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fromId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'split',
    outputs: [{ name: 'newId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAllocPoint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'pid', internalType: 'uint256', type: 'uint256' }],
    name: 'updatePool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'relicId', internalType: 'uint256', type: 'uint256' }],
    name: 'updatePosition',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'relicId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'relicId', internalType: 'uint256', type: 'uint256' },
      { name: 'harvestTo', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawAndHarvest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x973670ce19594f857a7cd85ee834c7a74a941684)
 */
export const reliquaryAddress = {
  146: '0x973670ce19594F857A7cD85EE834c7a74a941684',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x973670ce19594f857a7cd85ee834c7a74a941684)
 */
export const reliquaryConfig = {
  address: reliquaryAddress,
  abi: reliquaryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SFC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x0aB8f3b709A52c096f33702fE8153776472305ed)
 */
export const sfcAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'AlreadyRedirected' },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'InsufficientSelfStake' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'MalformedPubkey' },
  { type: 'error', inputs: [], name: 'NoUnresolvedTreasuryFees' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  { type: 'error', inputs: [], name: 'NotDeactivatedStatus' },
  { type: 'error', inputs: [], name: 'NotDriverAuth' },
  { type: 'error', inputs: [], name: 'NotEnoughEpochsPassed' },
  { type: 'error', inputs: [], name: 'NotEnoughTimePassed' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'NothingToStash' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'PubkeyUsedByOtherValidator' },
  { type: 'error', inputs: [], name: 'Redirected' },
  { type: 'error', inputs: [], name: 'RefundRatioTooHigh' },
  { type: 'error', inputs: [], name: 'RequestExists' },
  { type: 'error', inputs: [], name: 'RequestNotExists' },
  { type: 'error', inputs: [], name: 'SameAddress' },
  { type: 'error', inputs: [], name: 'SameRedirectionAuthorizer' },
  { type: 'error', inputs: [], name: 'StakeIsFullySlashed' },
  { type: 'error', inputs: [], name: 'StakeSubscriberFailed' },
  { type: 'error', inputs: [], name: 'TransferFailed' },
  { type: 'error', inputs: [], name: 'TransfersNotAllowed' },
  { type: 'error', inputs: [], name: 'TreasuryNotSet' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  { type: 'error', inputs: [], name: 'ValidatorDelegationLimitExceeded' },
  { type: 'error', inputs: [], name: 'ValidatorExists' },
  { type: 'error', inputs: [], name: 'ValidatorNotActive' },
  { type: 'error', inputs: [], name: 'ValidatorNotExists' },
  { type: 'error', inputs: [], name: 'ValidatorNotSlashed' },
  { type: 'error', inputs: [], name: 'ValueTooLarge' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  { type: 'error', inputs: [], name: 'ZeroRewards' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'AnnouncedRedirection',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BurntNativeTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'validatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'status',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ChangedValidatorStatus',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'toValidatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'rewards',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ClaimedRewards',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'validatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'auth', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'createdEpoch',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'createdTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CreatedValidator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'validatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'deactivatedEpoch',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'deactivatedTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DeactivatedValidator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'toValidatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Delegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'validatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RefundedSlashedLegacyDelegation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'toValidatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'rewards',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RestakedRewards',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TreasuryFeesResolved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'toValidatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'wrID', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Undelegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'validatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'refundRatio',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UpdatedSlashingRefundRatio',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'toValidatorID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'wrID', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'penalty',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawn',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
      { name: 'syncPubkey', internalType: 'bool', type: 'bool' },
    ],
    name: '_syncValidator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'announceRedirection',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'burnNativeTokens',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'toValidatorID', internalType: 'uint256', type: 'uint256' }],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'constsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pubkey', internalType: 'bytes', type: 'bytes' }],
    name: 'createValidator',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentSealedEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
      { name: 'status', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'deactivateValidator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'toValidatorID', internalType: 'uint256', type: 'uint256' }],
    name: 'delegate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getEpochAccumulatedOriginatedTxsFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getEpochAccumulatedRewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getEpochAccumulatedUptime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getEpochAverageUptime',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'getEpochEndBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getEpochOfflineBlocks',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getEpochOfflineTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getEpochReceivedStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'getEpochSnapshot',
    outputs: [
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endBlock', internalType: 'uint256', type: 'uint256' },
      { name: 'epochFee', internalType: 'uint256', type: 'uint256' },
      { name: 'baseRewardPerSecond', internalType: 'uint256', type: 'uint256' },
      { name: 'totalStake', internalType: 'uint256', type: 'uint256' },
      { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'getEpochValidatorIDs',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'delegator', internalType: 'address', type: 'address' }],
    name: 'getRedirection',
    outputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'delegator', internalType: 'address', type: 'address' }],
    name: 'getRedirectionRequest',
    outputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'validatorID', internalType: 'uint256', type: 'uint256' }],
    name: 'getSelfStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getStake',
    outputs: [{ name: 'stake', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'validatorID', internalType: 'uint256', type: 'uint256' }],
    name: 'getValidator',
    outputs: [
      { name: 'status', internalType: 'uint256', type: 'uint256' },
      { name: 'receivedStake', internalType: 'uint256', type: 'uint256' },
      { name: 'auth', internalType: 'address', type: 'address' },
      { name: 'createdEpoch', internalType: 'uint256', type: 'uint256' },
      { name: 'createdTime', internalType: 'uint256', type: 'uint256' },
      { name: 'deactivatedTime', internalType: 'uint256', type: 'uint256' },
      { name: 'deactivatedEpoch', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'auth', internalType: 'address', type: 'address' }],
    name: 'getValidatorID',
    outputs: [{ name: 'validatorID', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'validatorID', internalType: 'uint256', type: 'uint256' }],
    name: 'getValidatorPubkey',
    outputs: [{ name: 'pubkey', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
      { name: 'wrID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getWithdrawalRequest',
    outputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'time', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sealedEpoch', internalType: 'uint256', type: 'uint256' },
      { name: '_totalSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'nodeDriver', internalType: 'address', type: 'address' },
      { name: '_c', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'initiateRedirection',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'validatorID', internalType: 'uint256', type: 'uint256' }],
    name: 'isSlashed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'issueTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastValidatorID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'toValidatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'pendingRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pubkeyAddress', internalType: 'address', type: 'address' }],
    name: 'pubkeyAddressToValidatorID',
    outputs: [{ name: 'validatorID', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'redirect',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'redirectionAuthorizer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'resolveTreasuryFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'toValidatorID', internalType: 'uint256', type: 'uint256' }],
    name: 'restakeRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'rewardsStash',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'offlineTime', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'offlineBlocks', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'uptimes', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'originatedTxsFee',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    name: 'sealEpoch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'nextValidatorIDs',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    name: 'sealEpochValidators',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'toValidatorID', internalType: 'uint256', type: 'uint256' },
      { name: 'stake', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setGenesisDelegation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'auth', internalType: 'address', type: 'address' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
      { name: 'pubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'createdTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setGenesisValidator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'v', internalType: 'address', type: 'address' }],
    name: 'setRedirectionAuthorizer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'validatorID', internalType: 'uint256', type: 'uint256' }],
    name: 'slashingRefundRatio',
    outputs: [{ name: 'refundRatio', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakeSubscriberAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'toValidatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stashRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stashedRewardsUntilEpoch',
    outputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalActiveStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasuryAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'toValidatorID', internalType: 'uint256', type: 'uint256' },
      { name: 'wrID', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'undelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unresolvedTreasuryFees',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'v', internalType: 'address', type: 'address' }],
    name: 'updateConstsAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorID', internalType: 'uint256', type: 'uint256' },
      { name: 'refundRatio', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateSlashingRefundRatio',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'v', internalType: 'address', type: 'address' }],
    name: 'updateStakeSubscriberAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'v', internalType: 'address', type: 'address' }],
    name: 'updateTreasuryAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'bytes3', type: 'bytes3' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'toValidatorID', internalType: 'uint256', type: 'uint256' },
      { name: 'wrID', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x0aB8f3b709A52c096f33702fE8153776472305ed)
 */
export const sfcAddress = {
  146: '0x0aB8f3b709A52c096f33702fE8153776472305ed',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x0aB8f3b709A52c096f33702fE8153776472305ed)
 */
export const sfcConfig = { address: sfcAddress, abi: sfcAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SonicStaking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xd5f7fc8ba92756a34693baa386edcc8dd5b3f141)
 */
export const sonicStakingAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'ArrayLengthMismatch' },
  { type: 'error', inputs: [], name: 'DelegateAmountCannotBeZero' },
  { type: 'error', inputs: [], name: 'DepositPaused' },
  { type: 'error', inputs: [], name: 'DepositTooSmall' },
  { type: 'error', inputs: [], name: 'DonationAmountCannotBeZero' },
  { type: 'error', inputs: [], name: 'DonationAmountTooSmall' },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC2612InvalidSigner',
  },
  { type: 'error', inputs: [], name: 'FailedCall' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAccountNonce',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NativeTransferFailed' },
  {
    type: 'error',
    inputs: [{ name: 'validatorId', internalType: 'uint256', type: 'uint256' }],
    name: 'NoDelegationForValidator',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'PausedValueDidNotChange' },
  { type: 'error', inputs: [], name: 'ProtocolFeeTooHigh' },
  { type: 'error', inputs: [], name: 'ProtocolFeeTransferFailed' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RewardsClaimedTooSmall' },
  { type: 'error', inputs: [], name: 'SFCAddressCannotBeZero' },
  { type: 'error', inputs: [], name: 'SenderNotSFC' },
  {
    type: 'error',
    inputs: [{ name: 'refundRatio', internalType: 'uint256', type: 'uint256' }],
    name: 'SfcSlashMustBeAccepted',
  },
  { type: 'error', inputs: [], name: 'TreasuryAddressCannotBeZero' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'error',
    inputs: [{ name: 'withdrawId', internalType: 'uint256', type: 'uint256' }],
    name: 'UnauthorizedWithdraw',
  },
  { type: 'error', inputs: [], name: 'UndelegateAmountCannotBeZero' },
  {
    type: 'error',
    inputs: [{ name: 'validatorId', internalType: 'uint256', type: 'uint256' }],
    name: 'UndelegateAmountExceedsDelegated',
  },
  { type: 'error', inputs: [], name: 'UndelegateAmountExceedsPool' },
  { type: 'error', inputs: [], name: 'UndelegateAmountTooSmall' },
  { type: 'error', inputs: [], name: 'UndelegateFromPoolPaused' },
  { type: 'error', inputs: [], name: 'UndelegatePaused' },
  { type: 'error', inputs: [], name: 'UnsupportedWithdrawKind' },
  { type: 'error', inputs: [], name: 'UserWithdrawsMaxSizeCannotBeZero' },
  { type: 'error', inputs: [], name: 'UserWithdrawsSkipTooLarge' },
  {
    type: 'error',
    inputs: [{ name: 'withdrawId', internalType: 'uint256', type: 'uint256' }],
    name: 'WithdrawAlreadyProcessed',
  },
  {
    type: 'error',
    inputs: [{ name: 'withdrawId', internalType: 'uint256', type: 'uint256' }],
    name: 'WithdrawDelayNotElapsed',
  },
  {
    type: 'error',
    inputs: [{ name: 'withdrawId', internalType: 'uint256', type: 'uint256' }],
    name: 'WithdrawIdDoesNotExist',
  },
  { type: 'error', inputs: [], name: 'WithdrawsPaused' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'validatorId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amountAssets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Delegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'newValue', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'DepositPausedUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amountAssets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amountAssets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Donated',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amountAssetsWithdrawn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'emergency', internalType: 'bool', type: 'bool', indexed: true },
    ],
    name: 'OperatorClawBackExecuted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'validatorId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amountAssets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OperatorClawBackInitiated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newFeeBIPS',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ProtocolFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amountClaimed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'protocolFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newTreasury',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TreasuryUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'newValue', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'UndelegateFromPoolPausedUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'newValue', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'UndelegatePausedUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'withdrawId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'validatorId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountAssets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'kind',
        internalType: 'enum SonicStaking.WithdrawKind',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'Undelegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delay',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawDelaySet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'newValue', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'WithdrawPausedUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'withdrawId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountAssets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'kind',
        internalType: 'enum SonicStaking.WithdrawKind',
        type: 'uint8',
        indexed: false,
      },
      { name: 'emergency', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'Withdrawn',
  },
  {
    type: 'function',
    inputs: [],
    name: 'CLAIM_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_PROTOCOL_FEE_BIPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_CLAIM_REWARDS_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_DEPOSIT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_DONATION_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_UNDELEGATE_AMOUNT_SHARES',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OPERATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SFC',
    outputs: [{ name: '', internalType: 'contract ISFC', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'validatorIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'sharesAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assetAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'delegate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'depositPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'donate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'skip', internalType: 'uint256', type: 'uint256' },
      { name: 'maxSize', internalType: 'uint256', type: 'uint256' },
      { name: 'reverseOrder', internalType: 'bool', type: 'bool' },
    ],
    name: 'getUserWithdraws',
    outputs: [
      {
        name: '',
        internalType: 'struct SonicStaking.WithdrawRequest[]',
        type: 'tuple[]',
        components: [
          {
            name: 'kind',
            internalType: 'enum SonicStaking.WithdrawKind',
            type: 'uint8',
          },
          { name: 'validatorId', internalType: 'uint256', type: 'uint256' },
          { name: 'assetAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'isWithdrawn', internalType: 'bool', type: 'bool' },
          {
            name: 'requestTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'user', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'withdrawId', internalType: 'uint256', type: 'uint256' }],
    name: 'getWithdrawRequest',
    outputs: [
      {
        name: '',
        internalType: 'struct SonicStaking.WithdrawRequest',
        type: 'tuple',
        components: [
          {
            name: 'kind',
            internalType: 'enum SonicStaking.WithdrawKind',
            type: 'uint8',
          },
          { name: 'validatorId', internalType: 'uint256', type: 'uint256' },
          { name: 'assetAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'isWithdrawn', internalType: 'bool', type: 'bool' },
          {
            name: 'requestTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'user', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_sfc', internalType: 'contract ISFC', type: 'address' },
      { name: '_treasury', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'withdrawId', internalType: 'uint256', type: 'uint256' },
      { name: 'emergency', internalType: 'bool', type: 'bool' },
    ],
    name: 'operatorExecuteClawBack',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorId', internalType: 'uint256', type: 'uint256' },
      { name: 'amountAssets', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'operatorInitiateClawBack',
    outputs: [
      { name: 'withdrawId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'actualAmountUndelegated',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingClawBackAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'protocolFeeBIPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newValue', internalType: 'bool', type: 'bool' }],
    name: 'setDepositPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newFeeBIPS', internalType: 'uint256', type: 'uint256' }],
    name: 'setProtocolFeeBIPS',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newTreasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newValue', internalType: 'bool', type: 'bool' }],
    name: 'setUndelegateFromPoolPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newValue', internalType: 'bool', type: 'bool' }],
    name: 'setUndelegatePaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'delay', internalType: 'uint256', type: 'uint256' }],
    name: 'setWithdrawDelay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newValue', internalType: 'bool', type: 'bool' }],
    name: 'setWithdrawPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalDelegated',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalPool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorId', internalType: 'uint256', type: 'uint256' },
      { name: 'amountShares', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'undelegate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amountShares', internalType: 'uint256', type: 'uint256' }],
    name: 'undelegateFromPool',
    outputs: [{ name: 'withdrawId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'undelegateFromPoolPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amountShares', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'undelegateMany',
    outputs: [{ name: 'withdrawIds', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'undelegatePaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'userNumWithdraws',
    outputs: [{ name: 'numWithdraws', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userWithdraws',
    outputs: [{ name: 'withdrawId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'withdrawId', internalType: 'uint256', type: 'uint256' },
      { name: 'emergency', internalType: 'bool', type: 'bool' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawDelay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'withdrawIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'emergency', internalType: 'bool', type: 'bool' },
    ],
    name: 'withdrawMany',
    outputs: [
      {
        name: 'amountsWithdrawn',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xd5f7fc8ba92756a34693baa386edcc8dd5b3f141)
 */
export const sonicStakingAddress = {
  146: '0xD5F7FC8ba92756a34693bAA386Edcc8Dd5B3F141',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0xd5f7fc8ba92756a34693baa386edcc8dd5b3f141)
 */
export const sonicStakingConfig = {
  address: sonicStakingAddress,
  abi: sonicStakingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SonicStakingWithdrawRequestHelper
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x52b16e3d7d25ba64f242e59f9a74799ecc432d78)
 */
export const sonicStakingWithdrawRequestHelperAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_sonicStaking',
        internalType: 'address payable',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'UserWithdrawsMaxSizeCannotBeZero' },
  { type: 'error', inputs: [], name: 'UserWithdrawsSkipTooLarge' },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'skip', internalType: 'uint256', type: 'uint256' },
      { name: 'maxSize', internalType: 'uint256', type: 'uint256' },
      { name: 'reverseOrder', internalType: 'bool', type: 'bool' },
    ],
    name: 'getUserWithdraws',
    outputs: [
      {
        name: 'withdraws',
        internalType: 'struct SonicStakingWithdrawRequestHelper.WithdrawRequest[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          {
            name: 'kind',
            internalType: 'enum SonicStaking.WithdrawKind',
            type: 'uint8',
          },
          { name: 'validatorId', internalType: 'uint256', type: 'uint256' },
          { name: 'assetAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'isWithdrawn', internalType: 'bool', type: 'bool' },
          {
            name: 'requestTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'user', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserWithdrawsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'withdrawId', internalType: 'uint256', type: 'uint256' }],
    name: 'getWithdrawRequest',
    outputs: [
      {
        name: '',
        internalType: 'struct SonicStakingWithdrawRequestHelper.WithdrawRequest',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          {
            name: 'kind',
            internalType: 'enum SonicStaking.WithdrawKind',
            type: 'uint8',
          },
          { name: 'validatorId', internalType: 'uint256', type: 'uint256' },
          { name: 'assetAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'isWithdrawn', internalType: 'bool', type: 'bool' },
          {
            name: 'requestTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'user', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sonicStaking',
    outputs: [{ name: '', internalType: 'contract SonicStaking', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x52b16e3d7d25ba64f242e59f9a74799ecc432d78)
 */
export const sonicStakingWithdrawRequestHelperAddress = {
  146: '0x52B16e3D7d25bA64F242e59f9A74799ecC432d78',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x52b16e3d7d25ba64f242e59f9a74799ecc432d78)
 */
export const sonicStakingWithdrawRequestHelperConfig = {
  address: sonicStakingWithdrawRequestHelperAddress,
  abi: sonicStakingWithdrawRequestHelperAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VaultAdmin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x35fFB749B273bEb20F40f35EdeB805012C539864)
 */
export const vaultAdminAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'mainVault', internalType: 'contract IVault', type: 'address' },
      { name: 'pauseWindowDuration', internalType: 'uint32', type: 'uint32' },
      { name: 'bufferPeriodDuration', internalType: 'uint32', type: 'uint32' },
      { name: 'minTradeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'minWrapAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AfterAddLiquidityHookFailed' },
  { type: 'error', inputs: [], name: 'AfterInitializeHookFailed' },
  { type: 'error', inputs: [], name: 'AfterRemoveLiquidityHookFailed' },
  { type: 'error', inputs: [], name: 'AfterSwapHookFailed' },
  { type: 'error', inputs: [], name: 'AmountGivenZero' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenIn', internalType: 'contract IERC20', type: 'address' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'maxAmountIn', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'AmountInAboveMax',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenOut', internalType: 'contract IERC20', type: 'address' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'AmountOutBelowMin',
  },
  { type: 'error', inputs: [], name: 'BalanceNotSettled' },
  { type: 'error', inputs: [], name: 'BalanceOverflow' },
  { type: 'error', inputs: [], name: 'BeforeAddLiquidityHookFailed' },
  { type: 'error', inputs: [], name: 'BeforeInitializeHookFailed' },
  { type: 'error', inputs: [], name: 'BeforeRemoveLiquidityHookFailed' },
  { type: 'error', inputs: [], name: 'BeforeSwapHookFailed' },
  {
    type: 'error',
    inputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'maxAmountIn', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'BptAmountInAboveMax',
  },
  {
    type: 'error',
    inputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'BptAmountOutBelowMin',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
    ],
    name: 'BufferAlreadyInitialized',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
    ],
    name: 'BufferNotInitialized',
  },
  { type: 'error', inputs: [], name: 'BufferSharesInvalidOwner' },
  { type: 'error', inputs: [], name: 'BufferSharesInvalidReceiver' },
  {
    type: 'error',
    inputs: [{ name: 'totalSupply', internalType: 'uint256', type: 'uint256' }],
    name: 'BufferTotalSupplyTooLow',
  },
  { type: 'error', inputs: [], name: 'CannotReceiveEth' },
  { type: 'error', inputs: [], name: 'CannotSwapSameToken' },
  { type: 'error', inputs: [], name: 'CodecOverflow' },
  { type: 'error', inputs: [], name: 'DoesNotSupportAddLiquidityCustom' },
  { type: 'error', inputs: [], name: 'DoesNotSupportDonation' },
  { type: 'error', inputs: [], name: 'DoesNotSupportRemoveLiquidityCustom' },
  { type: 'error', inputs: [], name: 'DoesNotSupportUnbalancedLiquidity' },
  { type: 'error', inputs: [], name: 'DynamicSwapFeeHookFailed' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'FeePrecisionTooHigh' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenIn', internalType: 'contract IERC20', type: 'address' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'maxAmountIn', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'HookAdjustedAmountInAboveMax',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenOut', internalType: 'contract IERC20', type: 'address' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'HookAdjustedAmountOutBelowMin',
  },
  {
    type: 'error',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'HookAdjustedSwapLimit',
  },
  {
    type: 'error',
    inputs: [
      { name: 'poolHooksContract', internalType: 'address', type: 'address' },
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'poolFactory', internalType: 'address', type: 'address' },
    ],
    name: 'HookRegistrationFailed',
  },
  { type: 'error', inputs: [], name: 'InvalidAddLiquidityKind' },
  { type: 'error', inputs: [], name: 'InvalidRemoveLiquidityKind' },
  { type: 'error', inputs: [], name: 'InvalidToken' },
  { type: 'error', inputs: [], name: 'InvalidTokenConfiguration' },
  { type: 'error', inputs: [], name: 'InvalidTokenDecimals' },
  { type: 'error', inputs: [], name: 'InvalidTokenType' },
  {
    type: 'error',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
    ],
    name: 'InvalidUnderlyingToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'issuedShares', internalType: 'uint256', type: 'uint256' },
      { name: 'minIssuedShares', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'IssuedSharesBelowMin',
  },
  { type: 'error', inputs: [], name: 'MaxTokens' },
  { type: 'error', inputs: [], name: 'MinTokens' },
  { type: 'error', inputs: [], name: 'NotEnoughBufferShares' },
  {
    type: 'error',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
      {
        name: 'expectedUnderlyingAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'actualUnderlyingAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'NotEnoughUnderlying',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
      {
        name: 'expectedWrappedAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'actualWrappedAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NotEnoughWrapped',
  },
  { type: 'error', inputs: [], name: 'NotStaticCall' },
  { type: 'error', inputs: [], name: 'NotVaultDelegateCall' },
  { type: 'error', inputs: [], name: 'OutOfBounds' },
  { type: 'error', inputs: [], name: 'PauseBufferPeriodDurationTooLarge' },
  { type: 'error', inputs: [], name: 'PercentageAboveMax' },
  {
    type: 'error',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'PoolAlreadyInitialized',
  },
  {
    type: 'error',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'PoolAlreadyRegistered',
  },
  {
    type: 'error',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'PoolInRecoveryMode',
  },
  {
    type: 'error',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'PoolNotInRecoveryMode',
  },
  {
    type: 'error',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'PoolNotInitialized',
  },
  {
    type: 'error',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'PoolNotPaused',
  },
  {
    type: 'error',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'PoolNotRegistered',
  },
  {
    type: 'error',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'PoolPauseWindowExpired',
  },
  {
    type: 'error',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'PoolPaused',
  },
  {
    type: 'error',
    inputs: [{ name: 'totalSupply', internalType: 'uint256', type: 'uint256' }],
    name: 'PoolTotalSupplyTooLow',
  },
  { type: 'error', inputs: [], name: 'ProtocolFeesExceedTotalCollected' },
  { type: 'error', inputs: [], name: 'QueriesDisabled' },
  { type: 'error', inputs: [], name: 'QueriesDisabledPermanently' },
  { type: 'error', inputs: [], name: 'QuoteResultSpoofed' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RouterNotTrusted' },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'SafeCastOverflowedUintToInt',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'SenderIsNotVault',
  },
  { type: 'error', inputs: [], name: 'SenderNotAllowed' },
  { type: 'error', inputs: [], name: 'SwapFeePercentageTooHigh' },
  { type: 'error', inputs: [], name: 'SwapFeePercentageTooLow' },
  {
    type: 'error',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SwapLimit',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'contract IERC20', type: 'address' }],
    name: 'TokenAlreadyRegistered',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'contract IERC20', type: 'address' }],
    name: 'TokenNotRegistered',
  },
  {
    type: 'error',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'expectedToken', internalType: 'address', type: 'address' },
      { name: 'actualToken', internalType: 'address', type: 'address' },
    ],
    name: 'TokensMismatch',
  },
  { type: 'error', inputs: [], name: 'TradeAmountTooSmall' },
  { type: 'error', inputs: [], name: 'VaultBuffersArePaused' },
  { type: 'error', inputs: [], name: 'VaultIsNotUnlocked' },
  { type: 'error', inputs: [], name: 'VaultNotPaused' },
  { type: 'error', inputs: [], name: 'VaultPauseWindowDurationTooLarge' },
  { type: 'error', inputs: [], name: 'VaultPauseWindowExpired' },
  { type: 'error', inputs: [], name: 'VaultPaused' },
  {
    type: 'error',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
    ],
    name: 'WrapAmountTooSmall',
  },
  { type: 'error', inputs: [], name: 'WrongProtocolFeeControllerDeployment' },
  {
    type: 'error',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
      { name: 'underlyingToken', internalType: 'address', type: 'address' },
    ],
    name: 'WrongUnderlyingToken',
  },
  { type: 'error', inputs: [], name: 'WrongVaultAdminDeployment' },
  { type: 'error', inputs: [], name: 'WrongVaultExtensionDeployment' },
  { type: 'error', inputs: [], name: 'ZeroDivision' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'aggregateSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AggregateSwapFeePercentageChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'aggregateYieldFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AggregateYieldFeePercentageChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newAuthorizer',
        internalType: 'contract IAuthorizer',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AuthorizerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'burnedShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BufferSharesBurned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'issuedShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BufferSharesMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'liquidityProvider',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'kind',
        internalType: 'enum AddLiquidityKind',
        type: 'uint8',
        indexed: true,
      },
      {
        name: 'totalSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountsAddedRaw',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'swapFeeAmountsRaw',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'LiquidityAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountUnderlying',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountWrapped',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bufferBalances',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'LiquidityAddedToBuffer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'liquidityProvider',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'kind',
        internalType: 'enum RemoveLiquidityKind',
        type: 'uint8',
        indexed: true,
      },
      {
        name: 'totalSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountsRemovedRaw',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'swapFeeAmountsRaw',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'LiquidityRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountUnderlying',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountWrapped',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bufferBalances',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'LiquidityRemovedFromBuffer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'pool', internalType: 'address', type: 'address', indexed: true }],
    name: 'PoolInitialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'paused', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'PoolPausedStateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'recoveryMode',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'PoolRecoveryModeStateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'factory',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenConfig',
        internalType: 'struct TokenConfig[]',
        type: 'tuple[]',
        components: [
          { name: 'token', internalType: 'contract IERC20', type: 'address' },
          { name: 'tokenType', internalType: 'enum TokenType', type: 'uint8' },
          {
            name: 'rateProvider',
            internalType: 'contract IRateProvider',
            type: 'address',
          },
          { name: 'paysYieldFees', internalType: 'bool', type: 'bool' },
        ],
        indexed: false,
      },
      {
        name: 'swapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'pauseWindowEndTime',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'roleAccounts',
        internalType: 'struct PoolRoleAccounts',
        type: 'tuple',
        components: [
          { name: 'pauseManager', internalType: 'address', type: 'address' },
          { name: 'swapFeeManager', internalType: 'address', type: 'address' },
          { name: 'poolCreator', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
      {
        name: 'hooksConfig',
        internalType: 'struct HooksConfig',
        type: 'tuple',
        components: [
          {
            name: 'enableHookAdjustedAmounts',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallBeforeInitialize',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallAfterInitialize',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallComputeDynamicSwapFee',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'shouldCallBeforeSwap', internalType: 'bool', type: 'bool' },
          { name: 'shouldCallAfterSwap', internalType: 'bool', type: 'bool' },
          {
            name: 'shouldCallBeforeAddLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallAfterAddLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallBeforeRemoveLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'shouldCallAfterRemoveLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'hooksContract', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
      {
        name: 'liquidityManagement',
        internalType: 'struct LiquidityManagement',
        type: 'tuple',
        components: [
          {
            name: 'disableUnbalancedLiquidity',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'enableAddLiquidityCustom',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'enableRemoveLiquidityCustom',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'enableDonation', internalType: 'bool', type: 'bool' },
        ],
        indexed: false,
      },
    ],
    name: 'PoolRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newProtocolFeeController',
        internalType: 'contract IProtocolFeeController',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ProtocolFeeControllerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenIn',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenOut',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountIn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountOut',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'swapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'swapFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'swapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SwapFeePercentageChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
        indexed: true,
      },
      {
        name: 'burnedShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'withdrawnUnderlying',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bufferBalances',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'Unwrap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'eventKey',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'eventData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'VaultAuxiliary',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'VaultBuffersPausedStateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'paused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'VaultPausedStateChanged',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'VaultQueriesDisabled' },
  { type: 'event', anonymous: false, inputs: [], name: 'VaultQueriesEnabled' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
        indexed: true,
      },
      {
        name: 'depositedUnderlying',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'mintedShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bufferBalances',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'Wrap',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
      {
        name: 'maxAmountUnderlyingInRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'maxAmountWrappedInRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'exactSharesToIssue', internalType: 'uint256', type: 'uint256' },
      { name: 'sharesOwner', internalType: 'address', type: 'address' },
    ],
    name: 'addLiquidityToBuffer',
    outputs: [
      { name: 'amountUnderlyingRaw', internalType: 'uint256', type: 'uint256' },
      { name: 'amountWrappedRaw', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'areBuffersPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'collectAggregateFees',
    outputs: [
      { name: 'totalSwapFees', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalYieldFees', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'disableQuery',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'disableQueryPermanently',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'disableRecoveryMode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'enableQuery',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'enableRecoveryMode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'getActionId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
    ],
    name: 'getBufferAsset',
    outputs: [{ name: 'underlyingToken', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'contract IERC4626', type: 'address' }],
    name: 'getBufferBalance',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBufferMinimumTotalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC4626', type: 'address' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getBufferOwnerShares',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBufferPeriodDuration',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBufferPeriodEndTime',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'contract IERC4626', type: 'address' }],
    name: 'getBufferTotalShares',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaximumPoolTokens',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumPoolTokens',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumTradeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumWrapAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPauseWindowEndTime',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPoolMinimumTotalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVaultPausedState',
    outputs: [
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
      { name: 'amountUnderlyingRaw', internalType: 'uint256', type: 'uint256' },
      { name: 'amountWrappedRaw', internalType: 'uint256', type: 'uint256' },
      { name: 'minIssuedShares', internalType: 'uint256', type: 'uint256' },
      { name: 'sharesOwner', internalType: 'address', type: 'address' },
    ],
    name: 'initializeBuffer',
    outputs: [{ name: 'issuedShares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isVaultPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'pausePool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pauseVault',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pauseVaultBuffers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'reentrancyGuardEntered',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
      { name: 'sharesToRemove', internalType: 'uint256', type: 'uint256' },
      {
        name: 'minAmountUnderlyingOutRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'minAmountWrappedOutRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidityFromBuffer',
    outputs: [
      {
        name: 'removedUnderlyingBalanceRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'removedWrappedBalanceRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'wrappedToken',
        internalType: 'contract IERC4626',
        type: 'address',
      },
      { name: 'sharesToRemove', internalType: 'uint256', type: 'uint256' },
      {
        name: 'minAmountUnderlyingOutRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'minAmountWrappedOutRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'sharesOwner', internalType: 'address', type: 'address' },
    ],
    name: 'removeLiquidityFromBufferHook',
    outputs: [
      {
        name: 'removedUnderlyingBalanceRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'removedWrappedBalanceRaw',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newAuthorizer',
        internalType: 'contract IAuthorizer',
        type: 'address',
      },
    ],
    name: 'setAuthorizer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newProtocolFeeController',
        internalType: 'contract IProtocolFeeController',
        type: 'address',
      },
    ],
    name: 'setProtocolFeeController',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'swapFeePercentage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setStaticSwapFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'unpausePool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpauseVault',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpauseVaultBuffers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      {
        name: 'newAggregateSwapFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'updateAggregateSwapFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      {
        name: 'newAggregateYieldFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'updateAggregateYieldFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vault',
    outputs: [{ name: '', internalType: 'contract IVault', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x35fFB749B273bEb20F40f35EdeB805012C539864)
 */
export const vaultAdminAddress = {
  146: '0x35fFB749B273bEb20F40f35EdeB805012C539864',
} as const

/**
 * [__View Contract on Sonic Sonic Explorer__](https://sonicscan.org/address/0x35fFB749B273bEb20F40f35EdeB805012C539864)
 */
export const vaultAdminConfig = {
  address: vaultAdminAddress,
  abi: vaultAdminAbi,
} as const
