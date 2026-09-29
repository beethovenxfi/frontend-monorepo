import { describe, expect, it } from 'vitest'
import { Kind } from 'graphql'
import { GetProtocolStatsDocument } from './generated/graphql'

describe('GetProtocolStatsDocument', () => {
  it('queries Sonic protocol stats through the single-chain resolver', () => {
    const operation = GetProtocolStatsDocument.definitions.find(
      definition => definition.kind === Kind.OPERATION_DEFINITION
    )

    expect(operation?.kind).toBe(Kind.OPERATION_DEFINITION)
    if (operation?.kind !== Kind.OPERATION_DEFINITION) return

    expect(operation.variableDefinitions).toHaveLength(1)
    expect(operation.variableDefinitions?.[0]?.variable.name.value).toBe('chain')

    const field = operation.selectionSet.selections[0]
    expect(field).toBeDefined()
    expect(field?.kind).toBe(Kind.FIELD)
    if (!field || field.kind !== Kind.FIELD) return

    expect(field.name.value).toBe('protocolMetricsChain')
    expect(field.arguments?.[0]?.name.value).toBe('chain')
  })
})
