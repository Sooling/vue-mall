const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
};
module.exports = {//这里的配置会和node_modules里的配置合并
    publicPath: './',
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
						.set('@common', resolve('src/common'))
            .set('@img', resolve('src/assets/img'))
            .set('@css', resolve('src/assets/css'))
            .set('@components', resolve('src/components'))
            .set('@router', resolve('src/router'))
            .set('@views', resolve('src/views'))
						.set('@network', resolve('src/network'))
    }
}