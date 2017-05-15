'use strict';

/* Imports */
import path  from 'path';
import glp   from 'gulp-load-plugins';
import yargs from 'yargs';

/* Constants (path) */
const source = 'source';
const app    = path.join(source, 'app');
const dev    = 'dev';
const prod   = 'prod';

/* Plugins */
const plugins = glp();

/* Args */
const args = yargs.argv;

/* Build config */
const config = {
  env: args.env || 'prod',
  useMaterial: true // Если ставится false ,требуется дополнительно включить флаг ignore для material-design в bower.json
};

/* Webpack paths */
const webpackPaths = {
  input:  `./${source}/app/main.js`,
  output: `/dev/js`
}

/* App paths */
const paths = {
  js:        path.join(app, '**/*!(.spec.js).js'),
  index:     path.join(source, 'index.pug'),
  fonts:     path.join(source, 'fonts/**/*'),
  test:      path.join(app, '**/*.spec.js'),
  stylus:    path.join(app, '**/*.stylus'),
  img:       path.join(source, 'img/**/*'),
  templates: path.join(app, '**/*.pug'),
  main:      path.join(app, 'main.js'),
  webpack:   webpackPaths,
  source,
  prod,
  dev
};

export {paths, config, plugins};