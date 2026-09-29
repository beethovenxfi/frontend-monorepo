import { MockedProvider } from '@apollo/client/testing/react'
import { renderHook, waitFor } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { GetApiHealthDocument, GetApiHealthQuery } from '../services/api/generated/graphql'
import { getApiHealthStatus, useApiHealth } from './useApiHealth'

describe('useApiHealth', () => {
  it('distinguishes the initial pending state from an API outage', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MockedProvider
        mocks={[
          {
            request: { query: GetApiHealthDocument, variables: { chain: 'SONIC' } },
            result: {
              data: {
                protocolMetricsChain: {
                  __typename: 'GqlProtocolMetricsChain',
                  poolCount: '0',
                },
              },
            },
            delay: 50,
          },
        ]}
      >
        {children}
      </MockedProvider>
    )

    const { result } = renderHook(() => useApiHealth(), { wrapper })

    expect(result.current.apiOK).toBeUndefined()

    await waitFor(() => expect(result.current.apiOK).toBe(true))
  })

  it('reports an API error as unhealthy', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MockedProvider
        mocks={[
          {
            request: { query: GetApiHealthDocument, variables: { chain: 'SONIC' } },
            error: new Error('API unavailable'),
          },
        ]}
      >
        {children}
      </MockedProvider>
    )

    const { result } = renderHook(() => useApiHealth(), { wrapper })

    await waitFor(() => expect(result.current.apiOK).toBe(false))
  })

  it('reports a failed poll as unhealthy even when previous data exists', () => {
    const previousResponse: GetApiHealthQuery = {
      __typename: 'Query',
      protocolMetricsChain: {
        __typename: 'GqlProtocolMetricsChain',
        poolCount: '1',
      },
    }

    expect(getApiHealthStatus(previousResponse, new Error('API unavailable'), false)).toBe(false)
  })
})
