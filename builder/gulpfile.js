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

/**
 * Tech variables
 */
var _assets = '../assets/',
  _src = './src/',
  _css = 'css/',
  _sass = 'sass/',
  _fonts = 'fonts/',
  _img = 'img/',
  _js = 'css/',
  _lib = 'lib/';

/**
 * Extension builder (tech function)
 * @param extension
 * @returns {string}
 */
function _ext(extension) {
  extension = extension || '*';
  return '**/*.' + extension;
}

/**
 * Path
 */
var path = {
  assets: {
    css:   '../assets/css/',
    fonts: '../assets/fonts/',
    js:    '../assets/js/',
    img:   '../assets/img/'
  },
  src:    {
    sass:  './src/sass/',
    css:   './src/css/',
    fonts: './src/fonts/',
    js:    './src/js/',
    img:   './src/img/',
    lib:   {
      css: './src/lib/css/',
      js:  './src/lib/js/'
    }
  }
};

/**
 * @task primeCSS
 * Style process
 */
gulp.task('primeCSS', function () {
  return gulp.src(path.src.sass + 'style.scss')
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
 * @task inlineCSS
 * Inline-style process
 */
gulp.task('inlineCSS', function () {
  return gulp.src(path.src.css + 'inline.css')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions', '> 1%', 'ie 8'],
      cascade:  true
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.assets.css));
});

/**
 * @task libCSS
 * Libraries styles
 */
gulp.task('libCSS', ['bowerMainCSS'], function () {
  return gulp.src(path.src.lib.css + _ext('css'))
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
 * @task primeJS
 * Scripts process
 */
gulp.task('primeJS', function () {
  return gulp.src(path.src.js + _ext('js'))
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    //.pipe(uglify())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.assets.js));
});

/**
 * @task libJS
 * Libraries scripts
 */
gulp.task('libJS', ['bowerMainJS'], function () {
  return gulp.src(path.src.lib.js + _ext('js'))
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.assets.js));
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
 * @task fonts
 * Move fonts to assets
 */
gulp.task('fonts', function () {
  return gulp.src(path.src.fonts + '**/*.{ttf,otf,woff,svg}')
    .pipe(gulp.dest(path.assets.fonts));
});

/**
 * @task build
 * Totaly builder
 */
gulp.task('build', ['fonts', 'inlineCSS', 'primeCSS', 'libCSS', 'primeJS'], function () {
  return gulp;
});

/**
 * @task watch
 * Watch scss files for changes & recompile
 * Clear cache when Drupal related files are changed
 */
gulp.task('watch', function () {
  gulp.watch([path.src.sass + _ext('scss'), '!' + path.src.sass + 'inline/'], ['primeCSS']);
  gulp.watch([path.src.sass + 'inline/' + _ext('scss')], ['inlineCSS']);
  gulp.watch([path.src.lib.css + _ext('css')], ['libCSS']);
});

/**
 * Default task
 */
gulp.task('default', ['build', 'watch']);
