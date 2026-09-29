# Plan: Beets-only repository cleanup

## Current objective and execution plan — 2026-09-28

**This section supersedes conflicting instructions and status claims in the
historical branding plan below.** Separate investigation:
[beets-only-investigation.md](./beets-only-investigation.md).

The goal is to run and maintain exactly one app: `apps/beets-frontend-v3`.
Everything outside its runtime, development, build, test and operational needs
is eligible for removal. Judge dependencies by their consumers and compatibility
requirements, not by whether their name contains `balancer` or `beets`.

**Execution status:** P0 was completed and committed as `c337b6fbd`
(`refactor: remove BAL mint reward flow`). P1's app/dependency/schema inventory,
P2's dead config/project scaffolding pass, P3's CowAMM/Xave cleanup, P4's
governance/reward/ABI pass, P5's Sonic-only chain implementation, and P6's
dependencies/assets/plumbing pass, P7 Sentry removal, and P8 final verification
are complete. P8's local E2E run remains explicitly excluded by user direction;
remote E2E/backend issues are tracked separately.

### Scope and retained contracts

- The repository already contains only one app. All six supporting workspaces
  have app, test or tooling consumers: `lib`, `test`, `e2e-tests`, `eslint-config`,
  `prettier-config`, `typescript-config`. Audit their contents; do not delete or
  flatten these packages just because there is one app.
- Preserve pools, swaps, portfolio, v2/v3 liquidity/gauge operations, Sonic
  staking, maBEETS/Reliquary, pool recovery mode, pool creation, LBP and Loops.
  LBP and Loops have development/staging surfaces; hidden production navigation
  does not make their code unused.
- Preserve required API routes/providers, wallet and Safe support, monitoring,
  code generation and verification infrastructure.
- Sonic is the only supported Beets network. Remove Fantom protocol statistics
  and all other network support. Non-Sonic dynamic routes should return 404;
  remove legacy cross-chain recovery paths before deleting their configs.
- Keep Balancer SDK/math/relayer/vault dependencies serving Beets, and retain
  Gyro/QuantAMM protocol indicators. Keep `PROJECT_CONFIG` for project-specific
  values in shared code; obsolete fields are now within the cleanup scope.
- **Keep all four x402 packages.** User confirmed they satisfy wagmi compatibility
  requirements. Lack of direct application imports is not evidence of deadness.
- **The GraphQL API server refactor is out of scope.** User confirmed that API
  has already been refactored to Beets-only. The current endpoint is in scope as
  a read-only source for frontend reachability and client compatibility; do not
  change its server/schema in this cleanup.
- No new dependencies, external settings changes or application-code edits in
  this investigation turn. Existing source changes remain preserved.

### Pre-P0 baseline (resolved by commit `c337b6fbd`)

Fresh command, with the installed Node 24 directory on PATH:

```sh
./node_modules/.bin/tsc --project packages/lib/tsconfig.json --noEmit --incremental false --pretty false
```

Result: exit 2, `contracts/abi/generated.ts(14000,40): TS1005: '}' expected`.
This parse failure masks subsequent semantic diagnostics; the tree is not green.

The current diff contains 22 unstaged modified files and two staged hook
deletions. In addition to the corrupt/duplicated ABI:

- Both claim/unstake orchestration files still read
  `isLoadingMinterApprovalStep`; their helper signatures/bodies still require
  and push minter steps even though their callers no longer provide them.
- `PortfolioTableRow.tsx` still calls and defines `StakingIcons`, referencing
  removed `getCanStake`, `ProtocolIcon`, and `Protocol` imports. The enum member
  `Protocol.Balancer` is removed but its JSX consumer remains.
- Approval removal has not removed minting: `useClaimAllRewardsStep.tsx` still
  passes `mintBalRewardGauges`, unstake reads BAL rewards, and the relayer service
  still encodes `gaugeMint`. The user confirmed Beets has no BAL rewards; remove
  the complete BAL mint path while preserving ordinary Sonic gauge claims.
- `isBalancerV1`, `BalancerIconCircular` and candidate Balancer public icons remain.
- Minter values were removed from 13 concrete network configs, not 14.

The five commits listed in the historical status section are present. Its
historical green-test claims have not been independently reverified here.

### Ordered implementation passes

Each pass has one writer and a separate reviewer. Add regression tests for
affected retained behavior when coverage is missing before deleting code. Keep
diffs focused; preserve all unrelated staged/unstaged work.

