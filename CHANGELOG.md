# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-07-30

### Changed

- Toolchain to latest, no plugin behavior change: TypeScript 7.0.2 (the native
  `tsgo` compiler), Biome 2.5.6, Capacitor 8.4.2, rollup 4.62.3, rimraf 6.1.3,
  `@capacitor/docgen` 0.3.1, pnpm 11.18.0.
- Android: Android Gradle Plugin 9.3.1, Kotlin Gradle Plugin 2.4.10.
- iOS: `capacitor-swift-pm` floor 8.4.2.
- CI: `actions/checkout` v7, `actions/setup-node` v7, `pnpm/action-setup` v6.

## [0.1.1] - 2026-07-12

### Fixed

- SwiftPM package, product, and target renamed to
  `IdleflowgamesCapacitorInAppReview` so it matches the name `cap sync ios`
  derives from the scoped npm package. `xcodebuild
  -resolvePackageDependencies` failed with "product
  'IdleflowgamesCapacitorInAppReview' not found" before this.

## [0.1.0] - 2026-06-20

### Added

- Initial release.
- `requestReview()` wrapping Google Play In-App Review (Play Core) on Android and
  `SKStoreReviewController` on iOS, with a safe `{ shown: false, reason: "web" }`
  fallback on web.
- iOS plugin registers via `CAPBridgedPlugin` (Capacitor 8 Swift registration, no
  Objective-C `.m` file required).
