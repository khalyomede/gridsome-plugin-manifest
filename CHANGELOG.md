# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

-   Bug when upgrading the dependencies would cause Sharp to be built twice, on differents version, leading to libvips to not be usable by the plugin. Now, the version of sharp has been corrected to not produce 2 installation of Sharp.

## [0.3.3] 2020-01-12

### Fixed

-   Building a Gridsome project using this plugin on Netlify will not make the build fail anymore (due to the removal of a package that was causing the issue).

### [0.3.2] 2020-01-05

### Fixed

-   The error when you do not add an `icon_path` or have this option targeting a non existing file will now be more explicit, rather than being cryptic (because thrown by a dependency).

## [0.3.1] 2019-12-28

### Fixed

-   Bug when the manifest file were not found (the error was visible in the browser console) in development mode. Instead, it will now be removed in development mode, but still generated (with its `<link rel="manifest" />`) at build time.

## [0.3.0] 2019-12-27

### Breaking

-   You will need to add an ISO 2 `lang` value in your configuration in order to keep generating a manifest file without issues.

### Added

-   Support for the keys `dir`, `lang`, `prefer_related_applications` and `related_applications` in the manifest: they are now configurable and will be outputed in the `manifest.json` file.

### Fixed

-   The names of the different options in the API section of the README have been updated to reflect the changes in the version `0.2.0`.
-   The manifest file will now be served with the MIME type `application/manifest+json` instead of `application/json` to respect the standard.

## [0.2.1] - 2019-12-26

### Fixed

-   The documentation example showing the necessary keys to add to the `options` key of the plugin have been updated to follow one of the fix that the version `0.2.0` provided.

## [0.2.0] - 2019-12-26

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
