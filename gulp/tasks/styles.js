'use strict';

import gulp from 'gulp';
import {paths, plugins, config} from '../config';

export default function $build_styles() {
  return gulp.src(paths.source.files.stylus)
    .pipe( plugins.stylus({compress: !config.isDevelop}) )
    .pipe( plugins.rename({
      basename: 'build',
      suffix: (config.isDevelop ? null : '.min')
    }) )
    .pipe( plugins.if(!config.isDevelop, plugins.rev()) )
    .pipe( gulp.dest(paths.dest.folders.styles) );
};