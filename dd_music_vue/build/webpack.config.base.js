'use strict'
var webpack=require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const utils = require('./utils')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': utils.resolve('src'),
      '_c': utils.resolve('src/components'),
      '_a': utils.resolve('src/assets'),
      'static': utils.resolve('../static')
    }
  },

  module: {
    rules: [
//    {
//      test: /\.(js|vue)$/,
//      use: 'eslint-loader',
//      enforce: 'pre'
//    },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      },{
			  test: /\.less$/,
			  loader: "style-loader!css-loader!less-loader",
			}
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: utils.resolve('static/img'),
      to: utils.resolve('dist/static/img'),
      toType: 'dir'
    }])
  ]
}
