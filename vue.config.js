// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-test-task-advanced/' : '/',

  outputDir: 'public',

  lintOnSave: process.env.NODE_ENV !== 'production',

  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/assets/styles/base/_variables.scss";
          @import "~@/assets/styles/utils/mixins/main.scss";
        `
      }
    }
  }
}