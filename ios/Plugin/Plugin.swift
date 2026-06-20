import Capacitor
import Foundation
import StoreKit
import UIKit

/// iOS implementation. Wraps `SKStoreReviewController.requestReview(in:)`
/// (iOS 14+), which is fire-and-forget and OS-throttled: we resolve
/// `{ shown: true }` once dispatched, since there is no "did it render" callback.
/// Conforms to `CAPBridgedPlugin` to self-register on the Capacitor 8 bridge.
@objc(InAppReviewPlugin)
public class InAppReviewPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "InAppReviewPlugin"
    public let jsName = "InAppReview"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "requestReview", returnType: CAPPluginReturnPromise)
    ]

    @objc func requestReview(_ call: CAPPluginCall) {
        // SKStoreReviewController must run on the main thread; hop explicitly.
        DispatchQueue.main.async {
            guard let scene = self.activeWindowScene() else {
                call.resolve(["shown": false, "reason": "no_window_scene"])
                return
            }
            SKStoreReviewController.requestReview(in: scene)
            call.resolve(["shown": true])
        }
    }

    /// Foreground-active `UIWindowScene` to present in, falling back to any scene.
    private func activeWindowScene() -> UIWindowScene? {
        let scenes = UIApplication.shared.connectedScenes.compactMap {
            $0 as? UIWindowScene
        }
        return scenes.first { $0.activationState == .foregroundActive }
            ?? scenes.first
    }
}
