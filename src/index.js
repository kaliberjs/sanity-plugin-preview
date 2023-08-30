import { definePlugin } from 'sanity'
import { DocumentActionProductionPreview } from './DocumentActionProductionPreview'
import { DocumentActionProductionReview } from './DocumentActionProductionReview'

export const preview = definePlugin(resolveProductionUrl => ({
  name: 'sanity-plugin-preview',
  document: {
    actions: (prev, context) => {
      console.log(context)
      return [
        ...prev,
        props => DocumentActionProductionPreview({
          ...props,
          context,
          resolveProductionUrl
        }),
        props => DocumentActionProductionReview({
          ...props,
          context,
          resolveProductionUrl
        }),
      ].filter(Boolean)
    },
  }
}))
