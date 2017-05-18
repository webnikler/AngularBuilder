'use strict';

import gulp       from 'gulp';
import path       from 'path';
import bowerFiles from 'main-bower-files';
import {paths, plugins, config} from '../config';

const vendors = bowerFiles({debugging: true});
const isProduction = !config.isDevelop

gulp.task('build-vendor:js', () => {

  console.log('VENDORS_INIT', vendors);

  return gulp.src(vendors)
    .pipe( plugins.filter('**/*.js') )
    .pipe( plugins.order(vendors) )
    .pipe( plugins.debug({title: 'order'}) )
    .pipe( plugins.concat('vendor.js') )
    .pipe( plugins.if( isProduction, plugins.uglify() ) )
    .pipe( plugins.if( isProduction, plugins.rename({extname: '.min.js'}) ) )
    .pipe( gulp.dest(paths.dest.folders.scripts) );
});

gulp.task('build-vendor:css', () => {
  return gulp.src(vendors)
    .pipe( plugins.filter('**/*.css') )
    .pipe( plugins.order(vendors) )
    .pipe( plugins.concat('vendor.css') )
    .pipe( plugins.if( isProduction, plugins.csso() ) )
    .pipe( plugins.if( isProduction, plugins.rename({extname: '.min.css'}) ) )
    .pipe( gulp.dest(paths.dest.folders.styles) );
});