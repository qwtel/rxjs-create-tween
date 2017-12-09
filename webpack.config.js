const { readFileSync } = require('fs');
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

const library = camelcase(filename);
const min = env === 'prod' ? '.min' : '';
const banner = readFileSync(resolve('LICENSE'), 'utf-8')
  .replace(/mit license/i, '')
  .trim();

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
    modules: [
      resolve('./node_modules'),
      resolve(process.env.NODE_PATH), // TODO: save?
    ],
    extensions: ['.json', '.js'],
    symlinks: true,
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
