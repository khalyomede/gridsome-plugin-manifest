# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   A `<meta name="theme-color" />` will be automatically added to the head of your html files (using the `theme_color` value you provided in the options in the file `gridsome.client.js`).

### Fixed

-   The default `display` option in the manifest will now be `minimal-ui` (instead of `browser`) to fix a bug when Lighthouse was not recognizing the `browser` display value.
-   The `manifest.json` file will be correctly formed (previously, pascal cased keys were used, now this file is generated using correct snake cased keys).

## [0.1.1] - 2019-12-25

### Fixed

-   Bug when the `fileName` option was forbidden instead of being allowed.

## [0.1.0] - 2019-12-25

### Added

-   First working version
