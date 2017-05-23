'use strict';

import gulp from 'gulp';

import {$} from '../config';
import {sFiles, sFolders, dFolders} from '../paths';

let {fonts, images} = sFiles;
let {base: sourceBase} = sFolders;
let {base: destBase} = dFolders;

export default function $build_other() {
  return gulp.src([fonts, images], {base: sourceBase})
    .pipe($.cached($build_other.name))
    .pipe(gulp.dest(destBase));
}