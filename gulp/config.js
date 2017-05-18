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

/* Other */
const plugins = glp();
const args = yargs.argv;

/* Build config */
const config = {
  isDevelop:   args.env === 'dev',
  useMaterial: true // Если ставится false ,требуется дополнительно включить флаг ignore для material-design в bower.json
};

/* App paths */
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
      styles:    (config.isDevelop ? `${dev}/css` : `${prod}/css`)
    }
  }
};

export {paths, config, plugins};