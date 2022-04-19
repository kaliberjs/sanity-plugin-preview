# BEFORE YOU PUBLISH
- Read [Libraries van Kaliber](https://docs.google.com/document/d/1FrJi-xWtKkbocyMVK5A5_hupjl5E4gD4rDvATDlxWyc/edit#heading=h.bb3md3gyf493).
- Make sure your example works.
- Make sure your package.json is correct. Have you change the library title?
- Update the bin/postInstall script. It should refer to your library.
- Update the `<title>` tag in `index.html.js`.
- Remove 'BEFORE YOU PUBLISH' and 'PUBLISHING' from this document.

# PUBLISHING
- Make sure you are added to the kaliber organization on NPM
- run `yarn publish`
- Enter a correct version, we adhere to semantic versioning (semver)
- run `git push`
- run `git push --tags`
- Send everybody an email to introduce them to your library!

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
This plugin expects your frontend to:

- Handle the `/preview?id=${document._id}&type=${document._type}` route by displaying the correct preview page for the given document id & type (this can be implemented using `@kaliber/sanity-preview`).

## Usage

- Create `resolveDocumentActions.js`
- Create `resolveProductionPreview.js`
- Define sanity parts in `sanity.json`

### Resolve document actions

Create a file called `resolveDocumentActions.js` in your sanity folder, and add the following:

```js
import defaultResolve from 'part:@sanity/base/document-actions'
import { DocumentActionProductionPreview, DocumentActionProductionReview } from '@kaliber/sanity-plugin-preview'

export default function resolveDocumentActions(props) {
  return [...defaultResolve(props), DocumentActionProductionPreview, DocumentActionProductionReview]
}
```

### Resolve production url

Create a file called `resolveProductionUrl.js` in your sanity folder. It should export an async function `resolveProductionUrl`, that returns the url to the given document with the query string attached:

```js
export async function resolveProductionUrl(document, { queryString = undefined } = {}) {
  // ... fetch path based on document

  return [
    path,
    queryString && qs.stringify(queryString)
  ].filter(Boolean).join('?')
}
```

### Define parts in `sanity.json`

Next, add them to your parts array in your `sanity.json` file: 

```json
{
  "implements": "part:@sanity/base/document-actions/resolver",
  "path": "./resolveDocumentActions.js"
},
{
  "implements": "part:@kaliber/resolve-production-url",
  "path": "./resolveProductionUrl.js"
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