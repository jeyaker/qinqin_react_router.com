const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path');

function pathResolve(val) {
    return path.join(__dirname, val);
}

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    addWebpackAlias({
        '@': pathResolve('./src'),
        'assets': pathResolve('./src/assets'),
        'components': pathResolve('./src/components'),
        'layout': pathResolve('./src/layout'),
        'pages': pathResolve('./src/pages'),
        'utils': pathResolve('./src/utils')
    })
);