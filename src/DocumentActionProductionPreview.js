import { EyeOpenIcon } from '@sanity/icons'
import { resolveProductionUrl } from 'part:@kaliber/resolve-production-url'
import sanityClient from 'part:@sanity/base/client'
import { studio } from '@kaliber/sanity-preview'

const client = sanityClient.withConfig({
  apiVersion: '2022-04-06'
})

export function DocumentActionProductionPreview({ draft }) {
  return {
    disabled: !draft,
    icon: EyeOpenIcon,
    label: 'Preview',
    title: draft ? '' : 'Er zijn geen wijzigingen',
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
