var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jetpack = require('fs-jetpack'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('rollup-plugin-babel'),
    rollup = require('gulp-rollup');

gulp.task('script', function () {
  return rollup({
    entry: 'src/main.js',
    plugins: [
      babel({
                exclude: 'node_modules/**',
                presets: ['es2015-rollup'],
            }),
    ]
  })
});

gulp.task('rollup', function () {
    return rollup({
        entry: './src/main.js',
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: ['es2015-rollup'],
            }),
        ]
    }).then(function (bundle) {
        return bundle.write({
            format: 'es2015',
            dest: 'app/index.js'

        })
    });
});

gulp.task('sass', function () {
    return gulp.src('./sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.app'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});