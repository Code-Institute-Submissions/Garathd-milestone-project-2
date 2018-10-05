var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var sass = require('gulp-sass');

//Concat The Advanced Search Stuff
gulp.task('concat-advanced', function() {
    gulp.src(['assets/js/initialise.js', 'assets/js/menu.js', 'assets/js/publisher.js', 'assets/js/getEverything.js', 'assets/js/everything.js', 'assets/js/script.js'])
        .pipe(concat('advanced.js'))
        .pipe(gulp.dest('dist/js/advanced/'));
});

//Concat the Headline Homepage stuff
gulp.task('concat-headline', function() {
    gulp.src(['assets/js/initialise.js', 'assets/js/menu.js', 'assets/js/publisher.js', 'assets/js/getHeadline.js', 'assets/js/headlines.js', 'assets/js/script.js'])
        .pipe(concat('headlines.js'))
        .pipe(gulp.dest('dist/js/headlines/'));
});


gulp.task('compress-advanced', function() {
    gulp.src('dist/js/advanced/*.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist/js/advanced/min/'))
});

gulp.task('compress-headline', function() {
    gulp.src('dist/js/headlines/*.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist/js/headlines/min/'))
});

gulp.task('sass', function () {
  return gulp.src('assets/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('assets/scss/*.scss', ['sass']);
});


gulp.task('concat', ['concat-headline', 'concat-advanced']);
gulp.task('compress', ['compress-headline', 'compress-advanced']);
