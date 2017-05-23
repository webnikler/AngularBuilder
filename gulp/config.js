'use strict';

import getPlugins from 'gulp-load-plugins';
import yargs from 'yargs';

const $ = getPlugins();
const isDevelop = yargs.argv.env === 'dev';

const config = {
  proxyApi: {
    enabled: true,
    url: 'http://127.0.0.1:45000'
  },
  basePaths: {
    source: 'source',
    app: 'source/app',
    dest: isDevelop ? 'dev' : 'prod'
  },
  namesOfBuilds: {
    bowerJs: 'vendor',
    bowerCss: 'vendor',
    appJs: 'build',
    appCss: 'build'
  }
};

export let {proxyApi, basePaths, namesOfBuilds} = config;
export {$, isDevelop};