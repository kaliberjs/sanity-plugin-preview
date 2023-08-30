import { EyeOpenIcon } from '@sanity/icons'
import { studio } from '@kaliber/sanity-preview'

export function DocumentActionProductionPreview({ draft, client, resolveProductionUrl }) {
  return {
    disabled: !draft,
    icon: EyeOpenIcon,
    label: 'Preview',
    title: draft ? '' : 'There are no changes',
    onHandle: async () => {
      const url = await resolveProductionUrl(draft, {
        queryString: { 
          preview: await studio.getPreviewSecret({ sanityClient: client }) 
        }
      })
      window.open(url, '_blank').focus()
    }
  }
}
