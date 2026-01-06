/** @import { Schema, SanityDocument, DocumentOptions } from 'sanity' */

/** @arg {{ schema: Schema, document: SanityDocument }} props */
export function requiredFieldsMissing({ schema, document }) {
  const schemaType = schema.get(document._type)

  /** @type {undefined | DocumentOptions} */
  const options = schemaType?.options
  return options?.kaliber?.requiredForPreview?.some(field => !(field in document))
}
