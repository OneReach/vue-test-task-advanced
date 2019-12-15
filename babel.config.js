module.exports = {
  presets: [],
  env: {
    production: {
      // production environment transforms
      presets: ['@vue/app'],
    },
    development: {
      // development environment transforms
      presets: ['@vue/app'],
    },
    test: {
      // test environment transforms
      presets: ['@babel/preset-env'],
    },
  },
  plugins: ['@babel/plugin-syntax-dynamic-import'],
};
