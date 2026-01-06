import { definePlugin } from 'sanity'
import { documentActionProductionPreview } from './documentActionProductionPreview'
import { documentActionProductionReview } from './documentActionProductionReview'
/** @import { SanityDocument, Schema, SourceClientOptions, SanityClient, PluginFactory, DocumentOptions } from 'sanity' */

/**
 * @typedef {{
*   resolvePublishedUrl: Resolve
*   resolvePreviewUrl: Resolve
* }} Options
*/

/**
 * @typedef {(props: {
 *     document: SanityDocument,
 *     schema: Schema,
 *     getClient: (options: SourceClientOptions) => SanityClient,
 *   }) => Promise<string | null>
 * } Resolve
 */

export const sanityPluginPreview = definePlugin(
  /** @type {PluginFactory<Options>} */
  ({ resolvePublishedUrl, resolvePreviewUrl }) => ({
    name: 'sanity-plugin-preview',
    document: {
      actions: (prev, context) => {
        const { schema } = context
        const getClient = context.getClient.bind(context)

        return prev
          .concat([
            ({ draft }) => isEnabled(schema, draft) && documentActionProductionPreview({
              // @ts-ignore draft can not be null anymore (see isEnabled)
              draft,
              /** @arg {SanityDocument} document */
              resolvePreviewUrl: document => resolvePreviewUrl({ document, schema, getClient }),
              schema,
            }),
            ({ published }) => isEnabled(schema, published) && documentActionProductionReview({
              // @ts-ignore published can not be null anymore (see isEnabled)
              published,
              /** @arg {SanityDocument} document */
              resolvePublishedUrl: document => resolvePublishedUrl({ document, schema, getClient }),
              schema,
            }),
          ])
      }
    }
  })
)

export const isPreviewEnabled = isEnabled

/**
 * @arg {Schema} schema
 * @arg {SanityDocument | null} document
 */
function isEnabled(schema, document) {
  if (!document) return null

  const schemaType = schema.get(document._type)

  /** @type {undefined | DocumentOptions} */
  const options = schemaType?.options
  return options?.kaliber?.previewDisabled || null
}
