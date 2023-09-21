export function requiredFieldsMissing({ schema, document }) {
  const schemaType = schema.get(document._type)

  return schemaType.options?.kaliber?.requiredForPreview?.some(field => !(field in document))
}
