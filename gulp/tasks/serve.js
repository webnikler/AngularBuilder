'use strict';

import gulp  from 'gulp';
import bs    from 'browser-sync';
import {paths, config} from '../config';

const browserSync = bs.create();

export default function $run_server() {
  browserSync.init({
    server: {
      baseDir: paths.dest.folders.base
    }
  });
  browserSync.watch(path.join(paths.dest.folders.base, '**/*.*'))
    .on('change', browserSync.reload);
};