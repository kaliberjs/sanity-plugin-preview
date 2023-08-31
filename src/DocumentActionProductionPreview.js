import { EyeOpenIcon } from '@sanity/icons'

export function DocumentActionProductionPreview({ draft, resolvePreviewUrl }) {
  return {
    disabled: !draft,
    icon: EyeOpenIcon,
    label: 'Preview',
    title: draft ? '' : 'There are no changes',
    onHandle: async () => {
      window.open(await resolvePreviewUrl(draft), '_blank').focus()
    }
  }
}
