import {definePlugin} from 'sanity'
import { DocumentActionProductionPreview } from './DocumentActionProductionPreview'
import { DocumentActionProductionReview } from './DocumentActionProductionReview'
import { withProps } from './withProps'

export const preview = definePlugin(resolveProductionUrl => ({
  name: 'sanity-plugin-preview',
  document: {
    actions: (prev, context) => {
      const client = context.getClient({ apiVersion: '2022-12-22' })

      return [
        ...prev, 
        withProps(DocumentActionProductionPreview, { client, resolveProductionUrl }), 
        withProps(DocumentActionProductionReview, { client, resolveProductionUrl })
      ]
    },
  }
}))