| Pass                                    | Work and concrete targets                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Exit criteria                                                                                                                                                                                                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0: repair baseline                     | Reconstruct only `contracts/abi/generated.ts` from known HEAD content and reapply justified symbol-bounded edits. Finish claim/unstake helper/loading/nested-step changes and portfolio indicator removal. Trace and remove the complete BAL mint path (`useBalTokenRewards`, claim call data, `GaugeActionsService.encodeMint`) while keeping Sonic gauge claims.                                                                                                                                                                                                      | ABI parses with unique exports; no stale deleted symbols or BAL mint transactions; batched/non-batched claim and unstake, loading and retained portfolio states have passing coverage; typecheck/lint/unit baseline recorded.                                         |
| P1: dependency inventory                | Start from Beets pages/layouts/route handlers/providers, app-local modules, Next config, scripts, CI and tests. Include direct/dynamic imports, ABI keys, CSS/fonts, string-built asset URLs, manifests and generated-client consumers. Compare every frontend GraphQL operation/fragment and runtime enum with the current Beets schema; inventory local and CI API URLs. Record evidence and validation for each deletion.                                                                                                                                            | Every proposed deletion is classified as proven unused, disabled branch needing caller changes, or unresolved dependency. Frontend schema and endpoint mismatches are listed before codegen/build; no deletion justified solely by absent literal imports.            |
| P2: dead config and project scaffolding | Remove unused `promoItems` and exclusively owned types/assets; audit `supportsVeBalSync`, project dispatch and obsolete config fields. Remove unreferenced `BalancerIconCircular`. `variantConfig`/partner fields with readers belong with P3.                                                                                                                                                                                                                                                                                                                          | No dangling field/import consumers; landing page/navigation and live StableSurge promo still work; project values remain in `PROJECT_CONFIG`.                                                                                                                         |
| P3: CowAMM, Xave and dormant links      | Remove CowAMM module/create/action/classifier/variant branches and exclusive assets/fixtures; remove Xave-specific redirects, FX fee/alert code and icon. Remove stale `GqlPoolFx`/`GqlPoolElement` fragments after checking consumers; the current Beets schema omits both types. Remove CoW Swap branches and empty `cowSupportedNetworks` config.                                                                                                                                                                                                                    | Retained v2/v3 and Gyro/QuantAMM flows pass; pool detail routes reject unsupported type/variant data. Remove the partner redirect modal after verifying it has no active callers; no remaining redirect surface is claimed as retained.                               |
| P4: governance/reward/ABI remnants      | Keep Snapshot `delegateRegistry` used by maBEETS Reliquary delegation. Remove other unconsumed governance/veBAL ABI and Mainnet token branches after import checks; audit BAL-specific stake-migration copy without removing useful Sonic gauge migration. Remove stale veBAL and token-dynamic GraphQL operations/fragments; replace navbar health query with `protocolMetricsChain(chain: SONIC) { poolCount }`. Align frontend codegen and development/CI API URLs to the Beets endpoint.                                                                            | Reliquary delegation, ordinary gauge claims and API health work; the health poll reports success only after a real response and failure on API errors; all retained operations validate and generation/build use the current endpoint. API server refactor untouched. |
| P5: Sonic-only chain implementation     | Narrow project stats to Sonic; make dynamic pool/portfolio routes return 404 for non-Sonic chains. Replace Mainnet defaults/fallbacks in `config/app.config.ts` and migration flows, then remove other chain configs, RPC maps, chain objects, icons, fixtures and HyperEVM creation/dependency. Trim `GqlChainValues` and its tests to the regenerated schema. Remove cross-chain recovered-funds UI/provider/claims and non-Sonic signature registry config; remove the Merkl claim ABI if it has no remaining consumer, while keeping the Sonic Merkl rewards alert. | Only Sonic is selectable and accepted by app routes/data flows; non-Sonic direct URLs return 404; no Mainnet config import or fallback remains; Sonic pools, portfolio/gauge claims, pool recovery mode, stats, LBP and fork tests pass.                              |
| P6: dependencies/assets/plumbing        | Audit manifests after feature cuts and regenerate the lockfile through pnpm. Keep x402 compatibility packages and config-owned dependencies. Audit stale DB/Neon/Dune/cron/mainnet-RPC/Slack declarations in Turbo/CI. Audit public assets including constructed URLs. Finish evidence-backed documentation/link cleanup.                                                                                                                                                                                                                                               | Frozen-lockfile install/build succeed, retained scripts resolve, no missing assets/config modules, compatibility dependencies preserved.                                                                                                                              |
| P7: remove Sentry integration           | Remove Sentry SDK/runtime capture, user/network tags, Sentry-only test setup/helpers, workspace and CI/Turbo env plumbing, Renovate grouping, and any Beets-only Sentry asset/config. Replace Sentry-specific React Query metadata with app-owned error metadata where needed. Preserve user-facing error boundaries, expected-error suppression, pool-surge filtering, decoded contract diagnostics, and Tenderly links. Do not add another telemetry vendor.                                                                                                          | No Sentry package or runtime/config reference remains in the Beets app/workspaces; wallet, transaction, query error filtering, Tenderly diagnostics, and error-boundary behavior remain covered by focused tests; frozen-lockfile install and typecheck pass.         |
| P8: final verification/review           | Run targeted regressions per slice, full checks below, route/API smoke checks and independent deletion review.                                                                                                                                                                                                                                                                                                                                                                                                                                                          | One Beets app builds/runs; remaining candidates have concrete retention reasons; failures/external verification gaps are explicit.                                                                                                                                    |

## P3 implementation result — 2026-09-28

Removed CowAMM creation, routing, detail/action, chart, swap, and partner UI
branches; CowAMM-only fixtures/assets/sounds and stale Xave/FX branches; and
the no-caller partner redirect modal. The Beets protocol-version filter no
longer carries an empty hide-list config. Added detail-route regression
coverage for unsupported CowAMM/FX/Element pool types and invalid variants,
while retaining v2/v3, Gyro, and QuantAMM routing. Removed the matching CoW
creation scenarios from the shared Playwright helper and pool-creation tests.

The live Beets API schema/codegen endpoint alignment remains P4. Local generated
artifacts are ignored; they were refreshed against the checked-in schema after
removing stale source-document fragments. The retained `GqlPoolElement` derived
alias and fixtures are still used by generic pool, risk, and test infrastructure;
removing them requires a schema/client consumer migration, not just fragment
removal. `PartnerRedirectModal` had no remaining callers once the FX/Xave readers
were removed, so there is no other active partner redirect to preserve.

Checks: library and Beets app typechecks passed; five focused pool/create test
files passed (62 passed, 23 skipped); library lint passed. The independent
review's actionable CoW test/helper findings were addressed. P3 is complete;
P4 is next.

## P4 implementation result — 2026-09-29

The Beets endpoint, Sonic health operation, and development/test/CI URLs were
already aligned in the branch. Updated the shared health query to use
`PROJECT_CONFIG.defaultNetwork`; the hook now distinguishes initial pending
from a confirmed outage, treats an actual response as healthy even when its
pool count is zero, and reports API errors as unhealthy. The navbar only shows
the outage alert for a confirmed unhealthy state. Added coverage for pending,
success, initial error, and error after prior successful data.

Removed the unused `GetProtocolStatsPerChain` operation and the dormant veBAL
portfolio sort identifier. Import and operation audits found no direct veBAL
token imports, Mainnet token branches, veBAL operations, or unused governance
ABIs remaining; Snapshot `delegateRegistry` remains for Reliquary delegation,
and generated ABIs remain for retained Beets flows. Ordinary Sonic gauge claims
and BAL-mint removal were not changed. The API server remains untouched.

