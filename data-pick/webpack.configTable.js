var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  // target: 'node',
  entry: './src/components/indexTable.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vueTable.js',
    library: 'vueTable',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {     //处理js中引入的css
        test: /\.css$/,
        loader: ['css-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-loader']
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
  plugins: [
    new ExtractTextPlugin({filename: 'halower-tree.min.css', allChunks: true})
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  externals: [
    'vue',
    'jQuery',
    'cabin/lib/daterangepicker/daterangepicker',
    'cabin/lib/daterangepicker/moment',
    'cabin/lib/chosen/chosen.jquery.js',
    'cabin/widgets/vueChosen/vueChosen',
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false
    })
  ])
}
