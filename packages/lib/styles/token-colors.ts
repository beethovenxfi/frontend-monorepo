import { Address } from 'viem'
import { getRandomInt } from '../shared/utils/numbers'

export type TokenColorDef = {
  from: string
  to: string
}

const tokenColors: Record<Address, TokenColorDef> = {
  '0x2d0e0814e62d80056181f5cd932274405966e4f0': { from: '#FE0103', to: '#FF6667' }, // BEETS
  '0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38': { from: '#000000', to: '#222222' }, // wS
  '0xe5da20f15420ad15de0fa650600afc998bbe3955': { from: '#FE0103', to: '#840D11' }, // stS
  '0x016c306e103fbf48ec24810d078c65ad13c5f11b': { from: '#000000', to: '#333333' }, // SiloWS
  '0x0c4e186eae8acaa7f7de1315d5ad174be39ec987': { from: '#ADDCEB', to: '#DEF1F7' }, // anS
  '0x50c42deacd8fc9773493ed674b675be577f2634b': { from: '#F2F3F7', to: '#CECDFE' }, // WETH
  '0x3bce5cb273f0f148010bbea2470e7b5df84c7812': { from: '#A765DE', to: '#808FC7' }, // scETH
}

const DEFAULT_TOKEN_COLORS: TokenColorDef[] = [
  { from: '#1E4CF1', to: '#00FFAA' },
  { from: '#B2C4DB', to: '#FDFDFD' },
  { from: '#EF4A2B', to: '#F48975' },
  { from: '#FFD600', to: '#F48975' },
  { from: '#9C68AA', to: '#C03BE4' },
  { from: '#FFBD91', to: '#FF957B' },
  { from: '#30CEF0', to: '#02A2FE' },
  { from: '#FFDD00', to: '#FFF5B2' },
  { from: '#FF07A4', to: '#FF9EDB' },
  { from: '#039241', to: '#96FDC3' },
  { from: '#001B7D', to: '#1448FF' },
  { from: '#871500', to: '#F02600' },
  { from: '#EA6200', to: '#FFB885' },
  { from: '#AAAAAA', to: '#666666' },
  { from: '#D4FF00', to: '#EEFF99' },
  { from: '#510A94', to: '#8614F0' },
]

const defaultColor: TokenColorDef = { from: '#30CEF0', to: '#02A2FE' }

export function getTokenColor(address: Address, i?: number): TokenColorDef {
  const normalizedAddress = address.toLowerCase() as Address
  const defaultColorIndex = i === undefined ? getRandomInt(0, 15) : i

  return tokenColors[normalizedAddress] || DEFAULT_TOKEN_COLORS[defaultColorIndex] || defaultColor
}

export function getCssTokenColor(address: Address, i: number) {
  const color = getTokenColor(address, i)
  return `linear-gradient(180deg, ${color.from} 0%, ${color.to} 100%)`
}
