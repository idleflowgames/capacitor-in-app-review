# @idleflowgames/capacitor-in-app-review

Capacitor 8 plugin for native in-app review prompts. Wraps **Google Play In-App
Review** (Play Core) on Android and **`SKStoreReviewController`** on iOS, with a
safe no-op fallback on web.

The OS owns the prompt: both platforms heavily throttle how often the dialog can
appear and never report whether the user actually saw it. This plugin asks the
platform to show the prompt and tells you whether the request reached native. The
eligibility policy (minimum sessions, days since install, cooldown between asks)
is yours to implement in app code.

## Install

```bash
npm install @idleflowgames/capacitor-in-app-review
npx cap sync
```

## Supported platforms

| Platform | Backing API                            | Notes                                            |
| -------- | -------------------------------------- | ------------------------------------------------ |
| Android  | Google Play In-App Review (Play Core)  | Requires the app installed from Google Play.     |
| iOS      | `SKStoreReviewController` (iOS 14+)    | System-throttled to a few prompts per 365 days.  |
| Web      | none                                   | Resolves `{ shown: false, reason: "web" }`.      |

## Usage

```ts
import { InAppReview } from "@idleflowgames/capacitor-in-app-review";

const { shown, reason } = await InAppReview.requestReview();
if (!shown) {
  // Benign: quota reached, no foreground activity/scene, or running on web.
  console.debug("review prompt not requested:", reason);
}
```

`requestReview()` resolves `{ shown: true }` once the request reached the platform.
Treat that as "requested", not "seen": the OS may suppress the dialog silently and
does not report back.

## API

<docgen-index>

* [`requestReview()`](#requestreview)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### requestReview()

```typescript
requestReview() => Promise<RequestReviewResult>
```

Ask the operating system to display its native in-app review prompt.

- **Android**: Google Play In-App Review (Play Core).
- **iOS**: `SKStoreReviewController.requestReview(in:)` (iOS 14+).
- **Web**: resolves `{ shown: false, reason: "web" }`, so the call is safe
  from any environment without a platform check.

Both native APIs are fire-and-forget and heavily throttled by the OS, so a
resolved `{ shown: true }` means the request reached the platform, not that
the user saw (or will see) the dialog. Implement your own
eligibility/cooldown policy in app code.

**Returns:** <code>Promise&lt;<a href="#requestreviewresult">RequestReviewResult</a>&gt;</code>

**Since:** 0.1.0

--------------------


### Interfaces


#### RequestReviewResult

| Prop          | Type                 | Description                                                                                                                                                                                                                                                         |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`shown`**   | <code>boolean</code> | Whether the JS-to-native bridge completed a request to the platform review API. This does NOT indicate the user actually saw the dialog: the underlying OS review APIs silently no-op when their (undocumented) frequency quota is exceeded and do not report back. |
| **`reason`**  | <code>string</code>  | Failure or no-op reason when `shown` is false (e.g. `"request_failed"`, `"launch_failed"`, `"no_activity"`, `"no_window_scene"`, `"web"`).                                                                                                                          |
| **`code`**    | <code>number</code>  | Android Play `@ReviewErrorCode` (or the GMS `statusCode`) when a request or launch flow failed with a `ReviewException` / `ApiException`. Absent for benign quota no-ops and on iOS.                                                                                |
| **`message`** | <code>string</code>  | Underlying failure message when `shown` is false, for diagnostics.                                                                                                                                                                                                  |

</docgen-api>

## Development

```bash
pnpm install
pnpm verify      # lint + typecheck + build + pack check
```

The TypeScript bridge is built to `dist/` (ESM + CJS + types). The native sources
under `android/` and `ios/` ship in the package and are wired up by `npx cap sync`.

## License

[MIT](./LICENSE) © Idle Flow Games
