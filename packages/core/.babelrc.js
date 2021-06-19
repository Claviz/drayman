module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        [
            '@babel/plugin-transform-react-jsx',
            {
                'runtime': 'automatic',
                'importSource': '../',
                'throwIfNamespace': false
            }
        ]
    ],

};