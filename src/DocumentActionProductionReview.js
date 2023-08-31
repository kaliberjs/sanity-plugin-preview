import { EarthGlobeIcon } from '@sanity/icons'

export function DocumentActionProductionReview({ published, resolvePublishedUrl }) {
  if (!published) return null

  return {
    icon: EarthGlobeIcon,
    label: 'View live',
    color: 'success',
    onHandle: async () => {
      window.open(await resolvePublishedUrl(published), '_blank').focus()
    }
  }
}
