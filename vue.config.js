const path = require('path')

const configUpdates = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            _icons: path.resolve(__dirname, 'src/assets/icons')
        }
    }
};

module.exports = {
    configureWebpack: config => {
        return configUpdates
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
    }
};
