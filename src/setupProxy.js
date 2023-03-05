const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/notes',
    createProxyMiddleware({
      target: 'https://shineenoki.github.io/note-json-server',
      changeOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  );
};
