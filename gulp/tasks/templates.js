'use strict';

import gulp      from 'gulp';
import {paths, plugins, config} from '../config';

gulp.task('build:templates', () => {
  return gulp.src(paths.source.files.templates)
    .pipe(plugins.pug( config.isDevelop ? {pretty: true} : null ))
    .pipe(gulp.dest(paths.dest.folders.base));
});