module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{css,ico,jpg,png,svg,html,js}"],
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|json)$/,
      handler: "StaleWhileRevalidate",
    },
  ],
  swDest: "dist/sw.js",
};
