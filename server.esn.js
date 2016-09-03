import path from 'path';
import express from 'express';
import webpack from 'webpack';
import fs from 'fs';
import url from 'url';

import serveIndex from 'serve-index';
import serveStatic from 'serve-static';

import compression from 'compression';
import finalhandler from 'finalhandler';
import history from 'connect-history-api-fallback';
import minimist from 'minimist';
import config from './webpack.config.babel.js';

import {paths} from './project-config';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';

//parse cli arguments
let argv = minimist(process.argv.slice(2), {
  default: {
    env: 'development',
    host: 'localhost',
    port: '8080',
  }
});

// override node environment if --env flag was set to prod
process.env.NODE_ENV = argv.prod;

let buildCount = 0;

config.plugins.push(new ProgressBarPlugin({
  format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
  clear: false,
  callback: () => {
    if (!buildCount) {
      console.log(`Dev server is running at http://${argv.host}:${argv.port}`);
    }
    buildCount++;
  }
}))

// create the server
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: !argv.detail,
  quiet: false,
  stats: {
    colors: true,
  },
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

let demo = 'styleguide';
if (argv.demo) demo = argv.demo;

app.use(compression());
app.use(history());
app.use('/', express.static(paths.output));


// run the server
app.listen(argv.port, argv.host, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
