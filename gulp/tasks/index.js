'use strict';

import gulp from 'gulp';
import path from 'path';
import _    from 'lodash';
import {paths, plugins, config} from '../config';

export default function $build_indexFile() {
  return gulp.src(paths.source.files.indexHTML)
    .pipe( plugins.pug(config.isDevelop ? {pretty: true} : null) )
    .pipe( plugins.inject(...get('js/vendor.js')) )
    .pipe( plugins.inject(...get('css/vendor.css')) )
    .pipe( plugins.inject(...get('js/build.js')) )
    .pipe( plugins.inject(...get('css/build.css')) )
    .pipe( gulp.dest(paths.dest.folders.base) );
}

function get(_path, _options = {}) {
  const fileName = _path.match(/\w+.\w+$/)[0];
  const dirName = _path.slice(0, _path.lastIndexOf(fileName));
  const extName = fileName.slice(fileName.indexOf('.'));
  const stem = fileName.slice(0, fileName.indexOf('.'));
  const base = paths.dest.folders.base;

  const newFileName = config.isDevelop ?
    `${dirName}${stem}*${extName}` :
    `${dirName}${stem}*.min${extName}`;

  const source = gulp.src(path.join(base, newFileName), {read: false});
  const options = _.merge({ignorePath: base, name: stem}, _options);

  return [source, options];
};