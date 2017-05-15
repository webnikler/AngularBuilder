'use strict';

/* Common imports */
import gulp from 'gulp';

/* Tasks imports */
import './gulp/tasks/templates'; // build-templates
import './gulp/tasks/index';     // build-index
import './gulp/tasks/vendor';     // build-vendors
import './gulp/tasks/scripts';     // build-js

gulp.task('build', gulp.series(
  gulp.parallel('build-vendor:js', 'build-vendor:css'),
  gulp.parallel('build-index', 'build-templates')
));