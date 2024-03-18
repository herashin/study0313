// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/users", {
      target:
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year",
      changeOrigin: true,
    })
  );
};
