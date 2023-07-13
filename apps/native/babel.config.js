process.env.TAMAGUI_TARGET = 'native'

module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'nativewind/babel',
            [
                'module-resolver',
                {
                    alias: {
                        '@components': './src/components',
                        '@screens': './src/screens',
                        '@hooks': './src/hooks',
                    },
                },
            ],
            [
                'transform-inline-environment-variables',
                {
                    include: 'TAMAGUI_TARGET',
                },
            ],
            [
                '@tamagui/babel-plugin',
                {
                    components: ['tamagui'],
                    config: './tamagui.config.ts',
                    logTimings: true,
                },
            ],
            'react-native-reanimated/plugin',
        ],
    }
}
