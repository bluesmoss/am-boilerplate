const path  = require('path');
const webpack = require('webpack');

const copyWebpackPlugin =  require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE.ENV === 'dev';

const appDirectory = path.join(__dirname, 'app');
const sharedDirectory = path.join(__dirname, 'shared');
const stylesDirectory = path.join(__dirname, 'styles');
const nodeDirectory = 'node_modules';

console.log('Testing paths',appDirectory, sharedDirectory, stylesDirectory);

module.exports = {
    entry: [
        path.join(appDirectory, 'index.js'),
        path.join(stylesDirectory, 'index.scss')

    ],
    resolve: {
        modules : [
            appDirectory,
            sharedDirectory,
            stylesDirectory,
            nodeDirectory
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEVELOPMENT
          }),
      
          new copyWebpackPlugin({
            patterns: [
              {
                from: './shared',
                to: ''
              }
            ]
          }),

          new MiniCssExtractPlugin({
              filename: '[name].css',
              chunkFilename: '[id].css'
          }),

          new ImageMinimizerPlugin({
            minimizerOptions: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 8 }]
              ]
            }
          }),
      
          new CleanWebpackPlugin()          
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          }
        },
  
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: ''
              }
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
  
        {
          test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
          loader: 'file-loader',
          options: {
            name (file) {
              return '[hash].[ext]'
            }
          }
        },
  
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/i,
          use: [
            {
              loader: ImageMinimizerPlugin.loader
            }
          ]
        },
  
        {
          test: /\.(glsl|frag|vert)$/,
          loader: 'raw-loader',
          exclude: /node_modules/
        },
  
        {
          test: /\.(glsl|frag|vert)$/,
          loader: 'glslify-loader',
          exclude: /node_modules/
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }
}