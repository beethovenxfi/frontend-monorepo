import { describe, expect, it } from 'vitest'
import { ProjectConfigBeets } from './beets'

describe('project configs', () => {
  it('is structurally complete', () => {
    const projectConfig = ProjectConfigBeets
    expect(projectConfig.projectId).toBeTypeOf('string')
    expect(projectConfig.projectName).toBeTypeOf('string')
    expect(projectConfig.projectUrl).toMatch(/^https:\/\//)
    expect(projectConfig.projectLogo).toMatch(/^https:\/\//)
    expect(projectConfig.supportedNetworks.length).toBeGreaterThan(0)
    expect(projectConfig.defaultNetwork).toBeTypeOf('string')
    expect(projectConfig.ensNetwork).toBeTypeOf('string')
    expect(projectConfig.corePoolId).toMatch(/^0x/)
    expect(projectConfig.merklRewardsChains.length).toBeGreaterThan(0)
    expect(projectConfig.options).toBeDefined()
    expect(projectConfig.links).toBeDefined()
    expect(projectConfig.footer.linkSections.length).toBeGreaterThan(0)
  })

  it('gates project-only features', () => {
    expect(ProjectConfigBeets.options.showMaBeets).toBe(true)
    expect(ProjectConfigBeets.options.allowCreateWallet).toBe(false)
    expect(ProjectConfigBeets.options.isOnSafeAppList).toBe(false)
  })

  it('only lists supported networks for its own chains', () => {
    // Beets is Sonic-only
    expect(ProjectConfigBeets.supportedNetworks).toContain('SONIC')
  })
})
