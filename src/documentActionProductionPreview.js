import { EyeOpenIcon } from '@sanity/icons'

export function documentActionProductionPreview({ draft, resolvePreviewUrl }) {
  return {
    disabled: !draft,
    icon: EyeOpenIcon,
    label: 'Preview',
    title: draft ? '' : 'There are no changes',
    onHandle: async () => {
      const url = await resolvePreviewUrl(draft)
      if (url) window.open(url, '_blank').focus()
    }
  }
}
