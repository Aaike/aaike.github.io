var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');

require('core-js');
//var sourcemaps = require('gulp-sourcemaps');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginCleanCSS = require('less-plugin-clean-css');

var cleancss = new LessPluginCleanCSS({ advanced: true });
var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

var options_dev = {
  compress: false
};

var options_prod = {
  compress: true
};

gulp.task('less', function(){ compileFile('less/style.less', 'dist/css', options_dev); });
gulp.task('less_vendor', function(){ compileFile('less/vendor.less', 'dist/css', options_dev); });

gulp.task('less_prod', function(){ compileFile('less/index.less', gulp.config.buildPath + '/css', options_prod); });
gulp.task('less_vendor_prod', function(){ compileFile('less/vendor.less', gulp.config.buildPath + '/css', options_prod); });


/**
 * Compile a less file
 */
function compileFile(input, output, options){
  console.log(input, output);
  var process = gulp.src(input)
      //.pipe(sourcemaps.init())
    .pipe(less(Object.assign({
        filename: input,
        paths: [
          '.',
          'node_modules/font-awesome-less',
          'node_modules/gooy-style/less',
          'node_modules/gooy-ui-style/less'
        ],  // Specify search paths for @import directives
        plugins: [cleancss,autoprefix]
      }, options)))

    .pipe(autoprefixer({browsers: ['last 3 versions']}))
    .pipe(minify({restructuring: false, keepBreaks: !options.compress}))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(output))
    ;
}
