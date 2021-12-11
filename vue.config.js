module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" }
      }
    }
  },

  pwa: {
    name: 'Just Pick Something'
  },

  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
};
