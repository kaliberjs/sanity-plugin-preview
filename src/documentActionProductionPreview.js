import { EyeOpenIcon } from '@sanity/icons'
import { requiredFieldsMissing } from './requiredFieldsMissing'

export function documentActionProductionPreview({ draft, resolvePreviewUrl, schema }) {
  const noDraft = !draft
  const fieldsMissing = noDraft || requiredFieldsMissing({ schema, document: draft })

  return {
    disabled: noDraft || fieldsMissing,
    icon: EyeOpenIcon,
    label: 'Preview',
    title: (
      noDraft ? 'There are no changes' :
      fieldsMissing ? 'Document does not have the minimal set of fields for preview' :
      '' 
    ),
    onHandle: async () => {
      const url = await resolvePreviewUrl(draft)
      if (url) window.open(url, '_blank').focus()
    }
  }
}
