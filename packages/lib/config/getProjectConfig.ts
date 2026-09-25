import { ProjectConfigBeets } from './projects/beets'
import { ProjectConfig } from './config.types'

const PROJECT_CONFIGS = {
  [ProjectConfigBeets.projectId]: ProjectConfigBeets,
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as ProjectConfig['projectId']

export const isBeets = projectId === ProjectConfigBeets.projectId
export const PROJECT_CONFIG = PROJECT_CONFIGS[projectId] ?? ProjectConfigBeets
