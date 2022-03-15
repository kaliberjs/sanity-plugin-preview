/*
  This would be ideal: https://www.sanity.io/docs/preview-content-on-site

  It however does not support async: https://github.com/sanity-io/sanity/issues/2036
*/
import qs from 'query-string'

export async function resolveProductionUrl(document, { queryString = undefined } = {}) {
  const response = await fetch('/api/v1/document/path', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(document),
    credentials: 'same-origin'
  })

  if (response.status !== 200)
    throw Error(`${response.status} - Error while fetching document path\n${await response.text()}`)

  const { path, error } = await response.json()
  if (error) throw Error(error)

  return [
    path,
    queryString && qs.stringify(queryString)
  ].filter(Boolean).join('?')
}

export function resolveProductionPreviewUrl(document) {
  return `/preview?id=${document._id}&type=${document._type}`
}