Checks: GraphQL codegen against `https://api.beets-ftm-node.com/graphql` passed;
the health and GraphQL-enum specs passed (5 tests); `@repo/lib` typecheck,
targeted ESLint, Prettier, and `git diff --check` passed. Independent review
approved the changes with no remaining findings. P4 is complete; P5 is next.

## P5 implementation result — 2026-09-29

Removed non-Sonic chain configuration and narrowed frontend routing/data paths
to Sonic, with dynamic non-Sonic pool and portfolio routes returning 404. The
P5 changes were committed as `32d0b2501`. See that commit for its implementation
and focused verification record. Remote E2E checks have separately reported
API preflight/CORS failures; those require a fix in the API service and are not
claimed as passing frontend verification here.

## P6 implementation result — 2026-09-29

Audited workspace manifests and retained all four `@x402/*` compatibility
dependencies; no other package removal was supported by consumer evidence. No
public asset was safe to delete: remaining assets have static, dynamic, or
metadata consumers. Removed unused Slack, Dune, cron, Mainnet RPC, and
database/Neon environment passthroughs from Turbo and removed the unused Slack
secret injection from CI. Updated the stale integration-testing note and
Sonic-only E2E pool-creation fallback labels.

The lockfile already had an uncommitted pnpm-generated `@noble/hashes` change
when P6 began. It is retained pending frozen-lockfile verification rather than
being silently discarded. P6 is complete; P7 Sentry removal followed.

## P8 verification and link audit — 2026-09-29

- Independent deletion review found no material accidental removal or missing
  non-Beets runtime path. Removed the stale `GqlVotingPool` Apollo cache policy
  and repointed repository-owned README and risks-page links.
- Repointed live Beets footer/review links and all runtime metadata fetches from
  Balancer GitHub to Beethoven X. Verified the `metadata`, `code-review`,
  `scaffold-balancer-v3`, and `tokenlists` mirrors have matching upstream Git
  tree hashes. All six repointed metadata JSON URLs returned HTTP 200. Test
  fixture token-image URLs use the same mirror. Remaining Balancer GitHub URLs
  are upstream references in comments only.
- Typecheck and lint passed. The production Beets build passed with live API
  codegen and generated all 22 static pages. The locked root Vitest binary
  passed 94 library files/482 tests and 6 app files/42 tests; a focused run
  after URL changes passed 3 files/8 tests. `pnpm test:unit` itself failed
  locally because the package Vitest shim still points to 5.0.0 while the
  installed root/lockfile version is 5.0.2. This is a local install-layout
  issue, not a failing test assertion.
- The API liveness query returned Sonic `poolCount`. Built-app smoke checks
  returned 200 for the homepage, pools, portfolio, and Sonic detail routes;
  unsupported network routes rendered the Next.js 404 page (streamed
  `notFound()` can still return HTTP 200). Local E2E was not run per user
  instruction. Remote E2E and API-server failures are not claimed fixed here.

### Important dependencies and removal boundaries

#### Sonic-only wagmi ABI generation (added requirement, part of P4)

Update `apps/beets-frontend-v3/wagmi.config.ts` as the reproducible generation
entrypoint for contracts actually required by Beets on Sonic (chain 146).
The current config already targets Sonic but covers seven explorer contracts
plus the standard ERC20 ABI; legacy protocol ABIs still have separate ownership.

- Inventory retained ABI consumers first, including direct imports and `AbiMap`,
  and map each to contract name, generation source, Sonic address, deployment task
  and retained Beets use. Preserve standard interface ABIs such as ERC20 where
  consumed; an interface has no unique deployment address.
