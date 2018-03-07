/* eslint flowtype/require-valid-file-annotation: 0 */

const dotenv = require('dotenv');
const rc = require('rc');

dotenv.config();

module.exports = rc('exposomics', {
  publicUrl: 'https://exposomics.doc.ai',
  googleMapsApiKey: 'SPECIFY_REAL_KEY_IN_ENV',
});
