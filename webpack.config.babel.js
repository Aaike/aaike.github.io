
import path from 'path';
import fs from 'fs';

import minimist from 'minimist';
import webpack from 'webpack';
import chalk from 'chalk';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import CleanCSS from 'clean-css';
import autoprefixer from 'autoprefixer';

import uglify from 'uglify-js';

import {paths, patterns} from './project-config';

const pkg = require('./package.json');
const argv = minimist(process.argv.slice(2), {
  default: {
    env: 'development',
    port: 9000,
  }
});

let config = Object.assign({
  env: process.env.NODE_ENV,
  port: process.env.PORT
}, argv);

// set final NODE_ENV
process.env.NODE_ENV = argv.env;

const urlPrefix = '';

function isProd() {
  return process.env.NODE_ENV === 'production';
}

let devtool = 'source-map';

let entry = {
  bundle: ['./src/app/index']
};

let output = {
  path: path.resolve(paths.output),
  publicPath: urlPrefix
};

let uglifyOptions = {
  fromString: true,
  mangle: false,
  output: {}
};

let htmlConfig = {
  title: 'Aaike Van Roekeghem Curriculum Vitae',
  filename: 'index.html',
  template: 'src/platforms/browser/index.ejs',
  inject: 'body',
  //chunks: ['main'],
  pkg,
  urlPrefix
};

let plugins = [
  new HtmlWebpackPlugin(htmlConfig),
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify('process.env.NODE_ENV'),
    __URLPREFIX__: urlPrefix,
  }),
  new webpack.ProvidePlugin({
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
];

let preloaders = [];

if (isProd()) {

  htmlConfig.minify = {
    removeComments: true,
    collapseWhitespace: true
  };

  plugins = plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(uglifyOptions)
  ]);

  output.filename = 'bundle-[hash].js';
  output.chunkFilename = '[name]-[hash].js';
}else {

  //add hot module reloading client as an entry during dev
  entry = Object.keys(entry).reduce((result, key)=> {
    result[key] = ['webpack-hot-middleware/client'].concat(entry[key]);
    return result;
  }, {});

  // add hot module replacement plugin
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]);

  output.filename = 'bundle-[hash].js';
  output.chunkFilename = '[name]-[hash].js';
}

//use eslint if the --lint flag was used
if (argv.lint) {
  preloaders = preloaders.concat([
    {test: /\.jsx?$/, loader: 'eslint', exclude: /dist|lib|bower_components|node_modules|bundle.js/},
  ]);
} else {
  plugins.push(new webpack.NoErrorsPlugin());
}

//eslint settings
let eslint = {
  configFile: '.eslintrc',
  //formatter: require('eslint/lib/formatters/stylish'),
  failOnWarning: false,
  failOnError: false
};

let postcss = [
  autoprefixer({ browsers: ['last 2 versions'] }),
  // precss()
];

let webpackConfig = {
  devtool,
  cache: true,
  entry,
  debug: true,
  devServer: {
    contentBase: paths.output,
    //hot: true,
    //inline: true,
    historyApiFallback: true,
    port: config.port
  },
  output,
  module: {
    loaders: [

      //--- Templates
      // HTML template files
      { test: /\.tpl\.html$/, loader: 'ng-cache?prefix=[dir]&module=anx.console.templates' },
      { test: /\.html$/,      loader: 'raw', exclude: /\.tpl\.html$/ },

      //--- TypeScript
      {
        test: /\.tsx?$/,
        loader: 'babel!ts',
        include: [
          path.resolve(__dirname, 'src/app')
        ]
      },

      //--- JavaScript
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, 'src/app')
        ]
      },

      // JSON
      {
        test: /\.json$/,
        loader: 'json'
      },

      //--- Fonts
      {
        test: [/\.svg/, /\.eot/, /\.ttf/, /\.woff/, /\.woff2/],
        loader: 'file?name=fonts/[name].[ext]'
      },

      //--- Images
      // by using the url-loader it will inline png files if they are smaller than 10 kb,
      // otherwise a public url is used and the png file will be served in the output directory (using file-loader)
      { test: /\.png$/, loader: 'url?limit=100000' },
      // jpg files are never inlined
      { test: /\.jpg$/, loader: 'file' },
      // convert svg files to react components
      { test: /\.svg$/, loader: 'babel!svg-react' },

      //--- Styles
      { test: /\.css$/,       loader: 'style!css' },
      { test: /\.scss$/,      loader: 'style!css!sass' },

      //----- Other
      { test: /\.json$/,      loader: 'json' }
    ],
    preLoaders: preloaders,
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    alias: {
      //'app': path.resolve(__dirname, 'src/app')
    }
    /*modulesDirectories: ['node_modules', 'node_modules/anx-monorepo/dist'],
    resolve: { fallback: path.join(__dirname, 'node_modules') },
    resolveLoader: {
      fallback: path.join(__dirname, 'node_modules')
    }*/
    //prefer local install node_modules (must use when working with locally linked npm packages)
    // root: path.resolve(__dirname, 'node_modules'),
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'src/app'),
    ]
  },
  postcss,
  plugins,
  eslint
};

export default webpackConfig;
