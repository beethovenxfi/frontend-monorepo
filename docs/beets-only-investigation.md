# Separate investigation: Beets-only repository

Date: 2026-09-28. Scope: cleanup plan, staged/unstaged diff, workspace structure,
Beets routes/config, shared runtime features, ABIs, dependencies, tests/CI, public
assets and environment declarations. No application code changed.

Method: independent read-only passes covered runtime reachability, tooling/assets,
and the diff. The primary pass checked key findings and ran a TypeScript baseline.
This is a source-based investigation, not a complete production-data or dynamic
dependency graph proof.

## User-confirmed constraints

- The GraphQL API has already been heavily refactored to Beets-only. That server
  work is outside this task. Existing frontend generated artifacts are not
  authoritative evidence of the current remote API contract.
- The Beets app only needs Sonic; Fantom protocol statistics and every other
  network can be removed. Unsupported pool/portfolio routes should return 404,
  not add a separate Sonic-guard mechanism.
- Beets has no BAL rewards. The remaining BAL mint operation, approval and
  BAL-specific UI copy are cleanup candidates; Sonic gauge claims still matter.
- Keep `@x402/core`, `@x402/evm`, `@x402/extensions`, `@x402/svm`: they satisfy
  wagmi compatibility requirements. Initial absence-of-import evidence was
  insufficient to classify these packages as unused; that candidate is withdrawn.

## Ranked synthesis

| Rank | Finding                                                                                    | Confidence and basis                                                                     |
| ---- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| 1    | Beets is already the only app; remaining cleanup is inside its dependency closure          | High: app manifests, workspace layout and scripts                                        |
| 2    | Partial ABI/minter/portfolio edits must be repaired before further deletion                | High: source diff and fresh compiler diagnostic                                          |
| 3    | Dead promo config, obsolete config fields and governance ABI entries are strong candidates | High for recorded references; final deletion requires dynamic/direct-import checks       |
| 4    | CowAMM/Xave, dormant CoW links and HyperEVM creation paths form coherent removal slices    | Medium-high: configuration and cross-file consumers; URL/data boundaries remain relevant |
| 5    | Networks, assets and dependencies require item-level evidence                              | Medium: indirect, compatibility and test consumers defeat blanket deletion               |

## Workspace and feature roots

Evidence:

- `pnpm-workspace.yaml:1` includes apps/packages; the only app manifest is
  `apps/beets-frontend-v3/package.json`. It consumes `@repo/lib` and runs its
  GraphQL client generation in build/dev.
- `packages/test` provides app/lib test configuration and Anvil/wagmi helpers.
  `packages/e2e-tests/package.json` launches Beets; `.github/workflows/checks.yml`
  runs its suites. ESLint, Prettier and TypeScript config workspaces have live
  consumers. These six supporting packages are not obsolete apps.
- Beets `app/` owns pools, swap, portfolio, stake, maBEETS, pool create, LBP,
  Loops, debug, marketing/legal, and Fly/image/Tenderly/RPC/Coingecko/wallet APIs.
- `config/projects/beets.ts:7` selects Sonic and `:17` still includes Fantom for
  stats, which is explicitly outside the required Beets network scope. LBP
  navigation is development/staging-only; `next.config.ts` redirects Loops
  in production. Both still have actual Beets implementations/routes.

Inference: single-app cleanup should preserve its test/development/operational
requirements, including hidden features. It does not imply flattening workspaces.

## Pre-P0 diff audit and fresh baseline (resolved by `c337b6fbd`)

Before P0, the dirty source tree had 22 modified unstaged files and two staged deletions.
Changes cover the minter config field and 13 network values, two gauge approval
hooks, claim/unstake orchestration, transaction unions, protocol enum/map,
portfolio rendering, ABI map and generated ABI.

Evidence:

- `contracts/abi/generated.ts` has duplicated content and an incomplete end; its
  diff is 4,607 insertions and 235 deletions, not a focused export removal.
- `useClaimAllRewardsSteps.tsx:39` and `useClaimAndUnstakeSteps.tsx:39` still read
  the removed minter-loading variable. Their helper signatures/bodies still
  require/push minter approval steps while callers omit those arguments.
