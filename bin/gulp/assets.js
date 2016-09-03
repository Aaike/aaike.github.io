import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import {paths, patterns} from '../../project-config';

gulp.task('images', 'copy images to the build directory', () => {
  return gulp.src(patterns.images)
    .pipe(gulp.dest(path.join(paths.output, 'images')));
});

gulp.task('fonts', 'copy fonts to the output directory', () => {
  return gulp.src(patterns.fonts)
    .pipe(gulp.dest(path.join(paths.output, 'fonts')));
});

gulp.task('icons', 'copy icons to the output directory', () => {
  return gulp.src(patterns.icons)
    .pipe(gulp.dest(path.join(paths.output, 'icons')));
});

gulp.task('build', function(callback) {
  return runSequence(
    'images', 'fonts', 'icons',
    callback
  );
});
