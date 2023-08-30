import { EarthGlobeIcon } from '@sanity/icons'

export function DocumentActionProductionReview({ published, resolveProductionUrl }) {
  if (!published) return null

  return {
    icon: EarthGlobeIcon,
    label: 'View live',
    color: 'success',
    onHandle: () => {
      resolveProductionUrl(published).then(url => { window.open(url, '_blank').focus() })
    }
  }
}
