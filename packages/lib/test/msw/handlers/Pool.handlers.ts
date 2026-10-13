import { GetPoolDocument, GetPoolQuery } from '@repo/lib/shared/services/api/generated/graphql'
import {} from 'msw'
import { getQueryName, mockGQL } from '../utils'
import { aPoolMock } from '../builders/gqlPoolElement.builders'
import { GQLResponse, gqlApi } from './msw-helpers'

export const defaultPoolMock = aPoolMock()
export const defaultPoolResponseMock: GetPoolQuery = {
  __typename: 'Query',
  pool: defaultPoolMock,
}

export function buildPoolMswHandler(pool = defaultPoolMock) {
  return gqlApi.query(getQueryName(GetPoolDocument), () => {
    return GQLResponse({ pool: pool })
  })
}

export function mockPool(pool = defaultPoolMock) {
  mockGQL(buildPoolMswHandler(pool))
}
