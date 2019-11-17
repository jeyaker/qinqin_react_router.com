const Proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(Proxy('/index.php', {
        target: 'http://www.qinqin.net',
        changeOrigin: true
    }));
}