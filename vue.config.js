const webpackConfig = {
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
