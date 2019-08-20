const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

function buildJs() {
  return gulp.src('./src/*.js') // js файлы
    .pipe(sourcemaps.init())
    .pipe(concat('app.js')) //собраный файл
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/')); //distr
}
 
gulp.watch('./src/*.js', buildJs);

exports.default = buildJs;