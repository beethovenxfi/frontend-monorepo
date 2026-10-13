import { http, HttpResponse } from 'msw'

export const defaultPostMswHandlers = [
  // happy-dom sends a CORS preflight before each graphql POST; answer it locally
  // so msw 3 doesn't pass it through to the real network (slow + flaky in CI).
  http.options('*', () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': '*',
        'access-control-allow-headers': '*',
      },
    })
  }),
  http.post('http://127.0.0.1:8*/*', () => {}),
  http.get('/', () => {}),
]
