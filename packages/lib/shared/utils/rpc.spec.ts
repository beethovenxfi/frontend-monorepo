import { sonic } from 'viem/chains'
import { GqlChainValues } from '../services/api/graphql-enums'
import { drpcUrl, drpcUrlByChainId } from './rpc'

test('drpcUrl', () => {
  const privateKey = '1234'
  expect(drpcUrl(GqlChainValues.Sonic, privateKey)).toBe('https://lb.drpc.live/sonic/1234')
})

test('drpcUrlByChainId', () => {
  const privateKey = '1234'
  expect(drpcUrlByChainId(sonic.id, privateKey)).toBe('https://lb.drpc.live/sonic/1234')
})
