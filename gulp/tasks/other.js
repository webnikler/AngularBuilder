'use strict';

import gulp from 'gulp';
import path from 'path';
import {paths, plugins, config} from '../config';

const srcPaths = [
  paths.source.files.fonts,
  paths.source.files.images
];

const srcOptions = {
  base: paths.source.folders.base
};

export default function $build_other() {
  return gulp.src(srcPaths, srcOptions)
    .pipe(plugins.cached($build_other.name))
    .pipe(gulp.dest(paths.dest.folders.base));
}