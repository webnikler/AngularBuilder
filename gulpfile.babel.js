'use strict';

import gulp from 'gulp';
import del  from 'del';
import path from 'path';

import {$, isDevelop} from './gulp/config';
import {sFiles, dFolders} from './gulp/paths';

import $build_indexFile from './gulp/tasks/index';
import $build_vendors   from './gulp/tasks/vendor';
import $build_scripts   from './gulp/tasks/scripts';
import $build_styles    from './gulp/tasks/styles';
import $build_other     from './gulp/tasks/other';
import $run_server      from './gulp/tasks/serve';

const $run_clean = () => del(dFolders.base);
const $run_watch = () => {
  gulp.watch(sFiles.stylus, gulp.series($build_styles));
  gulp.watch([sFiles.fonts, sFiles.images], gulp.series($build_other))
    .on('unlink', filepath => {
      delete $.cached.caches.$build_other[path.resolve(filepath)];
    });
};

const buildSeries = [
  $run_clean,
  gulp.parallel($build_vendors, $build_scripts, $build_styles, $build_other),
  $build_indexFile
];

if (isDevelop) buildSeries.push(gulp.parallel($run_watch, $run_server));

gulp.task('$build', gulp.series(...buildSeries));