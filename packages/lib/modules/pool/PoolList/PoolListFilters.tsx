'use client'

import {
  Badge,
  Box,
  Button,
  ButtonProps,
  Center,
  Checkbox,
  Flex,
  forwardRef,
  Heading,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { PoolListSearch } from './PoolListSearch'
import { PROTOCOL_VERSION_TABS } from './usePoolListQueryState'
import {
  PoolFilterType,
  poolHookTagFilters,
  PoolHookTagType,
  poolTagFilters,
  PoolTagType,
  poolTypeFilters,
} from '../pool.types'
import { useUserAccount } from '@repo/lib/modules/web3/UserAccountProvider'
import { useState } from 'react'
import { Filter, Info, Plus } from 'lucide-react'
import { useBreakpoints } from '@repo/lib/shared/hooks/useBreakpoints'
import { useCurrency } from '@repo/lib/shared/hooks/useCurrency'
import { motion, AnimatePresence } from 'motion/react'
import { staggeredFadeInUp } from '@repo/lib/shared/utils/animations'
import { usePoolList } from './PoolListProvider'
import ButtonGroup, {
  ButtonGroupOption,
} from '@repo/lib/shared/components/btns/button-group/ButtonGroup'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'
import { poolTypeLabel } from '../pool.helpers'
import { AnimatedTag } from '@repo/lib/shared/components/other/AnimatedTag'
import { PoolMinTvlFilter } from './PoolMinTvlFilter'
import NextLink from 'next/link'
import { TooltipWithTouch } from '@repo/lib/shared/components/tooltips/TooltipWithTouch'

export function useFilterTagsVisible() {
  const {
    queryState: { poolTypes, minTvl, poolTags, poolHookTags, protocolVersion, joinablePools },
  } = usePoolList()

  return (
    poolTypes.length > 0 ||
    minTvl > 0 ||
    poolTags.length > 0 ||
    poolHookTags.length > 0 ||
    joinablePools ||
    !!protocolVersion
  )
}

function UserLiquidityFilters() {
  const {
    queryState: { userAddress, toggleUserAddress, joinablePools, toggleJoinablePools },
  } = usePoolList()

  const { userAddress: connectedUserAddress } = useUserAccount()
  const isMyPositionsChecked = connectedUserAddress ? userAddress === connectedUserAddress : false

  return (
    <VStack align="start" spacing="xs">
      <Checkbox
        isChecked={isMyPositionsChecked}
        mb="xxs"
        onChange={e => toggleUserAddress(e.target.checked, connectedUserAddress as string)}
      >
        <Text fontSize="sm">My positions</Text>
      </Checkbox>

      <Checkbox
        isChecked={joinablePools}
        mb="xxs"
        onChange={e => toggleJoinablePools(e.target.checked)}
      >
        <HStack gap="xs">
          <Text fontSize="sm">Joinable pools</Text>
          <TooltipWithTouch
            label="This shows pools where you have at least one token in your wallet. For performance reasons, this will only filter from the top 100 pools for your current search criteria."
            placement="top"
          >
            <Icon
              _hover={{ opacity: 1 }}
              as={Info}
              boxSize={3}
              color="font.secondary"
              opacity={0.6}
              position="relative"
              top="1px"
            />
          </TooltipWithTouch>
        </HStack>
      </Checkbox>
    </VStack>
  )
}

function PoolCategoryFilters({ hidePoolTags }: { hidePoolTags: string[] }) {
  const {
    queryState: { togglePoolTag, poolTags, poolTagLabel },
  } = usePoolList()

  return (
    <Box animate="show" as={motion.div} exit="exit" initial="hidden" variants={staggeredFadeInUp}>
      {poolTagFilters
        .filter(tag => !hidePoolTags?.includes(tag))
        .map(tag => (
          <Box as={motion.div} key={tag} variants={staggeredFadeInUp}>
            <Checkbox
              isChecked={!!poolTags.find(selected => selected === tag)}
              onChange={e => togglePoolTag(e.target.checked, tag as PoolTagType)}
            >
              <Text fontSize="sm">{poolTagLabel(tag)}</Text>
            </Checkbox>
          </Box>
        ))}
    </Box>
  )
}

function PoolHookFilters() {
  const {
    queryState: { togglePoolHookTag, poolHookTags, poolHookTagLabel },
  } = usePoolList()

  // Exclude hooks that are not live
  const livePoolHookTagFilters = poolHookTagFilters.filter(
    tag => tag !== 'HOOKS_FEETAKING' && tag !== 'HOOKS_EXITFEE'
  )

  return (
    <Box animate="show" as={motion.div} exit="exit" initial="hidden" variants={staggeredFadeInUp}>
      {livePoolHookTagFilters.map(tag => (
        <Box as={motion.div} key={tag} variants={staggeredFadeInUp}>
          <Checkbox
            isChecked={!!poolHookTags.find(selected => selected === tag)}
            onChange={e => togglePoolHookTag(e.target.checked, tag as PoolHookTagType)}
          >
            <Text fontSize="sm">{poolHookTagLabel(tag)}</Text>
          </Checkbox>
        </Box>
      ))}
    </Box>
  )
}

export interface PoolTypeFiltersArgs {
  poolTypes: PoolFilterType[]
  poolTypeLabel: (poolType: PoolFilterType) => string
  togglePoolType: (checked: boolean, value: PoolFilterType) => void
  hidePoolTypes?: PoolFilterType[]
}

export function PoolTypeFilters({
  togglePoolType,
  poolTypes,
  poolTypeLabel,
  hidePoolTypes,
}: PoolTypeFiltersArgs) {
  const _poolTypeFilters = poolTypeFilters.filter(
    poolType => !(hidePoolTypes ?? []).includes(poolType)
  )

  return (
    <Box animate="show" as={motion.div} exit="exit" initial="hidden" variants={staggeredFadeInUp}>
      {_poolTypeFilters.map(poolType => (
        <Box as={motion.div} key={poolType} variants={staggeredFadeInUp}>
          <Checkbox
            isChecked={!!poolTypes.find(selected => selected === poolType)}
            onChange={e => togglePoolType(e.target.checked, poolType as PoolFilterType)}
          >
            <Text fontSize="sm">{poolTypeLabel(poolType)}</Text>
          </Checkbox>
        </Box>
      ))}
    </Box>
  )
}

export interface FilterTagsPops {
  poolTypes: PoolFilterType[]
  togglePoolType: (checked: boolean, value: PoolFilterType) => void
  poolTypeLabel: (poolType: PoolFilterType) => string
  protocolVersion: number | null
  setProtocolVersion: (value: number | null) => void
  minTvl?: number
  setMinTvl?: (value: number | null) => void
  poolTags?: PoolTagType[]
  togglePoolTag?: (checked: boolean, value: PoolTagType) => void
  poolTagLabel?: (poolTag: PoolTagType) => string
  includeExpiredPools?: boolean
  toggleIncludeExpiredPools?: (checked: boolean) => void
  poolHookTags?: PoolHookTagType[]
  togglePoolHookTag?: (checked: boolean, value: PoolHookTagType) => void
  poolHookTagLabel?: (poolHookTag: PoolHookTagType) => string
  joinablePools?: boolean
  toggleJoinablePools?: (checked: boolean) => void
}

export function FilterTags({
  poolTypes,
  togglePoolType,
  poolTypeLabel,
  minTvl,
  setMinTvl,
  poolTags,
  togglePoolTag,
  poolTagLabel,
  includeExpiredPools,
  toggleIncludeExpiredPools,
  poolHookTags,
  togglePoolHookTag,
  poolHookTagLabel,
  joinablePools,
  toggleJoinablePools,
  protocolVersion,
  setProtocolVersion,
}: FilterTagsPops) {
  const { toCurrency } = useCurrency()

  // prevents layout shift in mobile view
  if (
    poolTypes.length === 0 &&
    minTvl === 0 &&
    (poolTags ? poolTags.length === 0 : true) &&
    !includeExpiredPools &&
    (poolHookTags ? poolHookTags.length === 0 : true) &&
    !joinablePools &&
    !protocolVersion
  ) {
    return <Box display={{ base: 'flex', md: 'none' }} minHeight="32px" />
  }

  return (
    <HStack spacing="sm" wrap="wrap">
      <AnimatePresence>
        {protocolVersion && setProtocolVersion && (
          <AnimatedTag
            key="protocolVersion"
            label={protocolVersion === 1 ? 'CoW' : `v${protocolVersion}`}
            onClose={() => setProtocolVersion(null)}
          />
        )}

        {poolTypes.map(poolType => (
          <AnimatedTag
            key={poolType}
            label={poolTypeLabel(poolType)}
            onClose={() => togglePoolType(false, poolType)}
          />
        ))}

        {minTvl && minTvl > 0 && (
          <AnimatedTag
            key="minTvl"
            label={`TVL > ${toCurrency(minTvl)}`}
            onClose={() => setMinTvl && setMinTvl(0)}
          />
        )}

        {poolTags &&
          poolTagLabel &&
          poolTags.map(tag => (
            <AnimatedTag
              key={tag}
              label={poolTagLabel(tag)}
              onClose={() => togglePoolTag && togglePoolTag(false, tag)}
            />
          ))}

        {includeExpiredPools && (
          <AnimatedTag
            key="expiredPools"
            label="Expired"
            onClose={() => toggleIncludeExpiredPools && toggleIncludeExpiredPools(false)}
          />
        )}

        {poolHookTags &&
          poolHookTagLabel &&
          poolHookTags.map(tag => (
            <AnimatedTag
              key={tag}
              label={poolHookTagLabel(tag)}
              onClose={() => togglePoolHookTag && togglePoolHookTag(false, tag)}
            />
          ))}

        {joinablePools && (
          <AnimatedTag
            key="joinablePools"
            label="Joinable pools"
            onClose={() => toggleJoinablePools && toggleJoinablePools(false)}
          />
        )}
      </AnimatePresence>
    </HStack>
  )
}

export const FilterButton = forwardRef<ButtonProps & { totalFilterCount: number }, 'button'>(
  ({ totalFilterCount, onClick, ...props }, ref) => {
    const { isMobile } = useBreakpoints()
    const textColor = useColorModeValue('#fff', 'font.dark')

    const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
    }

    return (
      <Button
        ref={ref}
        {...props}
        display="flex"
        gap="2"
        onClick={handleFilterClick}
        variant="tertiary"
      >
        <Icon as={Filter} boxSize={4} />
        {!isMobile && 'Filters'}
        {totalFilterCount > 0 && (
          <Badge
            bg="font.highlight"
            borderRadius="full"
            color={textColor}
            p="0"
            position="absolute"
            right="-9px"
            shadow="lg"
            top="-9px"
          >
            <Center h="5" w="5">
              {totalFilterCount}
            </Center>
          </Badge>
        )}
      </Button>
    )
  }
)

