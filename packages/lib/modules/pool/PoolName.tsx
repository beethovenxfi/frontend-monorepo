import { fNum } from '@repo/lib/shared/utils/numbers'
import { PoolCore, PoolToken } from './pool.types'
import { HStack, Text, TextProps } from '@chakra-ui/react'
import { getUserReferenceTokens } from './pool-tokens.utils'

interface PoolNameProps extends TextProps {
  pool: PoolCore
  showUnderlying?: boolean
}

export function PoolName({ pool, showUnderlying, ...rest }: PoolNameProps) {
  const tokens = getUserReferenceTokens(pool).filter(token => token.address !== pool.address)

  return (
    <HStack alignItems="center" gap="xxs" justify="start" px="sm" wrap="wrap">
      {tokens.map((token, idx) => {
        return (
          <HStack alignItems="center" gap="xxs" justify="center" key={token.address}>
            <Text as="span" fontWeight="bold" {...rest} fontSize="sm" lineHeight="1">
              {formatToken(token, showUnderlying)}
              {token.weight && ` ${fNum('weight', token.weight || '')}`}
            </Text>
            <Text {...rest} lineHeight="1">
              {idx <= tokens.length - 2 && '/'}
            </Text>
          </HStack>
        )
      })}
    </HStack>
  )
}

function formatToken(token: PoolToken, showUnderlying: boolean | undefined) {
  if (showUnderlying && token.underlyingToken) return token.underlyingToken?.symbol

  return token.symbol
}
