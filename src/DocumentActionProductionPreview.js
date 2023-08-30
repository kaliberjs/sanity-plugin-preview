import { EyeOpenIcon } from '@sanity/icons'
import { studio } from '@kaliber/sanity-preview'

export function DocumentActionProductionPreview({ draft, context, resolveProductionUrl }) {
  return {
    disabled: !draft,
    icon: EyeOpenIcon,
    label: 'Preview',
    title: draft ? '' : 'There are no changes',
    onHandle: async () => {
      const path = await resolveProductionUrl(null, { ...context, document: draft })
      const url = new URL(path, window.location.origin)
      url.searchParams.set('preview', await studio.getPreviewSecret({ sanityClient: context.getClient({ apiVersion: '2023-08-30' }) }))
      window.open(url.toString(), '_blank').focus()
    }
  }
}
