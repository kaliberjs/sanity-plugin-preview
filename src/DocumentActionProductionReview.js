import { EarthGlobeIcon } from '@sanity/icons'

export function DocumentActionProductionReview({ published, context, resolveProductionUrl }) {
  if (!published) return null

  return {
    icon: EarthGlobeIcon,
    label: 'View live',
    color: 'success',
    onHandle: async () => {
      const url = await resolveProductionUrl(null, { ...context, document: published })
      window.open(url, '_blank').focus()
    }
  }
}
