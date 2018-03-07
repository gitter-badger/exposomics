/* eslint flowtype/require-valid-file-annotation: 0 */

const fs = require('fs');
const trash = require('trash');

module.exports = {
  webpack: config => {
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'UglifyJsPlugin'
    );

    config.module.rules.push({
      test: /\.(css|scss|sass)$/,
      use: [
        {
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext]',
          },
        },
        {
          loader: 'skeleton-loader',
          options: {
            procedure(content) {
              const fileName = `${this._module.userRequest}.json`;
              const classNames = fs.readFileSync(fileName, 'utf8');

              trash(fileName);

              return [
                'module.exports = {',
                `classNames: ${classNames},`,
                `stylesheet: ${JSON.stringify(content)}`,
                '}',
              ].join('');
            },
          },
        },
        'sass-loader',
        'postcss-loader',
      ],
    });

    return config;
  },
};
