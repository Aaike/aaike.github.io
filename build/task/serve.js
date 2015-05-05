/**
 * Serve the app
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');

var fs = require("fs");
var express = require('express');
var compression = require('compression');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var favicon = require('serve-favicon');

var basepath = gulp.config.basePath;

var oneDay = 86400000;
var oneHour = 3600000;

gulp.task('serve',['build'], function(done) {

  var app = express();
  app.use(compression({level:9}));
  app.use(serveStatic(basepath, {'index': ['index.html'], maxAge: oneHour}));

  app.get('/',function(req,res,next){
    var path = req.url.split('?')[0];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.render(basepath+"/"+path+".html");

    next();
  });

  server = app.listen(9001);

  server.on('connection', function(socket) {
    console.log("A new connection was made by a client.");
    socket.setTimeout(30 * 1000);
    // 30 second timeout. Change this as you see fit.
  });

  browserSync({
    open: false,
    online: false,
    port: 9000,
    ui: {
      port: 8080
    },
    //listen to express running on port 9000
    proxy: "http://localhost:9001"
  }, function(){

    done();
  });
});


