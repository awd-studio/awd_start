'use strict';

/**
 * Requires
 */
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  mainBowerFiles = require('main-bower-files'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  sass = require('gulp-sass');

var path = {
  assets: {
    css:   '../assets/css/',
    fonts: '../assets/fonts/',
    js:    '../assets/js/',
    img:   '../assets/img/'
  },
  src:    {
    fonts: './src/fonts/**/*.*',
    img:   './src/img/**/*.*',
    sass:  './src/sass/style.scss',
    lib:   {
      css: './src/lib/css/',
      js:  './src/lib/js/'
    }
  },
  watch:  {
    fonts: './src/fonts/**/*.*',
    js:    './src/js/**/*.js',
    img:   './src/img/**/*.*',
    sass:  './src/sass/**/*.scss',
    src:   {
      lib: {
        css: './src/lib/css/**/*.css',
        js:  './src/lib/js/**/*.js'
      }
    }
  },
  clean:  '../assets'
};

/**
 * @task primeJS
 * Scripts process
 */
gulp.task('primeJS', function (cb) {
  pump([
      gulp.src('lib/*.js'),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});

/**
 * @task primeCSS
 * Style process
 */
gulp.task('primeCSS', function () {
  return gulp.src(path.src.sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({
      browsers: ['last 15 versions', '> 1%', 'ie 8'],
      cascade:  true
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.assets.css));
});

/**
 * @task libCSS
 * Libraries styles
 */
gulp.task('libCSS', ['bowerMainCSS'], function () {
  return gulp.src(path.watch.src.lib.css)
    .pipe(autoprefixer({
      browsers: ['last 15 versions', '> 1%', 'ie 8'],
      cascade:  true
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('libs.css'))
    .pipe(gulp.dest(path.assets.css));
});

/**
 * @task bowerMainCSS
 * Move CSS-libraries to "src/lib/css" folder
 */
gulp.task('bowerMainCSS', function () {
  return gulp.src(mainBowerFiles('**/*css', {}))
    .pipe(gulp.dest(path.src.lib.css));
});

/**
 * @task bowerMainJS
 * Move JS-libraries to "src/lib/js" folder
 */
gulp.task('bowerMainJS', function () {
  return gulp.src(mainBowerFiles('**/*js', {}))
    .pipe(gulp.dest(path.src.lib.js));
});

/**
 * @task watch
 * Watch scss files for changes & recompile
 * Clear cache when Drupal related files are changed
 */
gulp.task('watch', function () {
  gulp.watch([path.watch.sass], ['primeCSS']);
  gulp.watch([path.watch.src.lib.css], ['libCSS']);
});

/**
 * Default task
 */
gulp.task('default', [
  'primeCSS',
  'bowerMainCSS',
  'libCSS',
  'bowerMainJS',
  'watch'
]);
