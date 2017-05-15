'use strict';

import gulp      from 'gulp';
import {paths, plugins, config} from '../config';

gulp.task('build-templates', () => {
  return gulp.src(paths.templates)
    .pipe(plugins.debug({title: 'input'}))
    .pipe(plugins.pug())
    .pipe(plugins.debug({title: 'pipe:pug'}))
    .pipe(gulp.dest(paths.dev))
    .pipe(plugins.debug({title: 'output'}));
});