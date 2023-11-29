import { definePlugin } from 'sanity'
import { documentActionProductionPreview } from './documentActionProductionPreview'
import { documentActionProductionReview } from './documentActionProductionReview'

/**
 * @typedef {{
*   resolvePublishedUrl: Resolve
*   resolvePreviewUrl: Resolve
* }} Options
*/

/**
 * @typedef {(props: {
 *     document: import('sanity').SanityDocument,
 *     schema: import('sanity').Schema,
 *     getClient: (options: import('sanity').SourceClientOptions) => import('sanity').SanityClient,
 *   }) => Promise<string | null>
 * } Resolve
 */

export const sanityPluginPreview = definePlugin(
  /** @type {import('sanity').PluginFactory<Options>} */
  ({ resolvePublishedUrl, resolvePreviewUrl }) => ({
    name: 'sanity-plugin-preview',
    document: {
      actions: (prev, context) => {
        const { schema } = context
        const getClient = context.getClient.bind(context)

        return prev
          .concat([
            ({ draft }) => isEnabled(schema, draft) && documentActionProductionPreview({
              draft,
              resolvePreviewUrl: document => resolvePreviewUrl({ document, schema, getClient }),
              schema,
            }),
            ({ published }) => isEnabled(schema, published) && documentActionProductionReview({
              published,
              resolvePublishedUrl: document => resolvePublishedUrl({ document, schema, getClient }),
              schema,
            }),
          ])
      }
    }
  })
)

export const isPreviewEnabled = isEnabled

function isEnabled(schema, document) {
  if (!document) return null

  const schemaType = schema.get(document._type)
  return !schemaType.options?.kaliber?.previewDisabled || null
}
