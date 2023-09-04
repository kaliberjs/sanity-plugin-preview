import { EarthGlobeIcon } from '@sanity/icons'

export function documentActionProductionReview({ published, resolvePublishedUrl }) {
  if (!published) return null

  return {
    icon: EarthGlobeIcon,
    label: 'View live',
    color: 'success',
    onHandle: async () => {
      const url = await resolvePublishedUrl(published)
      if (url) window.open(url, '_blank').focus()
    }
  }
}
