package com.idleflowgames.inappreview

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.android.gms.common.api.ApiException
import com.google.android.play.core.review.ReviewException
import com.google.android.play.core.review.ReviewManagerFactory

/**
 * Capacitor 8 plugin wrapping Google Play In-App Review (Play Core). Asks Play to
 * show the dialog and reports whether the bridge call completed; it cannot observe
 * whether the user actually saw the prompt. Cooldown/quota gating is the caller's.
 */
@CapacitorPlugin(name = "InAppReview")
class InAppReviewPlugin : Plugin() {
    @PluginMethod
    fun requestReview(call: PluginCall) {
        val activity = activity
        if (activity == null) {
            call.resolve(JSObject().put("shown", false).put("reason", "no_activity"))
            return
        }
        val manager = ReviewManagerFactory.create(activity.applicationContext)
        manager.requestReviewFlow()
            .addOnCompleteListener { request ->
                if (!request.isSuccessful) {
                    call.resolve(failure("request_failed", request.exception))
                    return@addOnCompleteListener
                }
                manager.launchReviewFlow(activity, request.result)
                    .addOnCompleteListener { flow ->
                        if (!flow.isSuccessful) {
                            call.resolve(failure("launch_failed", flow.exception))
                            return@addOnCompleteListener
                        }
                        // Resolves true even if the dialog didn't render (a hard
                        // Play API limit: quota no-ops still report success).
                        call.resolve(JSObject().put("shown", true))
                    }
            }
    }

    /** Build a `{ shown:false, reason, code?, message? }` payload exposing the failure. */
    private fun failure(reason: String, e: Exception?): JSObject {
        val payload = JSObject().put("shown", false).put("reason", reason)
        e?.message?.let { payload.put("message", it) }
        val code = (e as? ReviewException)?.errorCode ?: (e as? ApiException)?.statusCode
        code?.let { payload.put("code", it) }
        return payload
    }
}
