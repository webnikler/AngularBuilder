'use strict';

import gulp from 'gulp';
import bs   from 'browser-sync';
import {paths} from '../config';

const browserSync = bs.create();

gulp.task('serve', () => {
  browserSync.init({
    server: { baseDir: paths.dest.folders.base }
  })
});