- `PortfolioTableRow.tsx:98` / `:131` still calls/defines `StakingIcons` after
  deleting its imports. The JSX still uses removed `Protocol.Balancer`.
- `useClaimAllRewardsStep.tsx:55` creates mint gauge addresses; unstake reads BAL
  rewards; `batch-relayer/extensions/gauge-actions.service.ts:36` encodes
  `gaugeMint`. Removal of an approval hook does not establish minting is unused.
- `useIsPoolInitialized.ts:14` retains `isBalancerV1`; `BalancerIconCircular.tsx`
  remains on disk.

Fresh check, with installed Node 24 on PATH:

```text
tsc --project packages/lib/tsconfig.json --noEmit --incremental false --pretty false
exit 2: packages/lib/modules/web3/contracts/abi/generated.ts(14000,40):
error TS1005: '}' expected.
```

Unknown: full semantic diagnostics hidden by this parse error. The product
decision on BAL rewards is resolved: Beets has none.

## Candidate inventory

| Area                                            | Direct evidence                                                                                                                                  | Conclusion / boundary                                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `promoItems`                                    | `projects/beets.ts:121` and optional `config.types.ts:218` field; no runtime reader found                                                        | Strong removal candidate for config and exclusive types/assets; preserve live StableSurge component |
| `supportsVeBalSync`                             | References only in network values and config type                                                                                                | Strong candidate for field/value removal after final check                                          |
| `BalancerIconCircular`                          | No imports found                                                                                                                                 | Delete candidate                                                                                    |
| Public Balancer protocol/icon SVG/ICO/PNG files | No literal path references found for `images/protocols/balancer.svg` and `images/icons/balancer.{svg,ico,png}`                                   | Check constructed paths/manifests before deletion                                                   |
| CowAMM                                          | Hidden pool type/protocol and empty `cowSupportedNetworks`; code still spans `modules/cow`, creation, actions, routing, helpers and presentation | Remove coherent feature slice, not isolated ABI/files                                               |
| Xave/FX                                         | FX hidden; partner modal/enum, fee/alert branches and icon still exist                                                                           | Remove Xave-specific consumers; preserve other partners                                             |
| CoW Swap links                                  | `SwapForm.tsx:225` and `SwapSimulationError.tsx:18` use empty network list; `ChooseNetwork.tsx:23` shares field                                  | Distinct from CowAMM; audit advanced-options links before field removal                             |
| Governance ABIs                                 | Fee distributor, escrow, controller/helper and delegate-registry keys remain in `AbiMap.ts`; Reliquary directly uses Snapshot `delegateRegistry` | Keep Snapshot delegation; audit the other entries and direct imports                                |
| veBAL frontend operation/type remnants          | `GetVeBalUser` supplies `GqlVeBalLockSnapshot` and its type test                                                                                 | Audit local consumers against current Beets API; no API-server work                                 |
| API-health operation                            | `useApiHealth.ts:7` polls `GetVeBalTotalSupply` on Mainnet; `NavBar.tsx:216` calls it                                                            | Replace with a tiny Sonic data query; check success, error and initial pending states               |
| HyperEVM                                        | `useHyperEvm.ts:1` imports SDK; both pool/LBP creation modals consume hook/toggle                                                                | Remove unsupported-chain branches before SDK dependency                                             |
| Non-Sonic networks                              | 13 configs registered; wallet chains filtered by Beets config                                                                                    | Remove after tracing route/data consumers; non-Sonic dynamic routes should return 404               |
| Mainnet fallback and veBAL token                | `config/app.config.ts:41`–`:47` defaults to Mainnet; `TokensProvider.tsx:22,146` and `token.helpers.ts:16,179` import Mainnet config             | Remove/adapt before deleting Mainnet config; audit other migration defaults                         |
| Merkl claim ABI                                 | `AbiMap.ts` has `merkl.claims`; its claim-step consumer is in the cross-chain recovered-funds module                                             | Recheck after that module is removed; preserve separate Sonic Merkl reward alert                    |
| DB/Neon/Dune/cron/mainnet-RPC env declarations  | Found in `turbo.json`, no application consumer found in searched source                                                                          | Audit scripts/config/deployment use before removal                                                  |
| Slack env declaration                           | Turbo and CI declare it; no sender found in searched source                                                                                      | Check workflow consumption before removal                                                           |

