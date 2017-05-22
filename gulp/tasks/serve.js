'use strict';

import gulp  from 'gulp';
import bs    from 'browser-sync';
import path  from 'path';
import {paths, config} from '../config';

const browserSync = bs.create();

const proxyConfig = {
  proxy: config.proxyUrl,
  serveStatic: [{
    route: '',
    dir: paths.dest.folders.base
  }]
};

const serverConfig = {
  server: {
    baseDir: paths.dest.folders.base
  }
};

export default function $run_server() {
  browserSync.init( config.proxyEnabled ?
    proxyConfig :
    serverConfig
  );

  browserSync.watch(path.join(paths.dest.folders.base, '**/*.*'))
    .on('change', browserSync.reload);
};