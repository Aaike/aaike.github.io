import gulp from 'gulp';
import debug from 'gulp-debug';
import path from 'path';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import csswring from 'csswring';

import {paths, patterns} from '../../project-config';

let sassPaths = [
  'src/app'
];

let processors = [
  autoprefixer({ browsers: ['last 3 version'] }),
  mqpacker,
  csswring
];

console.log('patterns.styles', patterns.styles)

gulp.task('sass', 'compile sass files', () => {
  gulp.src(patterns.styles)
    .pipe(sass({
      includePaths: sassPaths
    }).on('error', sass.logError))
    .pipe(debug('Sass'))
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.output));
});
