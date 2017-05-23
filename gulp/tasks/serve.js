'use strict';

import gulp  from 'gulp';
import bs    from 'browser-sync';
import path  from 'path';

import {proxyApi} from '../config';
import {dFolders} from '../paths';

let {url: proxy, enabled: proxyEnabled} = proxyApi;
let {base} = dFolders;

const browserSync = bs.create();

const proxyConfig = {
  proxy,
  serveStatic: [{
    route: '',
    dir: base
  }]
};

const serverConfig = {
  server: {
    baseDir: base
  }
};

export default function $run_server() {
  browserSync
    .init(proxyEnabled ? proxyConfig : serverConfig);

  browserSync
    .watch(path.join(base, '**/*.*'))
    .on('change', browserSync.reload);
};