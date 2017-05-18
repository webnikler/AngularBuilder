'use strict';

import gulp       from 'gulp';
import path       from 'path';
import bowerFiles from 'main-bower-files';
import {paths, plugins, config} from '../config';

const vendors = bowerFiles();
const isProduction = !config.isDevelop

const orderArgs = [
  /* Перевод абсолютных путей в относительные (иначе gulp-order не съест их) */
  vendors.map(vendor => vendor.slice(vendor.indexOf('bower_components'))),
  { base: './' }
];

const rename = { suffix: '.min' };

gulp.task('build-vendor:js', () => {
  return gulp.src(vendors)
    .pipe( plugins.filter('**/*.js') )
    .pipe( plugins.order(...orderArgs) )
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