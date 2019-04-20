const { join, resolve } = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const mode = process.env.MODE.toUpperCase().includes('PRODUCTION') ? 'production' : 'development';
const isProd = mode.includes('production');

const externals = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    externals[mod] = `commonjs ${mod}`;
  });

module.exports = {
  externals,
  entry: [
    '@babel/polyfill',
    './root/init.js'
  ],
  target: 'node',
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: resolve('./'),
  output: {
    filename: 'index.js',
    sourceMapFilename: 'index.map',
    path: join(__dirname, './dist')
  },
  mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  node: 'current'
                }
              }]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-spread',
              ['@babel/plugin-transform-classes', {
                'loose': true
              }]
            ]
          }
        }
      }
    ],
    exprContextCritical: false
  },
  resolve: {
    extensions: ['.js'],
    modules: [resolve('./'), 'node_modules'],
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  }
};