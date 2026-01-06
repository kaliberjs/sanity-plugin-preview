declare module 'sanity' {
  interface DocumentOptions {
    kaliber?: {
      requiredForPreview?: Array<string>,
      previewDisabled?: boolean,
    },
  }
}

export {} // make sure typescript treats this type definition file as a module
