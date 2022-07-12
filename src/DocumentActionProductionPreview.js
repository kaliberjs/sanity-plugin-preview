import { EyeOpenIcon } from '@sanity/icons'
import { resolveProductionUrl } from 'part:@kaliber/resolve-production-url'
import sanityClient from 'part:@sanity/base/client'
import { studio } from '@kaliber/sanity-preview'
import pluginConfig from 'config:@kaliber/sanity-plugin-preview'
import { i18n as getI18n } from './i18n'

const client = sanityClient.withConfig({
  apiVersion: '2022-04-06'
})

export function DocumentActionProductionPreview({ draft }) {
  const i18n = getI18n(pluginConfig.language)

  return {
    disabled: !draft,
    icon: EyeOpenIcon,
    label: 'Preview',
    title: draft ? '' : i18n['no-changes'],
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
