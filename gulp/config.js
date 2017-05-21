'use strict';

import path       from 'path';
import glp        from 'gulp-load-plugins';
import bowerFiles from 'main-bower-files';
import yargs      from 'yargs';

const source = 'source';
const app    = path.join(source, 'app');
const dev    = 'dev';
const prod   = 'prod';

const plugins = glp();
const args = yargs.argv;

const config = {
  isDevelop:   args.env === 'dev'
};

const paths = {
  source: {
    files: {
      scipts:    path.join(app, '**/*!(.spec.js).js'),
      indexHTML: path.join(source, 'index.pug'),
      fonts:     path.join(source, 'fonts/**/*'),
      test:      path.join(app, '**/*.spec.js'),
      stylus:    path.join(app, 'root.styl'),
      images:    path.join(source, 'img/**/*'),
      templates: path.join(app, '**/*.pug'),
      mainJS:    path.join(app, 'root.module.js')
    },
    folders: {
      scripts:   app,
      base:      source
    }
  },
  dest: {
    folders: {
      base:      (config.isDevelop ? dev : prod),
      scripts:   (config.isDevelop ? `${dev}/js` : `${prod}/js`),
      styles:    (config.isDevelop ? `${dev}/css` : `${prod}/css`),
      images:    (config.isDevelop ? `${dev}/img` : `${prod}/img`),
      fonts:     (config.isDevelop ? `${dev}/fonts` : `${prod}/fonts`)
    }
  }
};

export {paths, config, plugins};