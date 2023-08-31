import { definePlugin } from 'sanity'
import { DocumentActionProductionPreview } from './DocumentActionProductionPreview'
import { DocumentActionProductionReview } from './DocumentActionProductionReview'

export const preview = definePlugin(({ resolvePublishedUrl, resolvePreviewUrl }) => ({
  name: 'sanity-plugin-preview',
  document: {
    actions: (prev, context) => [
      ...prev,
      props => DocumentActionProductionPreview({
        ...props,
        resolvePreviewUrl: document => resolvePreviewUrl({ ...context, document, client: context.getClient({ apiVersion: '2023-08-31' }) })
      }),
      props => DocumentActionProductionReview({
        ...props,
        resolvePublishedUrl: document => resolvePublishedUrl({ ...context, document })
      }),
    ].filter(Boolean)
  }
}))
