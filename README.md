# Sanity plugin preview
Adds (p)review document actions to Sanity:

- Preview - opens the preview URL in a new tab
- Review - opens the published URL in a new tab

## Installation

```
> yarn add @kaliber/sanity-plugin-preview
```

_`config/default.js`_

```js
{
  kaliber: [
    compileWithBabel: [
      /@kaliber\/sanity-plugin-preview/,
      ...
    ],
    ...
  ],
  ...
}
```

_`admin/sanity.config.js`_

```js
defineConfig({
    ...

    plugins: [
      preview({ resolvePublishedUrl, resolvePreviewUrl }),
      ...
    ],
})
```

Signatures of the required paramaters:

```ts
({ 
  document: SanityDocument, 
  schema: Schema, 
  getClient: (options: SourceClientOptions) => SanityClient 
}) => Promise<string | null>
```

## Additional setup

It's possible to prevent 'preview' and 'view live' for documents that have required fields. A good
example is the `slug` field, if that is missing we can not determine the route and thus can not
preview.

Add the following to the schema in order to disable the buttons:

```js
export const page = {
  type: 'document',
  name: 'page',
  title: 'Page',
  options: {
    kaliber: {
      requiredForPreview: ['slug'],
      ...
    },
  },
  ...
```

---

## Development

```
> yarn
> yarn link
```

```
project/> yarn link @kaliber/sanity-plugin-preview
```

## Publish

```
yarn publish
git push
git push --tags
```

---

![](https://media.giphy.com/media/3oriOfWPE8r5YeK3lK/giphy.gif)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk.
