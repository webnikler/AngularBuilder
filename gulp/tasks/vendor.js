'use strict';

import gulp from 'gulp';
import bowerFiles from 'main-bower-files';
import combine from 'stream-combiner';
import {paths, plugins, config} from '../config';

const vendors = bowerFiles();
const relativePaths = vendors.map(vendor => vendor.match(/bower_components\S+/)[0]);
const isProduction = !config.isDevelop;
const isExtJs = file => file.extname === '.js';

export default function $build_vendors() {
  return gulp.src(vendors)
    .pipe(plugins.filter('**/*.{js,css}'))
    .pipe(plugins.if(isExtJs, 
      combine(
        plugins.order(relativePaths, { base: './' }),
        plugins.concat('vendor.js'),
        plugins.if(isProduction, plugins.uglify())
      ),
      combine(
         plugins.concat('vendor.css'),
         plugins.if(isProduction, plugins.csso())
      )
    ))
    .pipe(plugins.if(isProduction, plugins.rename({suffix: '.min'})))
    .pipe(plugins.debug({title:'combine'}))
    .pipe(gulp.dest(file => {
      return isExtJs(file) ?
        paths.dest.folders.scripts :
        paths.dest.folders.styles;
    }))
}