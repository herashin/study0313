const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/assets/images",
    createProxyMiddleware({
      target: "https://yts.mx",
      changeOrigin: true,
    })
  );
};
