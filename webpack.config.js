//* ===============================================================================================
//* WEBPACK 5.19.0 - ARCHIVO DE CONFIGURACIÓN VERSIÓN 0.8.0 - 10/02/2021 04:00 PM
//* ===============================================================================================
//* Funcionando: HTML, PUG, CSS, SCSS, JS BABEL, FAVICON, IMAGES, DEVTOOL, DEV SERVER, ESLint
//* ===============================================================================================

//* ===============================================================================================
//* 1.- IMPORTACIONES
//* ===============================================================================================
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
//* ===============================================================================================

//* ===============================================================================================
//* 2.- CONSTANTES, VARIABLES Y COMPROBACIONES DE ESTAR EN PRODUCCIÓN O DESARROLLO
//* ===============================================================================================
let mode = 'development';
let target = 'web';
let isProduction = false;

if (process.env.NODE_ENV === 'production') {
 mode = 'production';
 target = 'browserslist';
 isProduction = true;
}
//* ===============================================================================================

//* ===============================================================================================
//* 3.- OPTIONS
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* 3.1.- devServer ("webpack-dev-server": "^3.11.2")
//* ---------------------------------------------------------------------------------------------
const devServerOptions = {
 contentBase: './dist',
 compress: true,
 port: 9000,
 open: true,
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 3.2.- HtmlWebpackPlugin (MINIFY)
//* ---------------------------------------------------------------------------------------------
const minifyOptions = {
 collapseWhitespace: true,
 keepClosingSlash: true,
 removeComments: true,
 removeRedundantAttributes: true,
 removeScriptTypeAttributes: true,
 removeStyleLinkTypeAttributes: true,
 useShortDoctype: true,
};
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================

//* ===============================================================================================
//* 4.- RULES
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* 4.1.- PUG
//* ---------------------------------------------------------------------------------------------
const pugRules = {
 test: /\.pug$/,
 exclude: /node_modules/,
 use: {
  loader: 'pug-loader',
 },
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.2.- SCSS
//* ---------------------------------------------------------------------------------------------
const scssRules = {
 test: /\.s?[ac]ss$/i,
 exclude: /node_modules/,
 use: [
  {
   loader: MiniCssExtractPlugin.loader,
   options: {
    publicPath: '../',
   },
  },
  'css-loader',
  'postcss-loader',
  'sass-loader',
 ],
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.3.- JavaScript (Babel)
//* ---------------------------------------------------------------------------------------------
const javaScriptRules = {
 test: /\.js$/,
 exclude: /(node_modules|bower_components)/,
 use: {
  loader: 'babel-loader',
 },
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.3.- FAVICON (asset/resource)
//* ---------------------------------------------------------------------------------------------
const faviconRules = {
 test: /\.ico$/i,
 exclude: /node_modules/,
 type: 'asset/resource',
 generator: {
  filename: 'assets/favicon/[name][ext]',
 },
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.4.- IMAGES (asset/resource y image-minimizer-webpack-plugin)
//* ---------------------------------------------------------------------------------------------
const imagesRules = {
 test: /\.(jpe?g|png|gif|svg)$/i,
 exclude: /node_modules/,
 type: 'asset/resource',
 generator: {
  filename: 'assets/images/[name][ext]',
 },
 use: [
  {
   loader: ImageMinimizerPlugin.loader,
   options: {
    severityError: 'warning',
    minimizerOptions: {
     plugins: [
      ['mozjpeg', { quality: 70, progressive: true }], // quality: 0 - 100
      ['pngquant', { quality: [0.65, 0.9], speed: 4 }], // speed: 1 - 11
      ['gifsicle', { interlaced: true, optimizationLevel: 2 }], // optimizationLevel: 1 - 3
      ['svgo', { plugins: [{ removeViewBox: false }] }],
     ],
    },
   },
  },
 ],
};
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================

//* ===============================================================================================
//* 5.- PRINCIPAL
//* ===============================================================================================
module.exports = {
 mode,
 target,
 //* 5.1.- ENTRY (Entrada)
 entry: './src/js/index.js',

 //* 5.2.- OUTPUT (Salida)
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'js/main.[contenthash].js',
 },

 //* 5.3.- RULES (Reglas Y Loaders)
 module: {
  rules: [pugRules, scssRules, javaScriptRules, faviconRules, imagesRules],
 },

 //* 5.4.- PLUGINS (Complementos)
 plugins: [
  new HtmlWebpackPlugin({
   template: './src/views/pages/index.pug',
   filename: 'index.html',
   inject: 'body',
   minify: isProduction ? minifyOptions : false,
  }),
  new HtmlWebpackPlugin({
   template: './src/views/pages/search.pug',
   filename: 'search.html',
   inject: 'body',
   minify: isProduction ? minifyOptions : false,
  }),
  new HtmlWebpackPlugin({
   template: './src/views/pages/favorites.pug',
   filename: 'favorites.html',
   inject: 'body',
   minify: isProduction ? minifyOptions : false,
  }),
  new MiniCssExtractPlugin({
   filename: 'css/main.[contenthash].css',
  }),
 ],

 //* 5.5.- SOURCE MAP
 devtool: 'source-map',

 //* 5.6.- DEVSERVER (Servidor de desarrollo)
 devServer: devServerOptions,
};
//* ===============================================================================================