## Required and indirect dependencies

- x402 packages remain, per user-confirmed wagmi compatibility. Apply the same
  peer/optional/runtime compatibility check to other apparent unused dependencies.
- `@balancer/sdk`, Balancer maths and v2/v3 protocol/relayer infrastructure serve
  Beets. Brand spelling does not establish deadness.
- `balancerV2BatchRelayerLibraryAbi` is directly imported by relayer services;
  searching only `AbiMap` is insufficient.
- `useProtocols` retains Gyro/QuantAMM consumers in pool type/detail/list UI.
- Beets landing `LandingBalancerV3Section.tsx` uses `images/misc/bal-v3.png`.
- Next config explicitly externalizes `thread-stream` / `real-require`.
- Fly API `shared.ts:45` reads `NEXT_PRIVATE_MAGPIE_API_KEY`.
- Safe manifest headers/providers remain relevant even with `isOnSafeAppList`
  false; a listing flag is not an unused-feature proof.
- Browser-extension error matchers, protocol documentation and upstream metadata
  source URLs have functional meaning beyond branding.

## URL, chain and generated-client boundaries

`pool.hooks.ts:17` reads a URL variant and optional partner config; `:29` handles
invalid variants. Beets has dynamic `[chain]/[variant]/[id]` routes. Unsupported
pool and portfolio URLs should return 404; they should not depend on deleted
network configuration or proceed into a generic data-fetch failure.

`networks.spec.ts:7` currently loops over every GraphQL chain value. Pruning
network configs requires tests for the retained frontend chain contract, not
server schema changes or removing tests until the suite passes.

Frontend `codegen.ts` consumes the remote API and local operations. Validate
these clients against the already-refactored Beets API during implementation.
Do not treat old generated enum/type coverage as an API scope requirement.

Review-time introspection of `https://api.beets-ftm-node.com/graphql` found
only `SONIC` in `GqlChain`. Its Query root lacks `veBalGetTotalSupply` and
`tokenGetTokensDynamicData`, while local `vebal.graphql`, `global.graphql` and
`pool.graphql` still request them. The schema also lacks `GqlTokenDynamicData`,
`GqlPoolFx` and `GqlPoolElement`, which local fragments still name. These are
examples, not a complete operation-validation result. The hand-maintained
`graphql-enums.ts` still includes 12 non-Sonic chains, and
`graphql-enums.spec.ts` compares its values with the generated schema exactly.

The current navbar liveness hook treats an undefined Apollo error as success,
even before a response. A small resolver query,
`query ApiHealth { protocolMetricsChain(chain: SONIC) { poolCount } }`, returned
data from the supplied endpoint during this review. It exercises application
data and has a tiny response; verify that each poll reaches the network and
that initial pending, success and failure states render correctly. No dedicated
health endpoint was found in this frontend repository.

`apps/beets-frontend-v3/.env.template` and `.env.test` still use Balancer API
URLs. `.github/workflows/checks.yml` points at a different Beets backend URL.
The current endpoint should be the frontend codegen/runtime verification target
in development and CI; externally managed production settings require their
own check. The env variable name is a legacy label, not evidence of Balancer
data use.

`config/app.config.ts` defaults unknown/omitted chains to Mainnet.
`TokensProvider.tsx` and `token.helpers.ts` import Mainnet config for veBAL BPT;
migration components also use Mainnet defaults. These paths block simple
deletion of Mainnet config. The cross-chain recovered-funds provider is mounted
in `Portfolio.tsx`, but its Merkl claim module lists only Mainnet, Arbitrum,
Base, Polygon and Optimism. Sonic's separate Merkl rewards alert links to the
Merkl site and does not use the `merkl.claims` ABI. Do not describe the
cross-chain recovered-funds module as a Sonic recovery feature.

