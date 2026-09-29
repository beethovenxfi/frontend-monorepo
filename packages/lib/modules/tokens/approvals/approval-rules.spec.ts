import { SupportedChainId } from '@repo/lib/config/config.types'
const WS_ADDRESS = '0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38'
const STS_ADDRESS = '0xe5da20f15420ad15de0fa650600afc998bbe3955'
import { MAX_BIGINT } from '@repo/lib/shared/utils/numbers'
import { testRawAmount } from '@repo/lib/test/utils/numbers'
import { RawAmount, getRequiredTokenApprovals, isTheApprovedAmountEnough } from './approval-rules'

const chainId: SupportedChainId = 146

const rawAmounts: RawAmount[] = [
  {
    address: WS_ADDRESS,
    rawAmount: testRawAmount('10'),
  },
  {
    address: STS_ADDRESS,
    rawAmount: testRawAmount('20'),
  },
]

describe('getRequiredTokenApprovals', () => {
  test('when skipAllowanceCheck', () => {
    expect(
      getRequiredTokenApprovals({
        chainId,
        rawAmounts,
        skipAllowanceCheck: true,
      })
    ).toEqual([])
  })

  test('when empty amounts to approve', () => {
    expect(
      getRequiredTokenApprovals({
        chainId,
        rawAmounts: [],
      })
    ).toEqual([])
  })

  test('when all the amounts to approve are greater than zero', () => {
    expect(
      getRequiredTokenApprovals({
        rawAmounts,
        chainId,
      })
    ).toEqual([
      {
        isPermit2: false,
        tokenAddress: WS_ADDRESS,
        requiredRawAmount: 10000000000000000000n,
        requestedRawAmount: MAX_BIGINT,
        symbol: 'Unknown',
      },
      {
        isPermit2: false,
        tokenAddress: STS_ADDRESS,
        requiredRawAmount: 20000000000000000000n,
        requestedRawAmount: MAX_BIGINT,
        symbol: 'Unknown',
      },
    ])
  })
})

describe('Approved amounts', () => {
  it('should be false when no required amount', () => {
    const tokenAllowance = testRawAmount('10')
    const requiredAmount = testRawAmount('0')

    const result = isTheApprovedAmountEnough(tokenAllowance, requiredAmount)

    expect(result).toBe(false)
  })

  it('should be false when approved less than required', () => {
    const tokenAllowance = testRawAmount('10')
    const requiredAmount = testRawAmount('20')

    const result = isTheApprovedAmountEnough(tokenAllowance, requiredAmount)

    expect(result).toBe(false)
  })

  it('should be true when enough amount approved', () => {
    const tokenAllowance = testRawAmount('30')
    const requiredAmount = testRawAmount('20')

    const result = isTheApprovedAmountEnough(tokenAllowance, requiredAmount)

    expect(result).toBe(true)
  })
})
