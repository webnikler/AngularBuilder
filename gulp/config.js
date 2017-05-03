'use strict';

/* Imports */
import path from 'path';

/* Constants */
const source   = 'source';
const app      = path.join(source, 'app');
const devDest  = 'dev-dest';
const prodDest = 'prod-dest';

/* Build config */
const config = {
  useMaterial: true
};

/* App paths */
const paths = {
  js:        path.join(app, '**/*!(.spec.js).js'),
  index:     path.join(source, 'index.html'),
  fonts:     path.join(source, 'fonts/**/*'),
  test:      path.join(app, '**/*.spec.js'),
  stylus:    path.join(app, '**/*.stylus'),
  img:       path.join(source, 'img/**/*'),
  templates: path.join(app, '**/*.html'),
  main:      path.join(app, 'main.js'),
  pug: [
    path.join(source, 'index.pug'),
    path.join(app, '**/*.pug')
  ],
  prodDest,
  devDest,
  source
};

export {paths, config};