const { src, dest, series, parallel, watch } = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  plumber = require('gulp-plumber'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  htmlmin = require('gulp-htmlmin'),
  jsmin = require('gulp-jsmin'),
  svgmin = require('gulp-svgmin');

function sassCompiler() {
  watch('./src/scss/style.scss', { delay: 300 }, () => {
    return src('./src/scss/style.scss')
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('./src/css/'))
  })
}
exports.sassCompiler = sassCompiler;



function htmlMinifyToDist() {
  return src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./dist/'))
}
function replaceCssToDist() {
  return src('./src/css/*.css')
    .pipe(dest('./dist/css/'))
}
function jsMinifyToDist() {
  return src('./src/js/*.js')
    .pipe(jsmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./dist/js/'))
}
function replaceImgsToDist() {
  return src('./src/img/**')
    .pipe(plumber())
    .pipe(dest('./dist/img/'))
}
function replaceProjectLogo() {
  return src('./src/*.ico')
    .pipe(plumber())
    .pipe(dest('./dist/'))
}

exports.goToDist = series(htmlMinifyToDist, replaceCssToDist, jsMinifyToDist, replaceImgsToDist, replaceProjectLogo);