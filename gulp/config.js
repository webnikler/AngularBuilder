'use strict';

/* Imports */
import path from 'path';

/* Constants */
const SOURCE = 'src';
const DEST   = 'dest';
const APP    = path.join(SOURCE, 'app');

/* Build config */
const config = {
  useMaterial: true
};

/* App paths */
const paths = {
  js:        path.join(APP, '**/*!(.spec.js).js'),
  main:      path.join(APP, 'main.js'),
  index:     path.join(SOURCE, 'index.html'),
  templates: path.join(APP, '**/*.html'),
  stylus:    path.join(APP, '**/*.stylus'),
  pug: [
    path.join(APP, '**/*.pug'),
    path.join(SOURCE, 'index.pug')
  ],
  img:   path.join(SOURCE, 'img/**/*'),
  fonts: path.join(SOURCE, 'fonts/**/*'),
  dest:  DEST,
  src:   SOURCE
};

export {paths, config};