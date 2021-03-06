const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'https://bmft.tech/leetcode/',
    // target: 'http://localhost:7001/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    },
  }));
}
