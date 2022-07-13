export function i18n(language) {
  const strings = {
    'en': {
      'view-live': 'View live',
      'no-changes': 'There are no changes'
    },
    'nl': {
      'view-live': 'Live bekijken',
      'no-changes': 'Er zijn geen wijzigingen'
    },
  }
  return strings[language || 'nl']
}