Beets wagmi config emits `abi/beets/generated.ts`, not the legacy
`abi/generated.ts`; document and respect their different generation ownership.

## Limits and next step

### Sonic ABI generator addition

Evidence: `apps/beets-frontend-v3/wagmi.config.ts` already configures explorer
chain 146 and emits `abi/beets/generated.ts`. It declares a standard ERC20 ABI
and seven contracts: SonicStaking, SFC, SonicStakingWithdrawRequestHelper,
Reliquary, BeetsV2BatchRelayerLibrary, MagpieLoopedSonicRouter and LoopedSonicVault.
Six addresses come from Sonic config; the v2 relayer-library address is literal.
This is not yet a unified source for retained legacy Balancer protocol ABIs.

User direction: constrain generation to contracts needed by Beets on Sonic.
For Balancer v3, inspect each deployment task's `output/sonic.json` under
[beethovenxfi/balancer-deployments](https://github.com/beethovenxfi/balancer-deployments/tree/master/v3/tasks).
Candidates without that output must appear as explanatory comments in the
generator rather than active entries. Existence alone does not prove frontend
use, and absence in a v3 directory says nothing about required v2/native contracts.

A read-only inventory was pinned to upstream revision
[`e22e291596a20d4cda1038357918c7541ffc8dcc`](https://github.com/beethovenxfi/balancer-deployments/tree/e22e291596a20d4cda1038357918c7541ffc8dcc)
(2026-06-02, “add lbp v4 to sonic”). The following tasks had Sonic output files:

- Vault and VaultAdmin:
  [`20241204-v3-vault/output/sonic.json`](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20241204-v3-vault/output/sonic.json)
- BatchRouter:
  [`20241205-v3-batch-router/output/sonic.json`](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20241205-v3-batch-router/output/sonic.json)
- Router v2:
  [`20250307-v3-router-v2/output/sonic.json`](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20250307-v3-router-v2/output/sonic.json)
- Composite liquidity router v2:
  [`20250123-v3-composite-liquidity-router-v2/output/sonic.json`](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20250123-v3-composite-liquidity-router-v2/output/sonic.json)
- StableSurge hook v2:
  [`20250403-v3-stable-surge-hook-v2/output/sonic.json`](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20250403-v3-stable-surge-hook-v2/output/sonic.json)
- VaultExplorer v2:
  [`20250407-v3-vault-explorer-v2/output/sonic.json`](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20250407-v3-vault-explorer-v2/output/sonic.json)
- Unbalanced add router:
  [`20251010-v3-unbalanced-add-via-swap-router/output/sonic.json`](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20251010-v3-unbalanced-add-via-swap-router/output/sonic.json)
- Factories: [Weighted pool v2](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20260115-v3-weighted-pool-v2/output/sonic.json), [Stable pool v3](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20260116-v3-stable-pool-v3/output/sonic.json), [StableSurge pool factory v3](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20260117-v3-stable-surge-pool-factory-v3/output/sonic.json), [Gyro ECLP v2](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20260126-v3-gyro-eclp-v2/output/sonic.json), [fixed-price LBP](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20251205-v3-fixed-price-lbp/output/sonic.json), and [LBP v4](https://github.com/beethovenxfi/balancer-deployments/blob/e22e291596a20d4cda1038357918c7541ffc8dcc/v3/tasks/20260501-v3-liquidity-bootstrapping-pool-v4/output/sonic.json).

No Sonic output file was found for these tasks at that revision; they are
comment-only candidates in the generator unless new evidence changes the result:
`20250321-v3-vault-factory-v2`, `20250507-v3-aggregator-batch-router`,
`20251010-v3-composite-liquidity-router-v3`,
`20251010-v3-prepaid-composite-liquidity-router-v3`, and
`20260209-v3-gyro-eclp-oracle`.

Deployment output proves a published Sonic address at that revision, not that
the Beets frontend needs an ABI. Local consumers remain the inclusion gate. The
task tree is specifically Balancer v3 evidence; required v2 relayer, Beets native
staking/SFC, Reliquary and Loops contracts need their own source checks.

The plan now includes consumer-to-deployment mapping, source revision evidence,
SDK/config address comparison, legacy import migration and generation/encoding
checks. No generation or application-code modification has been performed here.

### Verification limits

No full runtime dataset/dynamic graph audit, fresh lint/unit/build/browser run,
live branch-protection lookup or external link/deployment audit was performed.
The compiler failure is verified; broader pass/fail claims would be premature.
The source candidates above require the per-item checks in the
[updated plan](./balancer-beets-cleanup-plan.md).

Both docs are locally present but ignored by `/home/groninge/.gitignore_global:5`.
They need explicit inclusion if committed later. This turn stages nothing.

## P1 inventory results — 2026-09-28

P1 reviewed the committed P0 tree (`c337b6fbd`), Beets app routes and providers,
shared runtime imports, GraphQL documents/generated-client references, ABI map,
workspace scripts and manifests, CI, environment templates, tests, fonts, and
public asset paths. The inventory is source based; a candidate is not marked
unused when a dynamic path, disabled caller, shared consumer, or deployment
configuration still needs examination.

### Candidate disposition

| Disposition                                                | Candidates and evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Planned pass / boundary                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proven unused by current source references                 | `promoItems` has no runtime reader; `supportsVeBalSync` occurs only in network values and its type; `BalancerIconCircular` has no imports; `GetTokensDynamicData`, `GetPoolTokensDynamicData`, `GetProtocolStatsPerChain`, and `CreateLBP` have no runtime `Document` caller; `GetVeBalUser` has only derived-type/type-test references and no runtime caller. These are candidates for removal, with any type-only references removed alongside them.                                                                                                                           | P2 for config/component candidates; P4 for GraphQL/type candidates. “No caller” is limited to this repository snapshot.                                                                                                                                                                   |
| Active or disabled branches that need caller removal first | BAL minter/reward path was completed in P0. CowAMM creation/actions, Xave/FX branches, and CoW Swap links still have code/config callers. Cross-chain recovered-funds UI is mounted, while its supported chain set excludes Sonic. `/loops` is production-redirected but has an implementation and development/staging route; LBP creation is linked in non-production config. Dynamic pool/portfolio routes take chain slugs and currently rely on shared chain configuration.                                                                                                  | P3 removes CowAMM/Xave/dormant CoW branches with callers. P4/P5 handle cross-chain recovery and API/schema/client changes. P5 handles route 404 behavior and chain configs. Retain Loops/LBP/create unless the Beets feature boundary changes.                                            |
| Unresolved indirect or operational dependency              | Public chain images are referenced through network config and constructed `/images/chains/${network}.svg` paths. App fonts are loaded through `next/font/local`. `PartnerRedirectModal` and Reliquary stats construct image paths from directories. Non-Sonic icons, protocol/partner galleries, homepage imagery, sound files, manifests, RPC/API routes, and env secrets therefore need item-level path or deployment checks. Manifest, E2E, codegen, test, and CI API URLs are not consistent. Dependencies without direct app imports are not deletable on that basis alone. | Resolve after caller removal and direct/dynamic URL checks in P3/P5/P6. Keep x402 compatibility packages; keep Balancer SDK/math/relayer packages with current Beets consumers. Do not remove CI secrets or env declarations until external deployment/workflow ownership is established. |
| Retained by direct Beets use                               | Pool, swap, portfolio, gauge claim/unstake, pool creation, LBP, maBEETS/Reliquary, Loops, marketing/legal, and operational API routes are implemented under the only app. App shell imports shared `@repo/lib`; root/app scripts and CI use `@repo/test`, `@repo/e2e-tests`, and shared lint/format/type configs. Satoshi font is loaded by app layout. `beetsV2BatchRelayerLibraryAbi` remains used by shared and Reliquary services; Beets native Sonic staking/SFC/Reliquary/Loops ABIs are imported by app code.                                                             | Preserve while these routes and transaction flows remain in scope.                                                                                                                                                                                                                        |

### Current Beets GraphQL schema comparison

The live endpoint `https://api.beets-ftm-node.com/graphql` returned an
introspection schema on 2026-09-28. The schema's `GqlChain` enum contains only
`SONIC`. Validation used the GraphQL library against all 12 local `.graphql`
documents combined (21 operations and 8 fragments), matching Codegen's
cross-document fragment resolution. Validation reported 27 schema errors;
this supersedes the earlier illustrative mismatch list above:

| Document                 | Current-schema incompatibilities                                                                                                                                                                                                                                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.graphql`         | `tokenGetTokensDynamicData` query field is absent.                                                                                                                                                                                                                                                                                 |
| `pool-tokens.graphql`    | `GqlPoolTokenDetail` lacks `priority`, `tradable`, `hasNestedPool`, `nestedPool`, and `isBufferAllowed`.                                                                                                                                                                                                                           |
| `pool.graphql`           | `GqlPoolAprItem.title`, `GqlPoolDynamicData.surplus24h`, `GqlPoolBase.hasNestedErc4626` and `owner`, `GqlPoolSnapshot.surplus24h`, and `GqlPoolSwapEventCowAmm.surplus` are absent. Types `GqlPoolElement`, `GqlPoolFx`, and `GqlPoolMetaStable` are absent. It also requests `tokenGetTokensDynamicData` / `GqlTokenDynamicData`. |
| `pools.graphql`          | `GqlPoolBase`/`GqlPoolMinimal.hasNestedErc4626`, `GqlPoolDynamicData.swapsCount`, `GqlPoolAprItem.title`, and `GqlPoolBase`/`GqlPoolMinimal.owner` are absent.                                                                                                                                                                     |
| `protocol-stats.graphql` | `surplus24h` is absent from both aggregated and chain protocol metrics.                                                                                                                                                                                                                                                            |
| `swap.graphql`           | `GqlTokenDynamicData` is not in the current schema.                                                                                                                                                                                                                                                                                |
| `vebal.graphql`          | Query fields `veBalGetUser` and `veBalGetTotalSupply` are absent.                                                                                                                                                                                                                                                                  |

The other local documents validate against the fetched schema. Of the
schema-invalid operations, `GetVeBalTotalSupply` is still called by
`useApiHealth`; it cannot simply be removed without replacing that health probe.
Other currently used operations include global polling, pool/token reads,
featured pools, pool events/snapshots, protocol stats, LBP charts, Reliquary
snapshots, Sonic staking data, Loops data, and swap paths. Before codegen/build,
repair every retained operation against this endpoint and remove only the
unused operations/types listed in the disposition table. This frontend task
does not modify the GraphQL server.

`NEXT_PUBLIC_BALANCER_API_URL` remains the shared runtime/codegen variable, but
the checked-in values disagree: frontend/lib/test templates point at Balancer
APIs; CI points at `https://backend-v3.beets-ftm-node.com/`; tests and the E2E
LBP helper contain the old backend URL; the intended target is
`https://api.beets-ftm-node.com/graphql`. Update the in-scope development and
CI values in the endpoint/client pass. Production deployment variables are
externally managed and remain unresolved here.

### Runtime, ABI, assets, and tooling boundaries

- The app root and `(app)`/`(marketing)` layouts compose Beets providers and
  `BaseLayout`. Active routes include marketing/legal pages; pool list/detail and
  add/remove/stake/unstake/swap/migrate; portfolio; swap; stake; maBEETS;
  pool/LBP creation; Loops; and debug. API routes include RPC, Coingecko, wallet
  check, Tenderly, image proxy, and Fly quote/transaction. These are retained
  until a specific route/function is classified as unnecessary.
- Beets uses only Sonic in `supportedNetworks`, but
  `networksForProtocolStats` still includes Fantom. Shared `ChainConfig` and
  `networks/index.ts` still instantiate all chain configs, and
  `app.config.ts` still falls back to Mainnet. These are live shared dependencies
  that require the P5 caller/route changes before config deletion.
- `AbiMap`'s v2 vault, gauge V5, and relayer V6 entries have active pool and
  Reliquary consumers. Snapshot `delegateRegistry` has active Reliquary
  delegation consumers. `merkl.claims` is used by the cross-chain recovered
  funds feature, which has no Sonic claim configuration; remove that ABI only
  after deleting that feature. Other governance entries in `AbiMap` have no
  runtime consumer found by the exact-key scan and are P4 audit candidates.
  The ABI cleanup must include codegen-owned Beets ABIs separately from the
  legacy shared `abi/generated.ts` artifact.
- App-local Balancer V3 landing artwork (`misc/bal-v3.png`) is referenced by
  Beets landing code; Beets logo, Sonic logo/chain art, Satoshi fonts, LBP and
  StableSurge art, Reliquary art, service/partner pages and app manifests have
  direct or constructed consumers. Balancer-name imagery without direct matches
  remains a candidate only after searching constructed project/protocol paths.
- Root scripts still use Turbo workspace commands. The single Beets app runs
  GraphQL codegen in dev/build and has an app-local `gen:wagmi` script. CI runs
  Beets E2E suites; `packages/test`, `packages/e2e-tests`, `@repo/lib`, and shared
  lint/format/type packages have direct workspace consumers. This is not grounds
  to remove supporting workspaces.

### P1 exit

P1 is complete as an inventory and classification step. No application code was
changed in P1. P2 is the next implementation pass; GraphQL compatibility and
endpoint values must be corrected in their planned later pass before running
codegen/build against the live Beets API. The existing P0 commit remains
`c337b6fbd`.

## P2 implementation result — 2026-09-28

Removed the unread `ProjectConfig.promoItems` field and `PromoItem` type, the
Beets promo data, its exclusive banner backgrounds and unused promo icon
components. The separate `BeetsPromoBanner` and `StableSurgePromoBanner` remain;
`PoolHookBanner` still renders the StableSurge banner for that hook. Removed
`NetworkConfig.supportsVeBalSync` and its remaining values after confirming no
runtime reader. Removed the unimported `BalancerIconCircular` component.

Project dispatch and other active fields remain: `PROJECT_CONFIG.projectId` is
read by recent-transactions storage, Safe links, and the staking options UI;
`networksForProtocolStats` is read by the global API provider and is scheduled
for Sonic narrowing in P5. `cowSupportedNetworks`, partner/variant config and
related readers remain in the P3 scope.

Checks: library and Beets app typechecks passed; the project config unit suite
passed (3 tests); targeted ESLint and `git diff --check` passed. Source searches
found no remaining code references to the removed promo config/type/assets,
promo icon components, veBAL sync field, or Balancer circular icon. The docs
remain globally ignored and were not staged. P2 is complete.

## P3 implementation evidence — 2026-09-28

P3 removed CowAMM UI/actions/creation branches, Xave/FX code, CoW Swap paths,
their exclusive assets and fixtures, and the partner redirect modal after
confirming it had no remaining callers. The shared Playwright pool-creation
helper and build-call tests no longer model CowAMM. `hideProtocolVersion` was
removed after its only Beets value became empty. Pool detail route tests cover
rejecting CowAMM, FX, Element, and unsupported variant routes while preserving
v2/v3, Gyro, and QuantAMM routes.

`GqlPoolElement` remains a derived union member used by generic pool risk logic
and test fixtures. Removing the `GqlPoolElement`/`GqlPoolFx` inline fragments
from source GraphQL documents does not require deleting this shared type. Local
generated artifacts are ignored and were refreshed against the checked-in
legacy schema; validating/regenerating against the Beets API is part of P4,
together with endpoint alignment and the API liveness operation. The former
`PartnerRedirectModal` had no remaining callers after Xave redirects were
removed, so no other active partner redirect exists.

Validation: library typecheck, Beets app TypeScript check, library lint, and five
targeted Vitest files passed (62 passed, 23 skipped). The docs remain globally
ignored and were not staged. P3 is complete; P4 is next.
