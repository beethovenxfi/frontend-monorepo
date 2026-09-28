import {
  Box,
  Text,
  ButtonProps,
  useColorModeValue,
  Button,
  Icon,
  Badge,
  Center,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  VStack,
  forwardRef,
  Checkbox,
} from '@chakra-ui/react'
import { useBreakpoints } from '@repo/lib/shared/hooks/useBreakpoints'
import { staggeredFadeInUp } from '@repo/lib/shared/utils/animations'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Filter } from 'lucide-react'
import { usePortfolioFilters } from './PortfolioFiltersProvider'
import { PoolFilterType } from '../../pool/pool.types'
import { poolTypeLabel } from '../../pool/pool.helpers'
import { AnimatedTag } from '@repo/lib/shared/components/other/AnimatedTag'
import { StakingFilterKeyType, STAKING_LABEL_MAP } from './useExpandedPools'

interface CheckboxFilterListProps<T> {
  availableItems: T[]
  selectedItems: T[]
  toggleItem: (checked: boolean, value: T) => void
  getItemLabel: (item: T) => string
}

function CheckboxFilterList<T>({
  availableItems,
  selectedItems,
  toggleItem,
  getItemLabel,
}: CheckboxFilterListProps<T>) {
  return (
    <Box animate="show" as={motion.div} exit="exit" initial="hidden" variants={staggeredFadeInUp}>
      {availableItems.map(item => (
        <Box as={motion.div} key={String(item)} variants={staggeredFadeInUp}>
          <Checkbox
            isChecked={!!selectedItems.find(selected => selected === item)}
            onChange={e => toggleItem(e.target.checked, item)}
          >
            <Text fontSize="sm" textTransform="capitalize">
              {getItemLabel(item)}
            </Text>
          </Checkbox>
        </Box>
      ))}
    </Box>
  )
}

export interface PortfolioPoolTypeFiltersArgs {
  poolTypes: PoolFilterType[]
  setPoolTypes: (poolTypes: PoolFilterType[]) => void
  togglePoolType: (checked: boolean, value: PoolFilterType) => void
  availablePoolTypes: PoolFilterType[]
}

export function PoolTypeFilters({
  togglePoolType,
  poolTypes,
  availablePoolTypes,
}: PortfolioPoolTypeFiltersArgs) {
  return (
    <CheckboxFilterList
      availableItems={availablePoolTypes}
      getItemLabel={poolTypeLabel}
      selectedItems={poolTypes}
      toggleItem={togglePoolType}
    />
  )
}

export interface PortfolioStakingTypeFiltersArgs {
  availableStakingTypes: StakingFilterKeyType[]
  stakingTypes: StakingFilterKeyType[]
  toggleStakingType: (checked: boolean, value: StakingFilterKeyType) => void
}

export function StakingTypeFilters({
  availableStakingTypes,
  stakingTypes,
  toggleStakingType,
}: PortfolioStakingTypeFiltersArgs) {
  return (
    <CheckboxFilterList
      availableItems={availableStakingTypes}
      getItemLabel={item => STAKING_LABEL_MAP[item]}
      selectedItems={stakingTypes}
      toggleItem={toggleStakingType}
    />
  )
}

export function usePortfolioFilterTagsVisible() {
  const { selectedPoolTypes, selectedStakingTypes } = usePortfolioFilters()

  return selectedPoolTypes.length > 0 || selectedStakingTypes.length > 0
}

export interface PortfolioFilterTagsPops {
  poolTypes: PoolFilterType[]
  togglePoolType: (checked: boolean, value: PoolFilterType) => void
  stakingTypes: StakingFilterKeyType[]
  toggleStakingType: (checked: boolean, value: StakingFilterKeyType) => void
}

export function PortfolioFilterTags({
  poolTypes,
  togglePoolType,
  stakingTypes,
  toggleStakingType,
}: PortfolioFilterTagsPops) {
  // prevents layout shift in mobile view
  if (poolTypes.length === 0 && stakingTypes.length === 0) {
    return <Box display={{ base: 'flex', md: 'none' }} minHeight="32px" />
  }

  return (
    <HStack spacing="sm" wrap="wrap">
      <AnimatePresence>
        {poolTypes.map(poolType => (
          <AnimatedTag
            key={poolType}
            label={poolTypeLabel(poolType)}
            onClose={() => togglePoolType(false, poolType)}
          />
        ))}
        {stakingTypes.map((stakingTypeKey: StakingFilterKeyType) => (
          <AnimatedTag
            key={stakingTypeKey}
            label={STAKING_LABEL_MAP[stakingTypeKey]}
            onClose={() => toggleStakingType(false, stakingTypeKey)}
          />
        ))}
      </AnimatePresence>
    </HStack>
  )
}

export const FilterButton = forwardRef<ButtonProps & { totalFilterCount: number }, 'button'>(
  ({ totalFilterCount, ...props }, ref) => {
    const { isMobile } = useBreakpoints()
    const textColor = useColorModeValue('#fff', 'font.dark')

    return (
      <Button ref={ref} {...props} display="flex" gap="2" variant="tertiary">
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

export function PortfolioFilters({ selectedPoolTypes }: { selectedPoolTypes?: PoolFilterType[] }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const {
    totalFilterCount,
    resetFilters,
    selectedPoolTypes: hookSelectedPoolTypes,
    setSelectedPoolTypes,
    togglePoolType,
    availablePoolTypes,
    selectedStakingTypes,
    toggleStakingType,
    availableStakingTypes,
  } = usePortfolioFilters()

  const effectiveSelectedPoolTypes = selectedPoolTypes || hookSelectedPoolTypes

  const isDisabled = availablePoolTypes.length === 0 && availableStakingTypes.length === 0

  return (
    <VStack w="full">
      <HStack gap="0" justify="end" spacing="none" w="full">
        {/* <PoolListSearch /> */}
        <Popover
          isOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          onOpen={() => setIsPopoverOpen(true)}
          placement="bottom-end"
        >
          <PopoverTrigger>
            <FilterButton isDisabled={isDisabled} ml="ms" totalFilterCount={totalFilterCount} />
          </PopoverTrigger>
          <Box shadow="2xl" zIndex="popover">
            <PopoverContent>
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
                            <Button h="fit-content" onClick={resetFilters} size="xs" variant="link">
                              Reset all
                            </Button>
                          )}
                        </Flex>
                      </Box>
                      <Box as={motion.div} variants={staggeredFadeInUp}>
                        <Heading as="h3" mb="sm" size="sm">
                          Pool types
                        </Heading>
                        <PoolTypeFilters
                          availablePoolTypes={availablePoolTypes}
                          poolTypes={effectiveSelectedPoolTypes}
                          setPoolTypes={setSelectedPoolTypes}
                          togglePoolType={togglePoolType}
                        />
                      </Box>
                      <Box as={motion.div} variants={staggeredFadeInUp}>
                        <Heading as="h3" mb="sm" size="sm">
                          Staking types
                        </Heading>
                        <StakingTypeFilters
                          availableStakingTypes={availableStakingTypes}
                          stakingTypes={selectedStakingTypes}
                          toggleStakingType={toggleStakingType}
                        />
                      </Box>
                    </VStack>
                  ) : null}
                </AnimatePresence>
              </PopoverBody>
            </PopoverContent>
          </Box>
        </Popover>
      </HStack>
    </VStack>
  )
}
