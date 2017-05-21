'use strict';

import gulp from 'gulp';
import del  from 'del';
import path from 'path';
import {paths, plugins, config} from './gulp/config';

import $build_indexFile from './gulp/tasks/index';
import $build_vendors   from './gulp/tasks/vendor';
import $build_scripts   from './gulp/tasks/scripts';
import $build_styles    from './gulp/tasks/styles';
import $build_other     from './gulp/tasks/other';
import $run_server      from './gulp/tasks/serve';

const $run_clean = () => del(paths.dest.folders.base);
const $run_watch = () => {
  gulp.watch(paths.source.files.stylus, gulp.series($build_styles));
  gulp.watch([paths.source.files.fonts, paths.source.files.images], gulp.series($build_other))
    .on('unlink', filepath => {
      delete plugins.cached.caches.$build_other[path.resolve(filepath)];
    });
};

const buildSeries = [
  $run_clean,
  gulp.parallel($build_vendors, $build_scripts, $build_styles, $build_other),
  $build_indexFile
];

if (config.isDevelop) buildSeries.push(gulp.parallel($run_watch, $run_server));

gulp.task('$build', gulp.series(...buildSeries));