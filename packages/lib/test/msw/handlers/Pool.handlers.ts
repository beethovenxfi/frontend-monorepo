import { GetPoolDocument, GetPoolQuery } from '@repo/lib/shared/services/api/generated/graphql'
import { graphql } from 'msw'
import { getQueryName, mockGQL } from '../utils'
import { aPoolMock } from '../builders/gqlPoolElement.builders'
import { GQLResponse } from './msw-helpers'

export const defaultPoolMock = aPoolMock()
export const defaultPoolResponseMock: GetPoolQuery = {
  __typename: 'Query',
  pool: defaultPoolMock,
}

export function buildPoolMswHandler(pool = defaultPoolMock) {
  return graphql.query(getQueryName(GetPoolDocument), () => {
    return GQLResponse({ pool: pool })
  })
}

export function mockPool(pool = defaultPoolMock) {
  mockGQL(buildPoolMswHandler(pool))
}
