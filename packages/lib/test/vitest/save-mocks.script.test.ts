import saveApiMocks, { ApiMockOptions } from './saveApiMocks'

test('Save api mocks', async () => {
  const options: ApiMockOptions = {
    // Use undefined to update all mocks, or a specific poolId to only create/update that specific mock
    poolId: undefined,
    apiUrl: 'https://api.beets-ftm-node.com/graphql',
  }

  await saveApiMocks(options)
})
