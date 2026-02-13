module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    '@': './src',
                    '@components': './src/components',
                    '@screens': './src/screens',
                    '@store': './src/store',
                    '@theme': './src/theme',
                    '@services': './src/services',
                    '@navigation': './src/navigation',
                    '@assets': './src/assets',
                    '@hooks': './src/hooks',
                    '@utils': './src/utils',
                    '@types': './src/types',
                },
            },
        ],
        'react-native-reanimated/plugin',
    ],
};
