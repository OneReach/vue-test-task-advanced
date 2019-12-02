// vue.config.js
module.exports = {
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
