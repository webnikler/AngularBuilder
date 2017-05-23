'use strict';

import gulp from 'gulp';

import {$, isDevelop, namesOfBuilds} from '../config';
import {sFiles, dFolders} from '../paths';

let {stylus} = sFiles;
let {styles: destStyles} = dFolders;
let {appCss} = namesOfBuilds;

export default function $build_styles() {
  return gulp.src(stylus)
    .pipe( $.stylus({compress: !isDevelop}) )
    .pipe( $.rename({
      basename: appCss,
      suffix: isDevelop ? null : '.min'
    }) )
    .pipe( $.if(!isDevelop, $.rev()) )
    .pipe( gulp.dest(destStyles) );
};