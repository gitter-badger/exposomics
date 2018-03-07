// @flow

/* eslint global-require: 0 */

module.exports = {
  plugins: [
    require('postcss-cssnext')(),
    require('postcss-modules')({
      generateScopedName: '[local]-[hash:base64:5]',
    }),
    // require('cssnano')(),
  ],
};
