var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: './dev/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {

          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.entry = './src/index.js'

  module.exports.output = {
    path: path.resolve(__dirname, './dist'),
    filename:'index.js',
    library:'vue-popup',
    libraryTarget: 'umd'
  }
  module.exports.devtool = '#source-map'
  module.exports.module.rules[0].options.loaders = {
    css: ExtractTextPlugin.extract({
      use: 'css-loader',
      fallback: 'vue-style-loader'
    }),
    less: ExtractTextPlugin.extract({
      use: 'css-loader!less-loader',
      fallback: 'vue-style-loader'
    })
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin("style.css")
  ])
}
