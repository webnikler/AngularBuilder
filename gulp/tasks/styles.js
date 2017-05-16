'use strict';

import gulp      from 'gulp';
import {paths, plugins, config} from '../config';

gulp.task('build:css', () => {
  return gulp.src(paths.source.files.stylus)
    .pipe( plugins.stylus({compress: !config.isDevelop}) )
    .pipe( plugins.rename({
      basename: 'build',
      extname: (config.isDevelop ? '.css' : '.min.css')
    }) )
    .pipe( gulp.dest(paths.dest.folders.styles) );
});