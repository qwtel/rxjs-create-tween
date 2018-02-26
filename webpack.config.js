const { resolve } = require('path');

const {
  BannerPlugin,
  EnvironmentPlugin,
  optimize: {
    UglifyJsPlugin,
    ModuleConcatenationPlugin,
  },
} = require('webpack');

const merge = require('webpack-merge');
const { argv: { env } } = require('yargs');
const camelcase = require('camelcase');

const { name: filename } = require('./package.json');

const banner = String.prototype.trim.call(`
Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
`);
const library = camelcase(filename);
const min = env === 'prod' ? '.min' : '';

function envConfig() {
  switch (env) {
    case 'prod':
      return {
        plugins: [
          new BannerPlugin({ banner }),
          new EnvironmentPlugin({ DEBUG: false }),
          new UglifyJsPlugin(),
        ],
      };

    default:
      return {
        devtool: 'source-map',
        plugins: [
          new EnvironmentPlugin({ DEBUG: true }),
        ],
      };
  }
}

const baseConfig = merge({
  output: {
    path: resolve('./dist'),
    library,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    rxjs: {
      commonjs: 'rxjs',
      commonjs2: 'rxjs',
      amd: 'rxjs',
      root: 'Rx',
    },
  },
  resolve: {
    modules: [resolve('./node_modules')],
    extensions: ['.json', '.js'],
  },
  plugins: [
    new ModuleConcatenationPlugin(),
  ],
}, envConfig());

const config = [
  merge(baseConfig, {
    entry: resolve('./index.js'),
    output: {
      filename: `index${min}.js`,
    },
  }),
];

module.exports = config;
