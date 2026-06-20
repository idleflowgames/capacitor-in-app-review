# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-20

### Added

- Initial release.
- `requestReview()` wrapping Google Play In-App Review (Play Core) on Android and
  `SKStoreReviewController` on iOS, with a safe `{ shown: false, reason: "web" }`
  fallback on web.
- iOS plugin registers via `CAPBridgedPlugin` (Capacitor 8 Swift registration, no
  Objective-C `.m` file required).
