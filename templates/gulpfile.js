'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var del = require('del');
var uglify = require('gulp-uglify');

gulp.task('less', function() {
    gulp.src('src/less/*.less')
        .pipe(less().on('error', gutil.log))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('css/'))
});

gulp.task("js",function(){
    return gulp.src('src/js/*.js').pipe(concat('dnspannel.js')).pipe(gulp.dest('js/'));
});

gulp.task('watch', function() {
    gulp.watch([
        'src/less/**.less',
        'src/less/**/*.less'
    ], ['less']);
    gulp.watch([
        'src/js/**.js',
    ], ['js']);

});

gulp.task('default', ['js', 'less' , 'watch']);