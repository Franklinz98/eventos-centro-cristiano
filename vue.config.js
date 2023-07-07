// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: "src/main.ts",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Eventos Centro Cristiano",
    },
  },
};
