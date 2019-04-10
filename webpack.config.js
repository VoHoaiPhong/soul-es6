const { join, resolve } = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    join(__dirname, './root/init.js')
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
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties'
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
    minimizer: [new UglifyJSPlugin({
      cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true
    })]
  }
};