- For Balancer v3 contracts, use
  [Beets balancer-deployments v3 tasks](https://github.com/beethovenxfi/balancer-deployments/tree/master/v3/tasks):
  `v3/tasks/<task>/output/sonic.json` is the deployment evidence. Record the task
  and revision used. The separate investigation checked revision
  `e22e291596a20d4cda1038357918c7541ffc8dcc` (2026-06-02). It found Sonic output
  for the v3 vault, batch router, router v2, composite liquidity router v2,
  StableSurge hook v2, VaultExplorer v2, UnbalancedAddViaSwapRouter, and current
  Weighted, Stable, StableSurge, Gyro ECLP, fixed price LBP and LBP v4 factories.
  Linked task outputs are recorded in `beets-only-investigation.md`. A deployment
  existing does not mean the frontend needs it; include only contracts with
  retained Beets consumers.
- If a candidate task lacks `output/sonic.json`, leave the contract/task and
  reason as a comment **in `wagmi.config.ts`**, excluded from active generation.
  Do not substitute another chain's address, a zero address, or an unsupported
  guessed deployment. At the inspected revision, missing outputs were confirmed
  for `20250321-v3-vault-factory-v2`, `20250507-v3-aggregator-batch-router`,
  `20251010-v3-composite-liquidity-router-v3`,
  `20251010-v3-prepaid-composite-liquidity-router-v3`, and
  `20260209-v3-gyro-eclp-oracle`. Missing output is a probable non-use signal,
  not proof: explicitly resolve any conflicting retained runtime consumer.
- Compare deployed v3 addresses against `config/networks/sonic.ts` and its SDK
  `AddressProvider` values before changing generation/import ownership. Preserve
  required ABI extensions/function signatures; do not duplicate SDK ABIs merely
  to generate every deployed contract.
- The v3 task directory is not authoritative for Beets-native staking/SFC,
  Reliquary, Loops, or v2 contracts. Verify their Sonic sources independently;
  do not drop required v2/reliquary relayer support because it is absent in v3.
- Migrate retained legacy ABI imports to their documented generation or SDK
  source before deleting legacy output. Keep generated symbols consistent with
  their consumers and remove obsolete outputs only after imports move.

**Acceptance:** the active generator has only required Sonic contract entries
and consumed standard interfaces; all v3 deployment-backed entries have checked
Sonic task evidence; unresolved missing-output candidates are commented in the
script with reasons. Run `pnpm --filter beets-frontend-v3 gen:wagmi`, inspect its
output for unexpected networks/contracts, typecheck, and run affected transaction
encoding/integration tests. Repeat generation to verify no unexplained artifact
churn. Record explorer/API-key limitations rather than claiming generation passed.

#### Other boundaries

- `PoolLayout` receives the user-provided `[chain]` slug. Non-Sonic pool and
  portfolio URLs should return 404; they must not proceed into removed
  chain-specific configuration or data paths. Validate returned pool
  type/variant before enrichment so unsupported CowAMM/FX records cannot reach
  actions.
- When CowAMM initialization is removed, delete its `isBalancerV1` branch rather
  than making a separate cosmetic rename first.
- The live endpoint `https://api.beets-ftm-node.com/graphql` exposes only
  `SONIC` in `GqlChain` and omits `veBalGetTotalSupply`; current `useApiHealth`
  polls that unsupported field from the navbar. Replace it with a tiny Beets
  resolver query selecting `protocolMetricsChain(chain: SONIC) { poolCount }`,
  which returned data at review time. Poll over the network,
  distinguish initial pending from confirmed failure, and cover success/error
  behavior. A `__typename` query would only prove that GraphQL responds, not
  that an application data resolver works. `GetVeBalUser` has only type-level
  local consumers and can be removed during client regeneration.
- Do not limit GraphQL migration to veBAL. At review time the endpoint also
  lacked `tokenGetTokensDynamicData`, `GqlTokenDynamicData`, `GqlPoolFx` and
  `GqlPoolElement`, all still named in frontend `.graphql` files. Validate all
  retained documents against the current schema before accepting codegen.
  `apps/beets-frontend-v3/.env.template` and `.env.test` still point to old
  Balancer APIs; `.github/workflows/checks.yml` uses a different Beets backend
  URL. Audit and align frontend development, test and CI settings with the
  supplied endpoint, and record any external deployment setting that cannot be
  verified locally. Keep the legacy env variable name if renaming it has no
  independent value.
- Keep live v2 vault/relayer/gauge, Beets staking/Reliquary/Loops and Permit2
  ABIs. Recheck the Merkl claim ABI after removing cross-chain recovered-funds
  claims: the Sonic Merkl alert links to Merkl externally and does not use that
  ABI. `balancerV2BatchRelayerLibraryAbi` has direct service imports outside
  `AbiMap`; map-only analysis is incomplete.
- Beets wagmi generation owns `abi/beets/generated.ts`, not legacy
  `abi/generated.ts`. Document ownership and use source-level generation changes
  where applicable; do not add post-generation branding patches.
- `networks.spec.ts` currently expects every locally generated GraphQL enum
  chain to have a config. Regenerate the frontend client against the current
  endpoint, trim the hand-maintained `graphql-enums.ts` values and its exact
  schema test, then test Sonic-only config and 404 behavior; do not modify the
  API server schema. `config/app.config.ts` currently falls back to Mainnet for
  missing chains, and `TokensProvider.tsx`/`token.helpers.ts` directly import
  the Mainnet config for veBAL BPT. These consumers must be removed or adapted
  before Mainnet config deletion.
- `PortfolioProvider` filters pools to configured networks, but its recovered
  funds hook still asks Merkl for Mainnet, Arbitrum, Base, Polygon and Optimism.
  Remove this cross-chain frontend flow, including its provider, claims ABI,
  per-chain signature registry contracts and UI, after final consumer checks.
  It is distinct from Sonic Merkl reward discovery and from pool recovery mode.
- `images/misc/bal-v3.png` is used by Beets' landing page. Other Balancer icons
  are candidates only after checking metadata and computed paths.
- `thread-stream` and `real-require` appear in Next `serverExternalPackages`;
  `NEXT_PRIVATE_MAGPIE_API_KEY` is consumed by the Fly API. Preserve them.

### Verification and stop condition

Run targeted tests for each changed retained behavior, then:

```sh
pnpm typecheck
pnpm lint
pnpm test:unit
pnpm --filter e2e-tests typecheck
pnpm --filter beets-frontend-v3 build
pnpm test:e2e:build
pnpm test:e2e:dev
```

For a single affected integration spec:

```sh
pnpm --filter @repo/lib exec vitest run -c ./vitest.config.integration.ts <relative-spec-path>
```

Run the relevant integration flows and full configured suite when fork/RPC
prerequisites are available. Check changed-file formatting, diff whitespace,
deleted-symbol/old-app references, dependency/ABI inventories and dynamic asset
usage. No dedicated unused-code tool is configured; do not add a dependency for
this cleanup. Inspect built routes and smoke retained app/API flows, including
dev/staging-only behavior. Read local Next docs before implementing Next changes.

Stop when the retained Beets app and verification contract pass, all planned
removals are reviewed, and unresolved candidates have explicit reasons to remain.
Report missing network/credentials as verification gaps, never as passing checks.
Do not open a throwaway PR or modify branch protection as a verification shortcut.

### Prior decisions that still apply

- Keep the E2E `beets/` directories; only filenames/scripts lose qualifiers.
- CI job/artifact renames remain a separate coordinated follow-up. Inspect live
  required-check rules then; historical protection records below are unverified.
- Root name remains `@beethovenxfi/frontend-monorepo`; no additional LICENSE or
  provenance changes are proposed.
- Use valid Beets-owned links where available and npm for SDK package links;
  preserve upstream issue/PR references. Do not fabricate fork URLs or alter
  runtime metadata sources without verifying an equivalent destination.
- The old blanket config exemption and minter-ABI rename prescription are
  superseded by this consumer-based audit. Preserve the `PROJECT_CONFIG` boundary.
- Never discard the existing working tree to repair the ABI. Recover only the
  specific corrupt artifact while preserving other edits.
- Both docs are globally ignored by `/home/groninge/.gitignore_global:5`.
  Explicit inclusion will be needed if a documentation commit is requested.
  No files are staged or committed by this planning update.

---

## Historical branding plan (reference only)

The sections below preserve earlier scope, decisions and commit history. Their
old execution order, stale status and contradictory instructions are superseded
by the current plan above.

## Context

`beets-frontend-v3` is now the only app in the monorepo. This sweep removes the
residual Balancer branding/analytics references, the now-redundant `beets`
qualifiers in file names and CI titles, and the `isBeets` gates whose alternate
branch can no longer be taken.

**Legitimate and out of scope** (do NOT touch):

- "Balancer v2 / v3 protocol" mentions — protocol/technical references.
- Protocol docs site: `docs.balancer.fi` — kept intact for now. All other
  Balancer community / social / app links are now in scope for removal — see
  Workstream A2.
- Contract/ABI identifiers tied to protocol config or the `@balancer/sdk`:
  `contracts.balancer.*` (config keys stay), `balancerBatchRouterAbiExtended`
  and the other SDK-sourced ABIs, `safeStatusToBalancerStatus`,
  `BalancerTransactionStatus`, `RoutesCard` "via Balancer v{protocolVersion}".
- ⚠ `balancerMinterAbi`, `Protocol.Balancer`, `BalancerIconCircular`,
  `isBalancerV1` are now in scope for removal — see Workstream A3.
- `NEXT_PUBLIC_BALANCER_API_URL` env var and everything under
  `packages/lib/config/` (project config stays as-is per request).

**Rule of thumb:** remove Balancer as a _brand / org / identity_ reference; keep
Balancer as a _protocol / technical_ reference.

---

## Workstream A — Balancer branding removal

| #   | File                                                   | Change                                                                                                                                                                                                                                                                                     |
| --- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A1  | `README.md:1`                                          | Title `# Balancer frontend monorepo` → `# Beets frontend monorepo`                                                                                                                                                                                                                         |
| A2  | `README.md:10`                                         | DeepWiki badge link `deepwiki.com/balancer/frontend-monorepo` → `deepwiki.com/beethovenxfi/frontend-monorepo`                                                                                                                                                                              |
| A3  | `README.md:18,23,25,27,34`                             | Repo links `github.com/balancer/frontend-monorepo` → `github.com/beethovenxfi/frontend-monorepo` (see Workstream B)                                                                                                                                                                        |
| A4  | `apps/beets-frontend-v3/README.md:11`                  | `git clone https://github.com/balancer/frontend-monorepo.git` → `beethovenxfi`                                                                                                                                                                                                             |
| A5  | `package.json:2`                                       | `"name": "@balancer/frontend-monorepo"` → `"@beets/frontend-monorepo"` (or `@beethovenxfi/frontend-monorepo` — pick one)                                                                                                                                                                   |
| A6  | `LICENSE:3`                                            | `Copyright (c) Balancer` → `Copyright (c) Beets` (confirm legal holder)                                                                                                                                                                                                                    |
| A7  | `AGENTS.md:48`                                         | Drop the "affects the other app (Balancer ↔ Beets)" clause — only one app remains                                                                                                                                                                                                          |
| A8  | `apps/beets-frontend-v3/eslint.config.js:25`           | Comment "from balancer and beets apps" → "from the beets app"                                                                                                                                                                                                                              |
| A9  | `packages/lib/shared/services/api/apollo.client.ts:13` | Comment `(e.g. balancer-analytics)` → remove the balancer-analytics example                                                                                                                                                                                                                |
| A10 | e2e spec comments                                      | Remove "Ported from tests/…/balancer/…" provenance lines: `tests/build/beets/beets.add-liquidity.spec.ts:4,7`, `tests/dev/beets/batched-transactions.spec.ts:8,23`, `tests/dev/beets/swap.spec.ts:7`, `tests/dev/beets/create-lbp.spec.ts:22`, `helpers/create-lbp.beets.helpers.ts:13,50` |

## Workstream A2 — Remove Balancer community, social & app links

`docs.balancer.fi` stays. Everything else on the Balancer community/app surface
is removed. Several of these are _user-facing UI links_ — remove the link (and
its anchor when it is link-only), keep the surrounding copy, and verify the
consuming component tolerates a missing/empty link prop.

**forum.balancer.fi**

- `packages/lib/modules/pool/alerts/PoolAlerts.tsx:91` (network-sunset learn-more)
- `packages/lib/modules/pool/alerts/pool-issues/PoolIssue.labels.tsx:14,37,108`
- `packages/lib/modules/pool/alerts/usePoolAlerts.spec.tsx:65` (fixture string)
- `packages/lib/modules/portfolio/PortfolioClaim/ClaimNetworkPools/ClaimNetworkPools.tsx:260`
- `packages/lib/modules/portfolio/PortfolioClaim/recovered-funds/RecoveredFundsLearnMoreModal.tsx:63`

**app.balancer.fi**

- `packages/lib/modules/pool/alerts/pool-issues/PoolIssue.labels.tsx:46`

**x.com/Balancer**

- `packages/lib/modules/pool/alerts/PoolAlerts.tsx:76`
- `packages/lib/modules/pool/alerts/pool-issues/PoolIssue.labels.tsx:24`
- `packages/lib/modules/portfolio/PortfolioClaim/recovered-funds/RecoveredFundsLearnMoreModal.tsx:90`

**medium.com/balancer-protocol**

- `packages/lib/config/projects/beets.ts:201`
- `packages/lib/shared/components/promos/GyroPromoBanner.tsx:144`
- `packages/lib/shared/components/promos/HookathonPromoBanner.tsx:67`
- `packages/lib/shared/components/promos/MevCapturePromoBanner.tsx:97`
- `packages/lib/shared/components/promos/StableSurgePromoBanner.tsx:141`
- `packages/lib/shared/components/promos/hooks/MevCapturePoolDetailBanner.tsx:146`

**immunefi.com/bounty/balancer**

- `apps/beets-frontend-v3/app/(marketing)/risks/page.tsx:183`
- `packages/lib/config/projects/beets.ts:118`

**balancer.fi/pools**

- `packages/lib/modules/pool/alerts/usePoolAlerts.tsx:265` (comment)
- `packages/lib/shared/components/alerts/SafeAppAlert.tsx:54` (prose)

**⚠ NOT in scope (do not change):**

- `packages/lib/shared/utils/query-errors.ts:430,440` — `https://balancer.fi` here
  is a _runtime error-message matcher_ emitted by a browser extension, not a link.
  Changing it breaks error suppression.
- `packages/lib/shared/utils/calendar.spec.ts:19,26,37` — `http://balancer.fi` is
  arbitrary test-fixture data, not a link.

## Workstream A3 — Remove remaining Balancer-named identifiers

**`BalancerIconCircular` — dead code, delete**

- `packages/lib/shared/components/icons/logos/BalancerIconCircular.tsx` — defined
  but never imported anywhere. Delete the file. (Siblings `BeetsIcon.tsx` /
  `BeetsIconCircular.tsx` stay.)

**`isBalancerV1` — local rename**

- `packages/lib/modules/pool/queries/useIsPoolInitialized.ts:14,25,38,41,42,44` —
  rename to `isV1Pool` (matches the sibling `isV1PoolInitialized` /
  `isV3PoolInitialized` naming). Value stays `poolType && isCowPool(poolType)`.

**`Protocol.Balancer` — remove enum member + usages**

- `packages/lib/modules/protocols/useProtocols.ts:4` — drop `Balancer = 'balancer'`
  from the enum.
- `packages/lib/modules/protocols/useProtocols.ts:25` — drop the
  `[Protocol.Balancer]: '/images/protocols/balancer.svg'` entry. The map is
  `Record<Protocol, string>`, so enum + map must change together or TS fails.
- `packages/lib/modules/portfolio/PortfolioTable/PortfolioTableRow.tsx:143-151` —
  the `showBalIcon` branch renders `<ProtocolIcon protocol={Protocol.Balancer} />`
  with a "Balancer" tooltip for `ExpandedPoolType.StakedBal` / `Locked`. ⚠ Product
  decision: return `null` (drop the indicator) or swap in a Beets icon.
- Verify no other consumers — `ProtocolIcon.tsx` reads `protocolIconPaths[protocol]`
  generically; only the two sites above reference `Protocol.Balancer`.

**`balancerMinterAbi` — rename the export**

- `packages/lib/modules/web3/contracts/abi/generated.ts:8` (export), `:233` —
  rename to `minterAbi`.
- `packages/lib/modules/web3/contracts/AbiMap.ts:8` (import), `:31` — rename the
  import; ⚠ KEEP the map key `'balancer.minter'` (it matches the config contract
  key `contracts.balancer.minter`, which stays).
- `packages/lib/modules/staking/gauge/useHasMinterApproval.tsx:2,14` — rename import.
- ⚠ `abi/generated.ts` is a wagmi-CLI artifact (header `// BalancerMinter` + an
  Etherscan link). The app's `wagmi.config.ts` only generates
  `abi/beets/generated.ts`, so this file has no live in-repo generator — confirm
  before hand-editing, and rename at the generator source if one is reintroduced.

## Workstream B — Repoint `github.com/balancer` links

Per steering: divert `github.com/balancer` links — repo-own links to
`github.com/beethovenxfi`, the SDK source links to its npm package.

**Repo-own links (safe to divert):**

- `README.md` (5 links), `apps/beets-frontend-v3/README.md:11`
- `apps/beets-frontend-v3/app/(marketing)/risks/page.tsx:1276`
- `packages/lib/config/projects/beets.ts:93` (`scaffold-balancer-v3`)
- `packages/lib/modules/pool/pool.helpers.ts:379`, `useGetPoolTokensWithActualWeights.tsx:7,8`
- `packages/lib/shared/utils/sentry.helpers.ts:61,69`
- `packages/test/anvil/anvil-global-setup.ts:79`
- `packages/lib/modules/pool/actions/add-liquidity/form/useProportionalInputs.tsx:79`

**Resolved — `github.com/balancer/b-sdk` → npm package.** These are deep links
into the SDK source; point them at the published package instead:
`https://www.npmjs.com/package/@balancer/sdk` (dep `"@balancer/sdk": "6.2.0"`
in `apps/beets-frontend-v3/package.json`).

- `packages/lib/shared/app/react-query.provider.tsx:80`
- `packages/lib/test/utils/wagmi/fork-default-balances.ts:8`
- `packages/lib/modules/pool/actions/add-liquidity/form/useProportionalInputs.spec.tsx:154`

**⚠ Decision needed — other upstream Balancer repos.** These point at Balancer's
_own_ repositories (not the frontend monorepo). Diverting them to `beethovenxfi`
will 404 unless mirrors exist:

- `github.com/balancer/code-review` — `Erc4626Info.tsx:83`, `HookInfo.tsx:78`, `RateProviderInfo.tsx:109`
- `github.com/balancer/pool-math-simulator` — `autoRangeMath.ts:278,289`
- `github.com/balancer/metadata` — `getFeeManagersMetadata.ts:8`, `getHooksMetadata.ts:8`
- `github.com/balancer/tokenlists` — `__mocks__/api-mocks/*.ts` (image URLs)
- `github.com/balancer/balancer-maths` — `query-errors.ts:450`

**Recommendation:** divert the frontend-monorepo links; repoint `b-sdk` at the
npm package; leave the other upstream Balancer repo links intact (they are
external source references, not branding). Confirm the remainder before touching.

## Workstream C — Remove redundant `beets` from file names & CI titles

### C1. Rename files/dirs

- `packages/e2e-tests/helpers/create-lbp.beets.helpers.ts` → `create-lbp.helpers.ts`
  (the Balancer counterpart it was split from no longer exists — see its own
  header comment). Update the import in `tests/dev/beets/create-lbp.spec.ts:18`.
- `packages/e2e-tests/tests/build/beets/beets.*.spec.ts` → `packages/e2e-tests/tests/build/*.spec.ts`
  (drop the `beets/` dir and the `beets.` prefix on all 8 specs).
- `packages/e2e-tests/tests/dev/beets/` → `packages/e2e-tests/tests/dev/`
  (drop the `beets/` dir; 7 specs).

### C2. Update script references

- `packages/e2e-tests/package.json` scripts: `test:e2e:build:beets`,
  `test:e2e:build:ui:beets`, `test:e2e:dev:beets`, `test:e2e:dev:ui:beets` —
  drop the `:beets` suffix and the `tests/build/beets` / `tests/dev/beets` paths.
- Root `package.json:19-22` — mirror the renamed scripts.
- `packages/e2e-tests/scripts/shard-specs.mjs` — verify the path arg still resolves.

### C3. CI titles (`.github/workflows/checks.yml`)

- Job `E2E-Smoke-Test-Beets` (line 81) → `E2E-Smoke-Test`
- Job `E2E-Dev-Test-Beets` (line 109) → `E2E-Dev-Test`
- Artifact names `playwright-smoke-report-beets` (103), `playwright-dev-report-beets-${{ matrix.id }}` (151) → drop `-beets`
- `run:` steps `pnpm test:e2e:build:beets` (99), `pnpm test:e2e:dev:beets` (147) → renamed scripts

### C4. ⚠ Branch protection MUST be updated in lockstep

`main` protection currently requires these exact status-check contexts:

```
E2E-Smoke-Test-Beets
E2E-Dev-Test-Beets (1, 1/3)
E2E-Dev-Test-Beets (2, 2/3)
E2E-Dev-Test-Beets (3, 3/3)
```

Renaming the jobs without updating protection **blocks every PR** (required
checks never report). Update via:

```bash
gh api -X PATCH repos/beethovenxfi/frontend-monorepo/branches/main/protection/required_status_checks \
  -f 'contexts[]=Lint' -f 'contexts[]=Unit-Test' -f 'contexts[]=Integration-Test' \
  -f 'contexts[]=E2E-Smoke-Test' \
  -f 'contexts[]=E2E-Dev-Test (1, 1/3)' \
  -f 'contexts[]=E2E-Dev-Test (2, 2/3)' \
  -f 'contexts[]=E2E-Dev-Test (3, 3/3)'
```

Order: land the workflow rename and the protection update together (or update
protection first, then merge). Verify with
`gh api repos/beethovenxfi/frontend-monorepo/branches/main/protection`.

### C5. Docs

- `packages/e2e-tests/README.md` — update `test:e2e:dev:beets` references and the
  "Beets dev suite" wording where the qualifier is now redundant.

## Workstream D — Remove `isBeets` gates

| #   | File                                                            | Change                                                                                |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| D1  | `packages/lib/config/getProjectConfig.ts:10`                    | Remove `export const isBeets = …`                                                     |
| D2  | `packages/lib/modules/pool/PoolList/PoolListFilters.tsx:52,641` | Drop the import; unwrap `{isBeets && (…)}` → always render the "Create a pool" button |
| D3  | `packages/lib/test/utils/wagmi/fork-options.ts:53,55`           | Remove local `isBeets`; `chainId: sonic.id`                                           |
| D4  | `packages/lib/test/utils/wagmi/fork.helpers.ts:7,18`            | Remove import; `chain: sonic`                                                         |
| D5  | `AGENTS.md:13,16`                                               | Drop `isBeets` from the config description and the "gate with `isBeets`" rule         |

Note: `getProjectConfig.ts` is project config, but the `isBeets` export is
explicitly in scope ("check for isBeets gates and remove them"). `PROJECT_CONFIG`
and `ProjectConfigBeets` stay.

## Workstream E — Verification

1. `grep -rn "isBeets"` → zero hits.
2. `grep -rni "balancer"` → only the legitimate protocol/technical set above; and
   `grep -rn "isBalancerV1\|BalancerIconCircular\|Protocol\.Balancer\|balancerMinterAbi"` → zero hits.
3. `grep -rn "github.com/balancer"` → only the agreed upstream set (or zero).
4. `find . -iname '*beets*'` → only app dir, `config/projects/beets.ts`,
   `BeetsIcon*`, `BeetsLogo*`, `BeetsPromoBanner`, `BeetsTokenRow`, `abi/beets`.
5. `pnpm typecheck && pnpm lint && pnpm test:unit`.
6. `pnpm --filter e2e-tests typecheck` (renamed imports resolve).
7. `gh api repos/beethovenxfi/frontend-monorepo/branches/main/protection` →
   contexts match the renamed jobs.
8. Open a throwaway PR to confirm the renamed required checks report green.

## Workstream F — Trim generated ABI to Beets contracts only

`packages/lib/modules/web3/contracts/abi/generated.ts` is a leftover artifact of the deleted
Balancer app's wagmi setup. `apps/beets-frontend-v3/wagmi.config.ts` only emits
`abi/beets/generated.ts`, so nothing regenerates this file — it is hand-maintained now.

It should contain only the contracts Beets actually needs. Audit every export against
`AbiMap.ts` and drop the unused Balancer-era ABIs, addresses and configs, then delete any
`AbiMap` key that ends up with no consumer. Track the same for the sibling hand-written
ABI files under `contracts/abi/`.

## Suggested commit sequence

1. `chore: remove isBeets gates` (D)
2. `chore: drop redundant beets qualifiers from e2e files and CI titles` (C1–C3, C5)
3. `ci: update branch protection for renamed e2e checks` (C4)
4. `docs: remove Balancer branding from README/LICENSE/AGENTS` (A)
5. `chore: remove Balancer community/social/app links` (A2)
6. `refactor: rename/remove Balancer-named identifiers` (A3)
7. `chore: repoint Balancer repo links` (B — frontend-monorepo → beethovenxfi, b-sdk → npm)
8. `chore: trim generated ABI to the contracts Beets needs` (F)

## Open questions

1. `package.json` name — `@beets/frontend-monorepo` or `@beethovenxfi/frontend-monorepo`? '@beethovenxfi/frontend-monorepo
2. LICENSE copyright holder — "Beets" or "Beethoven X"? Beets
3. Upstream `github.com/balancer/*` repo links (b-sdk, code-review, metadata,
   tokenlists, pool-math-simulator, balancer-maths) — divert or leave? divert
4. Rename the e2e `beets/` directories, or only the `*.beets.*` file and titles? only the files and titles

## Status — paused 2026-09-28

**The working tree is currently RED.** `pnpm typecheck` fails. Committed work is green;
everything below the commit list was recorded as uncommitted and half-finished.
The corrected current baseline and P0 above govern recovery; preserve the existing
worktree and repair individual files. The former blanket-discard recommendation
has been withdrawn.

### Committed (green, on branch `cleanup` off `e98db4757`)

| commit      | scope                                                            |
| ----------- | ---------------------------------------------------------------- |
| `985a4503e` | D — `isBeets` gates removed                                      |
| `f80ed5d5b` | C1/C2/C5 — e2e file renames, script names, e2e README            |
| `9f3f4ffc1` | A — README/LICENSE/AGENTS/package.json branding + A10 provenance |
| `2ed417125` | A2 — Balancer community/social/app links                         |
| `38677bec3` | all promo banners except `StableSurgePromoBanner`                |

### Deferred by decision

- **C3 + C4** — CI job titles and branch protection go in a separate follow-up PR.
  Renaming the jobs here would make `main`'s required checks unreportable.
  `checks.yml:81,109` still say `E2E-Smoke-Test-Beets` / `E2E-Dev-Test-Beets`; artifacts
  at `:103,151` still carry `-beets`. The jobs already run the renamed scripts, so they
  work under their old names until the follow-up lands.
- **`dev:beets`** → `dev` / `dev:fork` already done in `f80ed5d5b`.

### In progress, uncommitted (A3 + minter)

Applied and believed correct:

- `AbiMap.ts` — `balancerMinterAbi` import + `'balancer.minter'` key removed
- `config.types.ts` + all 14 `config/networks/*.ts` — `minter: Address` field and its
  per-chain values removed
- `transaction-steps/lib.tsx` — `'minterApproval'` from `StepType`, `'MinterApproval'`
  from `TxActionId`
- `useClaimAllRewardsSteps.tsx` / `useClaimAndUnstakeSteps.tsx` — `useApproveMinterStep`
  import and call removed; `getApproval*Steps` no longer takes `minterApprovalStep` or
  `hasUnclaimedBalRewards`
- `useHasMinterApproval.tsx`, `useMinterApprovalStep.tsx` — `git rm`'d (staged)
- `useProtocols.ts` — `Balancer` enum member + map entry removed
- `PortfolioTableRow.tsx` — `StakingIcons` deleted with its call site and the three
  imports that went unused

Broken / unfinished:

- **`abi/generated.ts` is corrupt.** A line-range delete of the `// BalancerMinter`
  section cut the wrong span: `error TS1005: '}' expected` at line 14000. See P0
  for targeted reconstruction from HEAD and consumer-based, symbol-bounded edits;
  do not use absolute line ranges or overwrite unrelated changes.
- `useIsPoolInitialized.ts` — still `isBalancerV1` (6 hits), not yet renamed to `isV1Pool`
- `PortfolioTableRow.tsx` — `StakingIcons` name still appears twice (call site + def);
  verify the deletion actually landed after the concurrent-edit churn
- `BalancerIconCircular.tsx` — still present (1 hit), `git rm` never confirmed
- `apps/beets-frontend-v3/public/images/protocols/balancer.svg` — orphaned once the map
  entry went, still on disk
- `Protocol.Balancer` — 1 hit left; confirm it is only the stale `useProtocols.ts` line

### Not started

- **Workstream B** — repo link repointing. Decisions: divert everything; leave issue/PR
  links on upstream (forks never carry issues or PRs, verified); TODO comment where no
  `beethovenxfi` mirror exists (`pool-math-simulator`, `balancer-maths`, `scaffold-balancer-v3`).
  Note `generated/graphql.ts:109,114` also has `github.com/balancer/metadata` but the file
  is codegen output — needs a post-gen patch or must be left.
- **Workstream F** — trim `abi/generated.ts` to Beets contracts.
- **CowAmm + Xave removal** — requested as a follow-on. This is a feature cut, not
  cleanup: ~64 files. CowAmm touches `modules/cow/`, `cow-amm-steps/` (4 files),
  `cowAmmAbi.ts`, `PartnerVariant.cow`, `cowSupportedNetworks` (required config read by
  `SwapForm.tsx:225`, `SwapSimulationError.tsx:18`, `ChooseNetwork.tsx:25`), `bCoWFactory`,
  `COW_AMM_RAW_WEIGHT_*`, `isCowPool`/`isCowProtocol`/`isCowAmmPool` across the pool-create
  wizard, plus `CowFooter`/`CowHeader`/`CowPoolBanner`/`CowIcon`/`CowSandPattern` and the
  `variantConfig`/`Banners` type in `config.types.ts`. Xave adds `RedirectPartner.Xave`,
  `getXavePoolLink`, `shouldHideSwapFee`, `PoolIssue.FxPoolVulnWarning`, `XaveIcon`.
  Removing CowAmm is what makes `isV1Pool` fully dead in `useIsPoolInitialized`.
  **`useProtocols` cannot be deleted outright** — `ProtocolIcon` still renders Gyro and
  QuantAmm at `PoolTypeTag.tsx:98,106,114,128` and `PoolListTableDetailsCell.tsx:40,51`.
  Agreed: keep a trimmed `useProtocols`.
- `PROJECT_CONFIG.promoItems` (`beets.ts:121`) is read by nothing — dead config with
  Balancer-branded copy. Delete or wire up, undecided.

### Process note

Repeated `error: Another script is editing <file>` and `index.lock` collisions came from
issuing duplicate/parallel write calls. Write edits must be **one call at a time, then
verify**, never batched with another writer.
