'use strict';

import gulp from 'gulp';
import path from 'path';
import _    from 'lodash';
import {paths, plugins, config} from '../config';

const inject = (target, _options = {}) => {
  const source = gulp.src(path.join(paths.dev, target), {read: false});
  const options = _.merge({ignorePath: paths.dev, name: 'vendor'}, _options);

  return [source, options];
}

const min = config.env === 'prod' ? '.min' : '';

gulp.task('build-index',  () => {
  return gulp.src(paths.index)
    .pipe( plugins.pug() )
    .pipe( plugins.inject(...inject(`js/vendor${min}.js`)) )
    .pipe( plugins.inject(...inject(`css/vendor${min}.css`)) )
    .pipe( gulp.dest(paths.dev) )
});