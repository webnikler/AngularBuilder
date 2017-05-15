'use strict';

import gulp     from 'gulp';
import gulplog  from 'gulplog';
import notifier from 'node-notifier';
import uglify   from 'uglifyjs-webpack-plugin';
import webpack  from 'webpack';
import path     from 'path';
import {paths, plugins, config} from '../config';

const isDevelop = config.env === 'dev';

gulp.task('build-js', (callback) => {

  let options = {
    entry: paths.webpack.input,
    output: {
      path: '/',
      filename: '[name].js'
    },
    watch: isDevelop,
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

  if (!isDevelop) options.plugins.push( new uglify() );

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