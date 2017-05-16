'use strict';

import gulp     from 'gulp';
import gulplog  from 'gulplog';
import notifier from 'node-notifier';
import uglify   from 'uglifyjs-webpack-plugin';
import webpack  from 'webpack';
import path     from 'path';
import {paths, plugins, config} from '../config';

gulp.task('build:js', (callback) => {

  let options = {
    entry: path.resolve(paths.source.files.mainJS),
    output: {
      path: path.resolve(paths.dest.folders.scripts),
      filename: config.isDevelop ? 'build.js' : 'build.min.js'
    },
    watch: config.isDevelop,
    module: {
      loaders: [{
        test: /\.js$/,
        use: [
          { loader: 'ng-annotate-loader' },
          { loader: 'babel-loader' }
        ]
      }]
    },
    plugins: []
  };

  if (!config.isDevelop) options.plugins.push( new uglify() );

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

});