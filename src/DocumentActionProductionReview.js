import { EarthGlobeIcon } from '@sanity/icons'
import { resolveProductionUrl } from 'part:@kaliber/resolve-production-url'
import pluginConfig from 'config:@kaliber/sanity-plugin-preview'
import { i18n as getI18n } from './i18n'

export function DocumentActionProductionReview({ published }) {
  if (!published) return null

  const i18n = getI18n(pluginConfig.language)

  return {
    icon: EarthGlobeIcon,
    label: i18n['view-live'],
    color: 'success',
    onHandle: () => {
      resolveProductionUrl(published).then(url => { window.open(url, '_blank').focus() })
    }
  }
}
