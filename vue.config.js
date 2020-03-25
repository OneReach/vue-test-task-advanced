module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/styling/styles-global.scss";
        `
      }
    }
  }
}
