module.exports = function (api) {
    api.cache(true)
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "nativewind/babel",
            [
                "module:react-native-dotenv",
                {
                    envName: "APP_ENV",
                    moduleName: "@env",
                    path: ".env",
                },
            ],
            "react-native-reanimated/plugin",
            [
                "module-resolver",
                {
                    alias: {
                        "@components": "./src/components",
                        "@screens": "./src/screens",
                        "@hooks": "./src/hooks",
                        "@libs": "./src/libs",
                    },
                },
            ],
        ],
    }
}
