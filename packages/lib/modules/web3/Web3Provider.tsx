'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, Theme, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { ReactQueryClientProvider } from '@repo/lib/shared/app/react-query.provider'
import { useTheme } from '@chakra-ui/react'
import { merge } from 'lodash'
import { UserSettingsProvider } from '../user/settings/UserSettingsProvider'
import { AcceptPoliciesModal } from './AcceptPoliciesModal'
import { CustomAvatar } from './CustomAvatar'
import { UserAccountProvider } from './UserAccountProvider'
import { PropsWithChildren } from 'react'
import { useWagmiConfig } from './WagmiConfigProvider'

export function Web3Provider({ children }: PropsWithChildren) {
  const { colors, radii, shadows, semanticTokens, fonts } = useTheme()

  const { wagmiConfig } = useWagmiConfig()

  const sharedConfig = {
    fonts: {
      body: fonts.body,
    },
    radii: {
      connectButton: radii.md,
      actionButton: radii.md,
      menuButton: radii.md,
      modal: radii.md,
      modalMobile: radii.md,
    },
    shadows: {
      connectButton: shadows.md,
      dialog: shadows.xl,
      profileDetailsAction: shadows.md,
      selectedOption: shadows.md,
      selectedWallet: shadows.md,
      walletLogo: shadows.md,
    },
    colors: {
      accentColor: colors.purple[500],
      // accentColorForeground: '...',
      // actionButtonBorder: '...',
      // actionButtonBorderMobile: '...',
      // actionButtonSecondaryBackground: '...',
      // closeButton: '...',
      // closeButtonBackground: '...',
      // connectButtonBackground: '#000000',
      // connectButtonBackgroundError: '...',
      // connectButtonInnerBackground: '#000000',
      // connectButtonText: '...',
      // connectButtonTextError: '...',
      // connectionIndicator: '...',
      // downloadBottomCardBackground: '...',
      // downloadTopCardBackground: '...',
      // error: '...',
      // generalBorder: '...',
      // generalBorderDim: '...',
      // menuItemBackground: '...',
      // modalBackdrop: '...',
      modalBackground: semanticTokens.colors.background.level0,
      // modalBorder: '...',
      modalText: semanticTokens.colors.font.primary,
      // modalTextDim: '...',
      // modalTextSecondary: '...',
      // profileAction: '...',
      // profileActionHover: '...',
      // profileForeground: '...',
      // selectedOptionBorder: '...',
      // standby: '...',
    },
  }

  const customTheme = merge(darkTheme(), {
    ...sharedConfig,
  } as Theme)

  return (
    <ReactQueryClientProvider>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider avatar={CustomAvatar} theme={customTheme}>
          <UserAccountProvider>
            <UserSettingsProvider
              initAcceptedPolicies={undefined}
              initEnableSignatures={undefined}
              initPoolListView={undefined}
              initSlippage={undefined}
            >
              {children}
              <AcceptPoliciesModal />
            </UserSettingsProvider>
          </UserAccountProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </ReactQueryClientProvider>
  )
}
