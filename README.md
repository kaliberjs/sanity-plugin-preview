# Sanity plugin preview
Adds (p)review document actions to Sanity.

## Installation

```
> cd admin
> yarn add @kaliber/sanity-plugin-preview
```

_`admin/sanity.json`_

```json
{
  "plugins": [
    "@kaliber/sanity-plugin-preview",
    ...
  ],
  ...
}
```

## Prerequisites
This plugin expects your project to:

- Handle the `/${documentPath}?preview=${previewSecret}` route at the front office using `@kaliber/sanity-preview`.
- Implement the `part:@kaliber/resolve-production-url` part at the back office.
- Add the document actions to the default document actions, by implementing the `part:@sanity/base/document-actions/resolver` part.

Check `kaliber-sanity-template` for a concrete example.

### Implementing the `part:@kaliber/resolve-production-url` part

Create a file called `resolveProductionUrl.js` in your sanity folder. It should export an async function `resolveProductionUrl`, that returns the url to the given document tacking on the `queryString` given:

```js
import qs from 'query-string' 

export async function resolveProductionUrl(document, { queryString = undefined } = {}) {
  // ... fetch path based on document

  return [
    path,
    queryString && qs.stringify(queryString)
  ].filter(Boolean).join('?')
}
```

Next, add it to the parts array in your `sanity.json` file: 

```json
{
  "implements": "part:@kaliber/resolve-production-url",
  "path": "./resolveProductionUrl.js"
}
```

### Adding the custom document actions

To add the actual document actions, you have to add them to the default document actions. To do this, in your sanity folder create a file called `resolveDocumentActions.js` and add the following:

```js
import defaultResolve from 'part:@sanity/base/document-actions'
import { DocumentActionProductionPreview, DocumentActionProductionReview } from '@kaliber/sanity-plugin-preview'

export default function resolveDocumentActions(props) {
  return [...defaultResolve(props), DocumentActionProductionPreview, DocumentActionProductionReview]
}
```

Then add the `part:@sanity/base/document-actions/resolver` part to the parts array in `sanity.json`:

```json
{
  "implements": "part:@sanity/base/document-actions/resolver",
  "path": "./resolveDocumentActions.js"
}
```

---

## Development

```
> yarn
> yarn link
> yarn watch
```

```
project/admin/> yarn link @kaliber/sanity-plugin-preview
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