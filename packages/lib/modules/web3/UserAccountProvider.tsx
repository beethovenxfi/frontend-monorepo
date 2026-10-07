'use client'

import { useConnection, useConnectionEffect } from 'wagmi'
import { emptyAddress } from './contracts/wagmi-helpers'
import { PropsWithChildren, createContext, useEffect } from 'react'
import { useMandatoryContext } from '@repo/lib/shared/utils/contexts'
import { shouldUseAnvilFork } from '@repo/lib/config/app.config'
import { useIsMounted } from '@repo/lib/shared/hooks/useIsMounted'
import { useSafeAppConnectionGuard } from './useSafeAppConnectionGuard'
import { useWCConnectionLocalStorage } from './wallet-connect/useWCConnectionLocalStorage'
import { clearImpersonatedAddressLS } from '@repo/lib/test/utils/wagmi/fork.helpers'

export type UseUserAccountResponse = ReturnType<typeof useUserAccountLogic>
export const UserAccountContext = createContext<UseUserAccountResponse | null>(null)

export function useUserAccountLogic() {
  const isMounted = useIsMounted()
  const query = useConnection()

  const { address, ...queryWithoutAddress } = query

  function onEmptyUserAddress() {
    if (isConnectedToWC) {
      setIsConnectedToWC(false)
    }
  }

  function onNewUserAddress(result: UseUserAccountResponse) {
    if (result.isWCConnector) {
      setIsConnectedToWC(true)
    }
  }

  // The usage of mounted helps to overcome nextjs hydration mismatch
  // errors where the state of the user account on the server pass is different
  // than the state on the client side rehydration.
  const result = {
    ...queryWithoutAddress,
    isLoading: !isMounted || query.isConnecting,
    isConnecting: !isMounted || query.isConnecting,
    // We use an emptyAddress when the user is not connected to avoid undefined value and satisfy the TS compiler
    userAddress: isMounted ? address || emptyAddress : emptyAddress,
    isConnected: isMounted && !!address,
    connector: isMounted ? query.connector : undefined,
    isWCConnector: isMounted ? query.connector?.id === 'walletConnect' : false,
  }

  useSafeAppConnectionGuard(result.connector, result.chainId)

  const { isConnectedToWC, setIsConnectedToWC } = useWCConnectionLocalStorage()

  useEffect(() => {
    if (address) {
      onNewUserAddress(result)
    } else {
      onEmptyUserAddress()
    }
  }, [address, result.isWCConnector, isConnectedToWC])

  useConnectionEffect({
    onDisconnect: () => {
      if (shouldUseAnvilFork) {
        clearImpersonatedAddressLS()
      }

      if (isConnectedToWC) {
        // When disconnecting from WC connector we need a full page reload to enforce a new WC connector instance created
        console.log('Full page reload on WC disconnection')
        window.location.reload()
      }
    },
  })

  return result
}

export function UserAccountProvider({ children }: PropsWithChildren) {
  const hook = useUserAccountLogic()
  return <UserAccountContext.Provider value={hook}>{children}</UserAccountContext.Provider>
}

export const useUserAccount = (): UseUserAccountResponse =>
  useMandatoryContext(UserAccountContext, 'UserAccount')
