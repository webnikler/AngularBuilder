'use strict';

import {isDevelop, basePaths} from './config';

let {source, app, dest} = basePaths;

const paths = {
  source: {
    files: {
      scipts:    `${app}/**/*!(.spec.js).js`,
      indexHTML: `${source}/index.pug`,
      fonts:     `${source}/fonts/**/*`,
      test:      `${app}/**/*.spec.js`,
      stylus:    `${app}/root.styl`,
      images:    `${source}/img/**/*`,
      templates: `${app}/**/*.pug`,
      mainJS:    `${app}/root.module.js`
    },
    folders: {
      scripts:   app,
      base:      source
    }
  },
  dest: {
    folders: {
      base:      `${dest}`,
      scripts:   `${dest}/js`,
      styles:    `${dest}/css`,
      images:    `${dest}/img`,
      fonts:     `${dest}/fonts`
    }
  }
};

export let {
  source: {files: sFiles, folders: sFolders},
  dest:   {folders: dFolders}
} = paths;