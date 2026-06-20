export interface RequestReviewResult {
  /**
   * Whether the JS-to-native bridge completed a request to the platform review
   * API. This does NOT indicate the user actually saw the dialog: the
   * underlying OS review APIs silently no-op when their (undocumented)
   * frequency quota is exceeded and do not report back.
   */
  shown: boolean;
  /**
   * Failure or no-op reason when `shown` is false (e.g. `"request_failed"`,
   * `"launch_failed"`, `"no_activity"`, `"no_window_scene"`, `"web"`).
   */
  reason?: string;
  /**
   * Android Play `@ReviewErrorCode` (or the GMS `statusCode`) when a request or
   * launch flow failed with a `ReviewException` / `ApiException`. Absent for
   * benign quota no-ops and on iOS.
   */
  code?: number;
  /** Underlying failure message when `shown` is false, for diagnostics. */
  message?: string;
}

export interface InAppReviewPlugin {
  /**
   * Ask the operating system to display its native in-app review prompt.
   *
   * - **Android**: Google Play In-App Review (Play Core).
   * - **iOS**: `SKStoreReviewController.requestReview(in:)` (iOS 14+).
   * - **Web**: resolves `{ shown: false, reason: "web" }`, so the call is safe
   *   from any environment without a platform check.
   *
   * Both native APIs are fire-and-forget and heavily throttled by the OS, so a
   * resolved `{ shown: true }` means the request reached the platform, not that
   * the user saw (or will see) the dialog. Implement your own
   * eligibility/cooldown policy in app code.
   *
   * @since 0.1.0
   */
  requestReview(): Promise<RequestReviewResult>;
}
