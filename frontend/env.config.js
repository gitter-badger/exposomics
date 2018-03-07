/* eslint flowtype/require-valid-file-annotation: 0 */

require('source-map-support/register');
require('babel-register');
const config = require('./config');
const pkg = require('./package.json');

module.exports = {
  'process.env.PUBLIC_URL': config.publicUrl,
  'process.env.GOOGLE_MAPS_API_KEY': config.googleMapsApiKey,
  'process.env.APP_VERSION': pkg.version,
};
