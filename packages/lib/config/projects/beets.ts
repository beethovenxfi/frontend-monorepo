import { ProjectConfig } from '@repo/lib/config/config.types'
import { PoolDisplayType } from '@repo/lib/modules/pool/pool.types'
import { GqlChainValues, GqlPoolTypeValues } from '@repo/lib/shared/services/api/graphql-enums'
import { isDev, isStaging } from '@repo/lib/config/app.config'

export const beetsSupportedNetworks = [GqlChainValues.Sonic]
//  as const satisfies GqlChain[]

export const ProjectConfigBeets: ProjectConfig = {
  projectId: 'beets',
  projectName: 'Beets',
  projectUrl: 'https://beets.fi',
  projectLogo: 'https://beets.fi/images/icons/beets.svg',
  acceptedPoliciesVersion: 2,
  supportedNetworks: beetsSupportedNetworks,
  corePoolId: '0x10ac2f9dae6539e77e372adb14b1bf8fbd16b3e8000200000000000000000005', // maBEETS BEETS8020 (Fresh BEETS) pool on Sonic
  defaultNetwork: GqlChainValues.Sonic,
  ensNetwork: GqlChainValues.Sonic,
  delegateOwner: '0xba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b', // TODO update this for sonic,
  merklRewardsChains: [GqlChainValues.Sonic],
  options: {
    poolDisplayType: PoolDisplayType.Name,
    hidePoolTags: ['RWA', 'VE8020'],
    hidePoolTypes: [GqlPoolTypeValues.LiquidityBootstrapping],
    showPoolName: true,
    showMaBeets: true,
    allowCreateWallet: false,
    isOnSafeAppList: false,
  },
  links: {
    appLinks: [
      {
        href: '/stake',
        label: 'Stake $S',
      },
      // TODO: uncomment when loops goes live
      // {
      //   href: '/loops',
      //   label: 'Loop $S',
      // },
      {
        href: '/mabeets',
        label: 'maBEETS',
      },
      ...(isDev || isStaging ? [{ href: '/lbp/create', label: 'LBP' }] : []),
    ],
    ecosystemLinks: [
      { label: 'Docs', href: 'https://docs.beets.fi/' },
      { label: 'Governance', href: 'https://snapshot.org/#/beets.eth' },
    ],
    socialLinks: [
      {
        iconType: 'x',
        href: 'https://x.com/beets_fi',
      },
      {
        iconType: 'discord',
        href: 'https://beets.fi/discord',
      },
      {
        iconType: 'medium',
        href: 'https://beetsfi.medium.com/',
      },
      {
        iconType: 'github',
        href: 'https://github.com/beethovenxfi/',
      },
    ],
    legalLinks: [
      { label: 'Terms of Use', href: '/terms-of-use' },
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Cookies policy', href: '/cookies-policy' },
      { label: 'Risks', href: '/risks' },
      { label: 'Third-party services', href: '/3rd-party-services' },
    ],
  },
  footer: {
    linkSections: [
      {
        title: 'Build on Beets',
        links: [
          { label: 'Home', href: '/' },

          { label: 'Docs', href: 'https://docs.beets.fi', isExternal: true },
          {
            label: 'Prototype on v3',
            href: 'https://github.com/beethovenxfi/scaffold-balancer-v3',
            isExternal: true,
          },
        ],
      },
      {
        title: 'Use Beets protocol',
        links: [
          { label: 'Explore pools', href: '/pools' },
          { label: 'Swap tokens', href: '/swap' },
          { label: 'View portfolio', href: '/portfolio' },
          { label: 'Get maBEETS', href: '/mabeets' },
        ],
      },
      {
        title: 'Ecosystem',
        links: [
          {
            label: 'Brand',
            href: 'https://brand.beets.fi',
            isExternal: true,
          },
          { label: 'Governance', href: 'https://snapshot.box/#/s:beets.eth', isExternal: true },
        ],
      },
    ],
  },
}
