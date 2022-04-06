import { EarthGlobeIcon } from '@sanity/icons'
import { resolveProductionUrl } from 'part:@kaliber/resolve-production-url'

export function DocumentActionProductionReview({ published }) {
  if (!published) return null

  return {
    icon: EarthGlobeIcon,
    label: 'Live bekijken',
    color: 'success',
    onHandle: () => {
      resolveProductionUrl(published).then(url => { window.open(url, '_blank').focus() })
    }
  }
}
