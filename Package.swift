// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorInAppReview",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorInAppReview",
            targets: ["CapacitorInAppReview"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.4.0")
    ],
    targets: [
        .target(
            name: "CapacitorInAppReview",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Plugin"
        )
    ]
)
