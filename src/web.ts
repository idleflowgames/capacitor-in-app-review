import { WebPlugin } from "@capacitor/core";

import type { InAppReviewPlugin, RequestReviewResult } from "./definitions";

/** Web fallback: resolves a "not shown" result so the call is safe off-platform. */
export class InAppReviewWeb extends WebPlugin implements InAppReviewPlugin {
  async requestReview(): Promise<RequestReviewResult> {
    return { shown: false, reason: "web" };
  }
}