export interface ProtocolVersionFilterProps {
  setProtocolVersion: (version: number | null) => any
  protocolVersion: number | null
}

export function ProtocolVersionFilter({
  setProtocolVersion,
  protocolVersion,
}: ProtocolVersionFilterProps) {
  const tabs = PROTOCOL_VERSION_TABS

  const activeProtocolVersionTab =
    protocolVersion === 3
      ? PROTOCOL_VERSION_TABS[2]
      : protocolVersion === 2
        ? PROTOCOL_VERSION_TABS[1]
        : PROTOCOL_VERSION_TABS[0]

  function toggleTab(option: ButtonGroupOption) {
    if (option.value === 'v3') {
      setProtocolVersion(3)
    } else if (option.value === 'v2') {
      setProtocolVersion(2)
    } else {
      setProtocolVersion(null)
    }
  }

  return (
    <ButtonGroup
      currentOption={activeProtocolVersionTab}
      groupId="protocol-version"
      onChange={toggleTab}
      options={tabs}
      size="xxs"
    />
  )
}

export function PoolListFilters() {
  const { isConnected } = useUserAccount()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const {
    isFixedPoolType,
    queryState: {
      resetFilters,
      totalFilterCount,
      togglePoolType,
      poolTypes,
      setProtocolVersion,
      protocolVersion,
    },
  } = usePoolList()

  const { isMobile } = useBreakpoints()

  function _resetFilters() {
    resetFilters()
  }

  const { options } = PROJECT_CONFIG

  return (
    <VStack w="full">
      <HStack gap="0" justify="end" pr={{ base: 'md', xl: '0' }} spacing="none" w="full">
        <PoolListSearch />
        <Popover
          isLazy
          isOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          onOpen={() => setIsPopoverOpen(true)}
          placement="bottom-end"
        >
          <PopoverTrigger>
            <FilterButton ml="ms" totalFilterCount={totalFilterCount} />
          </PopoverTrigger>
          <Box shadow="2xl" zIndex="popover">
            <PopoverContent motionProps={{ animate: { scale: 1, opacity: 1 } }}>
              <PopoverArrow bg="background.level3" />
              <PopoverCloseButton top="sm" />
              <PopoverBody p="md">
                <AnimatePresence>
                  {isPopoverOpen ? (
                    <VStack
                      align="start"
                      animate="show"
                      as={motion.div}
                      exit="exit"
                      initial="hidden"
                      spacing="md"
                      variants={staggeredFadeInUp}
                    >
                      <Box as={motion.div} lineHeight="0" p="0" variants={staggeredFadeInUp}>
                        <Flex alignItems="center" gap="ms" justifyContent="space-between" w="full">
                          <Text
                            background="font.special"
                            backgroundClip="text"
                            display="inline"
                            fontSize="xs"
                            variant="eyebrow"
                          >
                            Filters
                          </Text>
                          {totalFilterCount > 0 && (
                            <Button
                              h="fit-content"
                              onClick={_resetFilters}
                              size="xs"
                              variant="link"
                            >
                              Reset all
                            </Button>
                          )}
                        </Flex>
                      </Box>

                      {isConnected ? (
                        <Box as={motion.div} variants={staggeredFadeInUp}>
                          <Heading as="h3" my="sm" size="sm">
                            Based on my wallet
                          </Heading>
                          <UserLiquidityFilters />
                        </Box>
                      ) : null}
                      <Box as={motion.div} variants={staggeredFadeInUp}>
                        <Heading as="h3" mb="sm" size="sm">
                          Protocol version
                        </Heading>
                        <ProtocolVersionFilter
                          protocolVersion={protocolVersion}
                          setProtocolVersion={setProtocolVersion}
                        />
                      </Box>
                      {!isFixedPoolType && (
                        <Box as={motion.div} variants={staggeredFadeInUp}>
                          <Heading as="h3" mb="sm" size="sm">
                            Pool types
                          </Heading>
                          <PoolTypeFilters
                            hidePoolTypes={PROJECT_CONFIG.options.hidePoolTypes}
                            poolTypeLabel={poolTypeLabel}
                            poolTypes={poolTypes}
                            togglePoolType={togglePoolType}
                          />
                        </Box>
                      )}
                      <>
                        <Box as={motion.div} variants={staggeredFadeInUp}>
                          <Heading as="h3" mb="sm" size="sm">
                            Pool categories
                          </Heading>
                          <PoolCategoryFilters hidePoolTags={options.hidePoolTags} />
                        </Box>

                        <Box as={motion.div} variants={staggeredFadeInUp}>
                          <Heading as="h3" mb="sm" size="sm">
                            Hooks
                          </Heading>
                          <PoolHookFilters />
                        </Box>
                      </>
                      <Box as={motion.div} mb="xs" variants={staggeredFadeInUp} w="full">
                        <PoolMinTvlFilter />
                      </Box>
                    </VStack>
                  ) : null}
                </AnimatePresence>
              </PopoverBody>
            </PopoverContent>
          </Box>
        </Popover>
        <Button as={NextLink} display="flex" gap="2" href="/create" ml="ms" variant="tertiary">
          <Icon as={Plus} boxSize={4} />
          {!isMobile && 'Create a pool'}
        </Button>
      </HStack>
    </VStack>
  )
}
