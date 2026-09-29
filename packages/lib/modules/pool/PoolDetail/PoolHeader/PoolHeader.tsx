import { Stack, Button, VStack, HStack, Tooltip, Text } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import PoolMetaBadges from './PoolMetaBadges'
import { usePool } from '../../PoolProvider'
import { getPoolAddBlockedReason, shouldBlockAddLiquidity } from '../../pool.helpers'
import { PoolTags } from '../../tags/PoolTags'
import { PoolBreadcrumbs } from './PoolBreadcrumbs'
import { PoolAdvancedOptions } from './PoolAdvancedOptions'
import { usePoolMetadata } from '../../metadata/usePoolMetadata'
import { formatTextListAsItems } from '@repo/lib/shared/utils/text-format'

export function PoolHeader() {
  const pathname = usePathname()
  const { pool } = usePool()
  const router = useRouter()
  const poolMetadata = usePoolMetadata(pool)

  const isAddLiquidityBlocked = shouldBlockAddLiquidity(pool, poolMetadata)
  const blockingReasons = formatTextListAsItems(getPoolAddBlockedReason(pool))

  function handleClick() {
    router.push(`${pathname}/add-liquidity`)
  }

  return (
    <VStack align="start" spacing="md" w="full">
      <PoolBreadcrumbs />
      <Stack
        align={{ base: 'start', lg: 'end' }}
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        mt="xs"
        spacing="md"
        w="full"
      >
        <VStack align="start" spacing="md">
          <PoolMetaBadges />
          {poolMetadata?.description && (
            <Text fontSize="sm" maxW="xl" mb="xxs" sx={{ textWrap: 'pretty' }} variant="secondary">
              {poolMetadata.description}
            </Text>
          )}
        </VStack>
        <Stack direction={{ base: 'column', md: 'row' }} spacing="ms">
          <PoolTags />
          <HStack alignItems="end" gap="sm">
            <Tooltip
              isDisabled={!blockingReasons}
              label={
                <Text color="primaryTextColor" whiteSpace="pre-line">
                  {blockingReasons}
                </Text>
              }
            >
              <Button
                isDisabled={isAddLiquidityBlocked}
                onClick={handleClick}
                size="md"
                variant="primary"
                w="full"
              >
                Add liquidity
              </Button>
            </Tooltip>
            <PoolAdvancedOptions />
          </HStack>
        </Stack>
      </Stack>
    </VStack>
  )
}
