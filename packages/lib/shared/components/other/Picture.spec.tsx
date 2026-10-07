import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Picture } from './Picture'

describe('retained dynamic Picture assets', () => {
  it.each([
    { directory: '/images/homepage/', imgName: 'stone' },
    { directory: '/images/promos/stablesurge/', imgName: 'bg' },
  ])('resolves $directory with $imgName variants', ({ directory, imgName }) => {
    const { container } = render(
      <Picture
        altText="Retained texture"
        defaultImgType="jpg"
        directory={directory}
        imgAvif
        imgAvifDark
        imgJpg
        imgJpgDark
        imgName={imgName}
      />
    )

    const basename = `${directory}${imgName}`

    const sources = Array.from(container.querySelectorAll('source')).map(source =>
      source.getAttribute('srcset')
    )

    expect(sources).toEqual([
      `${basename}-dark.avif`,
      `${basename}.avif`,
      `${basename}-dark.jpg`,
      `${basename}.jpg`,
    ])

    expect(screen.getByAltText('Retained texture').getAttribute('src')).toBe(`${basename}.jpg`)

    for (const asset of sources) {
      expect(asset).toBeTypeOf('string')

      const assetPath = resolve(
        dirname(fileURLToPath(import.meta.url)),
        `../../../../../apps/beets-frontend-v3/public${asset}`
      )

      expect(existsSync(assetPath), `Missing retained asset: ${asset} at ${assetPath}`).toBe(true)
    }
  })
})
