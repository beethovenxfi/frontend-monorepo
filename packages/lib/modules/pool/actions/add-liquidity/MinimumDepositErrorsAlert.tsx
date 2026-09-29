import { BalAlert } from '@repo/lib/shared/components/alerts/BalAlert'
import { MinimumDepositErrors } from './useIsMinimumDepositMet'
import { BalAlertContent } from '@repo/lib/shared/components/alerts/BalAlertContent'
import { ListItem, Text, UnorderedList } from '@chakra-ui/react'
import type BigNumber from 'bignumber.js'

type Props = {
  errors: MinimumDepositErrors
}

export function MinimumDepositErrorsAlert({ errors }: Props) {
  return (
    <BalAlert
      content={
        <BalAlertContent title="Minimum deposit not met for the pool">
          <UnorderedList w="full">
            {Object.keys(errors).map(key => (
              <MinimumDepositErrorAlert errorType={key} key={key} min={errors[key]!} />
            ))}
          </UnorderedList>
        </BalAlertContent>
      }
      status="error"
    />
  )
}

function MinimumDepositErrorAlert({ errorType, min }: { errorType: string; min: BigNumber }) {
  const toCurrencyWithoutLimit = (min: BigNumber) => {
    return `$${min.toFixed()}`
  }

  return (
    <ListItem color="black" pb="xxs">
      <Text color="black" fontSize="sm">
        {errorType === 'BPT'
          ? `The minimum amount to add should be ${toCurrencyWithoutLimit(min)}`
          : errorType === 'PriceImpact'
            ? `To calculate the price impact a minimum add of ${toCurrencyWithoutLimit(min)} is needed`
            : `The minimum add for ${errorType} should be at least ${min.toFixed()}`}
      </Text>
    </ListItem>
  )
}
