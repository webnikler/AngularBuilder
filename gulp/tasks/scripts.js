'use strict';

import gulp     from 'gulp';
import gulplog  from 'gulplog';
import notifier from 'node-notifier';
import uglify   from 'uglifyjs-webpack-plugin';
import webpack  from 'webpack';
import path     from 'path';

import {isDevelop, namesOfBuilds} from '../config';
import {sFiles, dFolders} from '../paths';

let {mainJS} = sFiles;
let {scripts: destScripts} = dFolders;
let {appJs} = namesOfBuilds;

const scriptsLoaders = {
  test: /\.js$/,
  loader: 'ng-annotate-loader!babel-loader'
};

const templatesLoaders = {
  test: /\.pug$/,
  loader: 'ngtemplate-loader!html-loader!pug-html-loader'
}

export default function $build_scripts(callback) {
  const options = {
    entry: path.resolve(mainJS),
    output: {
      path: path.resolve(destScripts),
      filename: isDevelop ? `${appJs}.js` : `${appJs}-[hash].min.js`
    },
    devtool: isDevelop ? 'eval' : false,
    watch: isDevelop,
    module: {loaders: [scriptsLoaders, templatesLoaders]},
    plugins: []
  };

  if (!isDevelop) options.plugins.push(new uglify());

  runWebpack(options, callback);
};

function runWebpack(options, callback) {
  webpack(options, (err, stats) => {
    if (!err) err = stats.toJson().errors[0];

    if (err) {
      notifier.notify({
        title: 'webpack',
        message: err
      });
      gulplog.error(err);
    } else {
      gulplog.info(stats.toString({colors: true}));
    }

    if (!options.watch && err) {
      callback(err);
    } else {
      callback();
    }
  });
}