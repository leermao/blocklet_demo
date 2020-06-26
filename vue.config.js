const webpackConfig = {
  publicPath: process.env.NODE_ENV === "production" ? "/static/" : "/",
  pages: {
    index: {
      // page 的入口
      entry: "src/pages/index/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "PC端查询页面",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    mobile: {
      // page 的入口
      entry: "src/pages/mobile/main.js",
      // 模板来源
      template: "public/mobile.html",
      // 在 dist/mobile.html 的输出
      filename: "mobile.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "PC端查询页面",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "mobile"],
    },
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changOrigin: true,
      },
    },
  },
};

module.exports = webpackConfig;
