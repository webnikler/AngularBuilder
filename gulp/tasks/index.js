'use strict';

import gulp from 'gulp';
import path from 'path';
import _    from 'lodash';
import {paths, plugins, config} from '../config';

const inject = (_path, _ext, _options = {}) => {
  const ext  = config.isDevelop ? _ext : `min.${_ext}`;
  const file = `${_path}.${ext}`;
  const name = _path.match(/\w+$/)[0];
  const base = paths.dest.folders.base;

  const source = gulp.src(path.join(base, file), {read: false});
  const options = _.merge({ignorePath: base, name}, _options);

  return [source, options];
}

gulp.task('build:index',  () => {
  return gulp.src(paths.source.files.indexHTML)
    .pipe( plugins.pug( config.isDevelop ? {pretty: true} : null ) )
    .pipe( plugins.inject(...inject('js/vendor', 'js')) )
    .pipe( plugins.inject(...inject('css/vendor', 'css')) )
    .pipe( plugins.inject(...inject('js/build', 'js')) )
    .pipe( plugins.inject(...inject('css/build', 'css')) )
    .pipe( gulp.dest(paths.dest.folders.base) );
});