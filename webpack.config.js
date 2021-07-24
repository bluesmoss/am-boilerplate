const path  = require('path');
const webpack = require('webpack');

const copyWebpackPlugin =  require('copy-webpack-plugin');
const minissExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
          })
    ],
}