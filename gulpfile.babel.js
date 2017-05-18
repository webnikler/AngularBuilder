'use strict';

/* Common imports */
import gulp from 'gulp';

/* Tasks imports */
import './gulp/tasks/index';   // build:index
import './gulp/tasks/vendor';  // build:vendors
import './gulp/tasks/scripts'; // build:js
import './gulp/tasks/styles';  // build:css
import './gulp/tasks/serve';   // serve

gulp.task('build', gulp.series(
  gulp.parallel(
    'build-vendor:js',
    'build-vendor:css',
    'build:js',
    'build:css'
  ),
  'build:index'
));