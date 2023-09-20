import { EarthGlobeIcon } from '@sanity/icons'
import { requiredFieldsMissing } from './requiredFieldsMissing'

export function documentActionProductionReview({ published, resolvePublishedUrl, schema }) {
  if (!published) return null

  const fieldsMissing = requiredFieldsMissing({ schema, document: published})
  return {
    disabled: fieldsMissing,
    icon: EarthGlobeIcon,
    label: 'View live',
    title: fieldsMissing ? 'Document does not have the minimal set of fields for preview' : '',
    color: 'success',
    onHandle: async () => {
      const url = await resolvePublishedUrl(published)
      if (url) window.open(url, '_blank').focus()
    }
  }
}
