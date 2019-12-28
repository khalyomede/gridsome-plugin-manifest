# gridsome-plugin-manifest

Generates a manifest and handle icons generation for your PWA.

[![npm](https://img.shields.io/npm/v/gridsome-plugin-manifest)](https://www.npmjs.com/package/gridsome-plugin-manifest) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/gridsome-plugin-manifest/peer/gridsome)](https://www.npmjs.com/package/gridsome) [![NPM](https://img.shields.io/npm/l/gridsome-plugin-manifest)](https://github.com/khalyomede/gridsome-plugin-manifest/blob/master/LICENSE) [![Build Status](https://travis-ci.com/khalyomede/gridsome-plugin-manifest.svg?branch=master)](https://travis-ci.com/khalyomede/gridsome-plugin-manifest) [![codecov](https://codecov.io/gh/khalyomede/gridsome-plugin-manifest/branch/master/graph/badge.svg)](https://codecov.io/gh/khalyomede/gridsome-plugin-manifest) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/gridsome-plugin-manifest) ![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/gridsome-plugin-manifest) [![Maintainability](https://api.codeclimate.com/v1/badges/493c9113d81d8444ad82/maintainability)](https://codeclimate.com/github/khalyomede/gridsome-plugin-manifest/maintainability)

## Summary

-   [About](#about)
-   [Features](#features)
-   [Requirements](#requirements)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Changelog](CHANGELOG.md)
-   [API](#api)
-   [Known issues](#known-issues)
-   [Run the tests](#run-the-tests)

## About

I made this plugin because I use gridsome to make my next web app, and I wanted to have a way to just generate this file for me in order to pass the Lighthouse PWA manifest.json test.

## Features

-   Generates a `manifest.json` at the root of your dist folder at build time
-   Automatically generates 512, 192, 144, 98, 72, and 48px wide icons from your original icon
-   Adds a `<meta name="theme-color" />` and a `<link rel="manifest" />` (at build time) at the head of each of your HTML files

## Requirements

-   NPM or Yarn installed on your machine

## Installation

With NPM:

```bash
npm install --save-dev gridsome-plugin-manifest
```

With Yarn:

```bash
yarn add --dev gridsome-plugin-manifest
```

## Usage

In your file `gridsome.config.js`, add the following in the `plugin` key:

```javascript
module.exports = {
	siteName: "Gridsome",
	plugins: [
		{
			use: "gridsome-plugin-manifest",
			options: {
				background_color: "#000000",
				icon_path: "./src/assets/img/icon.png",
				name: "My app name",
				short_name: "App",
				theme_color: "#FFFFFF",
				lang: "en",
			},
		},
	],
};
```

Build your project:

-   With NPM: `npm run build`
-   With Yarn: `yarn build`

To check it work, serve your application locally, then use Chrome DevTools to run a check on the PWA "manifest" test to check it has successfuly taken your manifest file into account.

![google-dev-tools-showing-manifest-passes-test](https://user-images.githubusercontent.com/15908747/71518859-2dc07280-28b5-11ea-8713-600a6bd542f2.png)

## API

-   Options
    -   **background_color**: `String` The background of your PWA loading screen
    -   **name**: `String` The name displayed in your PWA loading screen
    -   **theme_color**: `String` The color of the text in your PWA loading screen
    -   **display**: `standalone` | `minimal-ui` | `fullscreen` (default: `minimal-ui`)
    -   **scope**: `String` The scope of your PWA (should be an absolute URL)
    -   **orientation**: `any` | `natural` | `landscape` | `landscape-primary` | `landscape-secondary` | `portrait` | `portrait-primary` | `portrait-secondary` (default: `any`)
    -   **start_url**: `String` The URL where the user will begin if he/she starts your PWA
    -   **file_name**: `String` The name of your manifest file (default: `manifest.json`)
    -   **icon_path**: `String` The path (include the file name) where your icon is stored at
    -   **dir**: `ltr` | `rtl` | `auto` The direction of the text (default: `auto`)
    -   **lang**: `String` An ISO 2 lang code to determine which lang the `name` and `short_name` are displayed on.
    -   **prefer_related_applications**: `Boolean` Whether to prompt to open any link with another app than this PWA or not (default: `false`).
    -   **related_applications**: `Array<RelatedApplication>`: A list of the related applications (see below for the prototype of a `RelatedApplication`).

```typescript
interface RelatedApplication {
	platform: string;
	url: string;
	id?: string;
}
```

_(`?:` means "non mandatory field")._

## Known issues

-   The icon **must** be square (the size that is used in the `icons` key of the `manifest.json` file is for the moment `width x width`, so for example a width of `512` will produce a `sizes` key equal to `512x512`)

## Run the tests

1. Clone the project: `git clone https://github.com/khalyomede/gridsome-plugin-manifest`
2. Install the dependencies
    - with NPM: `npm install`
    - with Yarn: `yarn install`
3. Run the tests
    - with NPM: `npm run test`
    - with Yarn: `yarn test`

You should see something like:

```
$ nyc mocha --require @babel/register test


  client
    √ should export a function

  server
    general
      √ should export a function
    defaultOptions
      √ should return default options


  3 passing (22ms)

-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |    17.8 |     4.88 |    9.52 |   18.92 |
 error-logger.js   |      80 |      100 |       0 |      80 | 8
 ...some.client.js |      50 |      100 |       0 |   66.67 | 2
 ...some.server.js |   13.76 |     4.88 |   10.53 |   14.56 | ...30-232,257-259
-------------------|---------|----------|---------|---------|-------------------
```
