import { EyeOpenIcon } from '@sanity/icons'
import { resolveProductionPreviewUrl } from './resolveProductionUrl'

export function DocumentActionProductionPreview({ draft }) {
  return {
    disabled: !draft,
    icon: EyeOpenIcon,
    label: 'Preview',
    title: draft ? '' : 'Er zijn geen wijzigingen',
    onHandle: () => {
      const url = resolveProductionPreviewUrl(draft)
      window.open(url, '_blank').focus()
    }
  }
}
