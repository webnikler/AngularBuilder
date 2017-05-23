'use strict';

import gulp from 'gulp';
import bowerFiles from 'main-bower-files';
import combine from 'stream-combiner';

import {$, isDevelop} from '../config';
import {dFolders} from '../paths';

let {scripts, styles} = dFolders;

const vendors = bowerFiles();
const relativePaths = vendors.map(vendor => vendor.match(/bower_components\S+/)[0]);
const isProduction = !isDevelop;
const isExtJs = file => file.extname === '.js';

export default function $build_vendors() {
  return gulp.src(vendors)
    .pipe($.filter('**/*.{js,css}'))
    .pipe($.if(isExtJs, 
      combine(
        $.order(relativePaths, { base: './' }),
        $.concat('vendor.js'),
        $.if(isProduction, $.uglify())
      ),
      combine(
         $.concat('vendor.css'),
         $.if(isProduction, $.csso())
      )
    ))
    .pipe($.if(isProduction, $.rename({suffix: '.min'})))
    .pipe($.debug({title:'combine'}))
    .pipe(gulp.dest(file => {
      return isExtJs(file) ? scripts : styles;
    }))
}