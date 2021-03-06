const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
<<<<<<< HEAD
    target: 'https://bmft.tech/leetcode/',
=======
    // target: 'https://bmft.tech/leetcode/',
    target: 'http://localhost:7001/',
>>>>>>> 5d8d99347bb0eed76179775a9285ab2d3e5aca9c
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    },
  }));
}
