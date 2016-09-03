import gulp from 'gulp';
import {paths, patterns} from '../../project-config';

// outputs changes to files to the console
function reportChange(event) {
  console.log(`${event.type}: ${event.path}`);
}

gulp.task('watch', 'watch for file changes and rebuild as needed', () => {
  gulp.watch(patterns.styles, ['sass']).on('change', reportChange);
  gulp.watch(patterns.images, ['images']).on('change', reportChange);
  gulp.watch(patterns.fonts, ['fonts']).on('change', reportChange);
  gulp.watch(patterns.icons, ['icons']).on('change', reportChange);
});
