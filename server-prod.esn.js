import path from 'path';
import express from 'express';
import fs from 'fs';
import url from 'url';

import serveIndex from 'serve-index';
import serveStatic from 'serve-static';

import compression from 'compression';
import finalhandler from 'finalhandler';
import history from 'connect-history-api-fallback';
import minimist from 'minimist';

import {paths} from './project-config';

//parse cli arguments
let argv = minimist(process.argv.slice(2));

const app = express();

// override node environment if --env flag was set to prod
process.env.NODE_ENV = 'development';
if (argv.prod) process.env.NODE_ENV = 'production';

// host flag
let host = 'localhost';
if (argv.host) host = argv.host;

// port flag
let port = process.env.PORT || 8080;
if (argv.port) port = argv.port;


app.use(compression());
app.use(history());
app.use('/', express.static(paths.output));

app.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Listening at http://${host}:${port}`);
});
