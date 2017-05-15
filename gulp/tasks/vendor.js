'use strict';

import gulp       from 'gulp';
import path       from 'path';
import bowerFiles from 'main-bower-files';
import {paths, plugins, config} from '../config';

const vendors = bowerFiles();
const isProd  = config.env === 'prod';

gulp.task('build-vendor:js', () => {
  return gulp.src(vendors)
    .pipe( plugins.filter('**/*.js') )
    .pipe( plugins.order(vendors) )
    .pipe( plugins.concat('vendor.js') )
    .pipe( plugins.if( isProd, plugins.uglify() ) )
    .pipe( plugins.if( isProd, plugins.rename({extname: '.min.js'}) ) )
    .pipe( gulp.dest(path.join(paths.dev, 'js')) )
});

gulp.task('build-vendor:css', () => {
  return gulp.src(vendors)
    .pipe( plugins.filter('**/*.css') )
    .pipe( plugins.order(vendors) )
    .pipe( plugins.concat('vendor.css') )
    .pipe( plugins.if( isProd, plugins.csso() ) )
    .pipe( plugins.if( isProd, plugins.rename({extname: '.min.css'}) ) )
    .pipe( gulp.dest(path.join(paths.dev, 'css')) )
});