'use strict';

const path = require('path'),
      gulp = require("gulp"),
      sourcemaps = require("gulp-sourcemaps"),
      sass = require('gulp-sass'),
      webpackStream = require('webpack-stream'),
      webpack = require('webpack'),
      jshint = require('gulp-jshint'),
      named = require('vinyl-named');

gulp.task('sass', function () {
  return gulp.src('./sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'));
});

gulp.task('lint-js', function () {
  return gulp.src(['src/**/*.js'])
           .pipe(jshint({
             esversion: 6
           }))
           .pipe(jshint.reporter());
});

gulp.task('copy-images', function () {
  return gulp.src(['./sass/*.png', './sass/*.ttf', './sass/*.woff'])
         .pipe(gulp.dest('./app/css'));
})

function doWebpack(minify) {
  var plugs = [],
      devTool;

  if (minify) {
    plugs.push(new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false }));
     } 
  else {
    devTool = 'source-map';
  }

  return webpackStream(
      {
        module: {
          loaders: [
              {
                loader: 'babel',
                query: {
                  presets: ['es2015']
                },
                resolve: {
                  root: path.join(__dirname),
                  fallback: path.join(__dirname, 'node_modules'),
                  modulesDirectories: ['node_modules'],
                  extensions: ['', '.json', '.js', '.less', '.png', '.jpg', '.jpeg', '.gif']
                }
              },
          ]
        },
        devtool: devTool,
        output: {
          filename: 'index.js',
        },
        plugins: plugs
      });
}

gulp.task('js', function () {
  return gulp.src("src/index.js")
  .pipe(named())
  .pipe(doWebpack())
  .pipe(gulp.dest("app/scripts"));
});

gulp.task('js-release', function () {
  return gulp.src("src/index.js")
  .pipe(named())
  .pipe(doWebpack(true))
  .pipe(gulp.dest("app/scripts"));
});

gulp.task("default", ['copy-images', 'sass', 'js']);
gulp.task("release", ['copy-images', 'sass', 'js-release']);