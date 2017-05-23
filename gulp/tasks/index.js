'use strict';

import gulp from 'gulp';

import {$, isDevelop, namesOfBuilds} from '../config';
import {dFolders, sFiles} from '../paths';

let {bowerCss, bowerJs, appCss, appJs} = namesOfBuilds;

class InjectOptions {
  constructor(name) {
    this.ignorePath = dFolders.base;
    this.name = name;
  }
};

const bowerInjectOptions = new InjectOptions('vendor');
const appInjectOptions =   new InjectOptions('build');

export default function $build_indexFile() {
  return gulp.src(sFiles.indexHTML)
    .pipe( $.pug(isDevelop ? {pretty: true} : null) )
    .pipe( $.inject(gulp.src(`${dFolders.scripts}/${bowerJs}*.js`), bowerInjectOptions) )
    .pipe( $.inject(gulp.src(`${dFolders.styles}/${bowerCss}*.css`), bowerInjectOptions) )
    .pipe( $.inject(gulp.src(`${dFolders.scripts}/${appJs}*.js`), appInjectOptions) )
    .pipe( $.inject(gulp.src(`${dFolders.styles}/${appCss}*.css`), appInjectOptions) )
    .pipe( gulp.dest(dFolders.base) );
}