'use strict';

import gulp       from 'gulp';
import path       from 'path';
import bowerFiles from 'main-bower-files';
import {paths, plugins, config} from '../config';

const vendors = bowerFiles();
const relativePaths = vendors.map(vendor => vendor.match(/bower_components\S+/)[0]);
const isProduction = !config.isDevelop
const rename = { suffix: '.min' };

gulp.task('build-vendor:js', () => {
  return gulp.src(vendors)
    .pipe( plugins.filter('**/*.js') )
    .pipe( plugins.order(relativePaths, { base: './' }) )
    .pipe( plugins.debug({ title: 'order' }) )
    .pipe( plugins.concat('vendor.js') )
    .pipe( plugins.if( isProduction, plugins.uglify() ) )
    .pipe( plugins.if( isProduction, plugins.rename(rename) ) )
    .pipe( gulp.dest(paths.dest.folders.scripts) );
});

gulp.task('build-vendor:css', () => {
  return gulp.src(vendors)
    .pipe( plugins.filter('**/*.css') )
    .pipe( plugins.concat('vendor.css') )
    .pipe( plugins.if( isProduction, plugins.csso() ) )
    .pipe( plugins.if( isProduction, plugins.rename(rename) ) )
    .pipe( gulp.dest(paths.dest.folders.styles) );
});