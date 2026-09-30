'use client'

import { CacheProvider, withEmotionCache } from '@emotion/react'
import { useServerInsertedHTML } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'

export const EmotionRegistry = withEmotionCache<PropsWithChildren>(({ children }, initialCache) => {
  const [{ cache, flush }] = useState(() => {
    // Emotion supplies a request-local cache on the server through withEmotionCache.
    const cache = initialCache
    cache.compat = true
    const originalInsert = cache.insert
    let inserted: { name: string; global: boolean }[] = []

    if (typeof window === 'undefined') {
      cache.insert = (...args) => {
        const [selector, serialized] = args

        if (cache.inserted[serialized.name] === undefined) {
          inserted.push({ name: serialized.name, global: !selector })
        }

        return originalInsert(...args)
      }
    }

    return {
      cache,
      flush: () => {
        const pending = inserted
        inserted = []
        return pending
      },
    }
  })

  useServerInsertedHTML(() => {
    const inserted = flush()
    if (inserted.length === 0) return null

    let css = ''
    const names: string[] = []
    const globals = []

    for (const { name, global } of inserted) {
      const styles = cache.inserted[name]
      if (typeof styles !== 'string') continue

      if (global) {
        globals.push(
          <style
            dangerouslySetInnerHTML={{ __html: styles }}
            data-emotion={`${cache.key}-global ${name}`}
            key={name}
          />
        )
      } else {
        names.push(name)
        css += styles
      }
    }

    return (
      <>
        {globals}
        {names.length > 0 && (
          <style
            dangerouslySetInnerHTML={{ __html: css }}
            data-emotion={`${cache.key} ${names.join(' ')}`}
          />
        )}
      </>
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
})
