import { ApiToken } from '@repo/lib/modules/tokens/token.types'

export function tokenSymbols(apiTokens: ApiToken[]): string[] {
  return apiTokens.map(token => token.symbol).sort()
}
