const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://yts.mx",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // 경로 리다이렉션 없이 대상 서버로 전달
      },
    })
  );
};
