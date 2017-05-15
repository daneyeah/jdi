'use strict';
/* gulp variable */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: '*',
        rename: {}
    });
/* paths variable array */
var pathFile = require('fs'),
    paths = JSON.parse(pathFile.readFileSync('./paths.json'));
/*=== @ CLEANER ===*/
gulp.task('storage:clean', function () {
    return gulp
        .src(paths.storage.clean, {read: true})
        .pipe($.clean());
});
gulp.task('public:clean', function () {
    return gulp
            .src(paths.public.clean, {read: true})
            .pipe($.clean());
});
gulp.task('clean',['storage:clean','public:clean'])
/*=== ! CLEANER ===*/
/*=== @ LIBRARY ===*/
gulp.task('lib:jquery', function () {
    return gulp
            .src(paths.src.library.jquery)
            .pipe($.multiDest([paths.public.admin.js_lib,paths.public.desktop.js_lib,paths.public.mobile.js_lib]));
});
/*=== ! LIBRARY ===*/
/*=== @ PHP ===*/
gulp.task('php:common', function () {
    return gulp
        .src(paths.src.common.php)
        .pipe($.multiDest([paths.public.admin.primary,paths.public.desktop.primary,paths.public.mobile.primary]));
});
gulp.task('php:admin', function () {
    return gulp
        .src(paths.src.admin.php)
        .pipe(gulp.dest(paths.public.admin.primary));
});
gulp.task('php:desktop', function () {
    return gulp
        .src(paths.src.desktop.php)
        .pipe(gulp.dest(paths.public.desktop.primary));
});
gulp.task('php:mobile', function () {
    return gulp
        .src(paths.src.mobile.php)
        .pipe(gulp.dest(paths.public.mobile.primary));
});
/*=== ! PHP ===*/
/*=== @ PUG ===*/
gulp.task('pug:common', function () {
    return gulp
            .src(paths.src.common.pug)
            .pipe($.pug({'pretty':true}))
            .pipe($.rename({extname:'.php'}))
            .pipe($.multiDest([paths.public.admin.primary,paths.public.desktop.primary,paths.public.mobile.primary]))
});
gulp.task('pug:admin', function () {
    return gulp
            .src(paths.src.admin.pug)
            .pipe($.pug({'pretty':true}))
            .pipe($.rename({extname:'.php'}))
            .pipe(gulp.dest(paths.public.admin.primary))
});
gulp.task('pug:desktop', function () {
    return gulp
        .src(paths.src.desktop.pug)
        .pipe($.pug({'pretty':true}))
        .pipe($.rename({extname:'.php'}))
        .pipe(gulp.dest(paths.public.desktop.primary))
});
gulp.task('pug:mobile', function () {
    return gulp
        .src(paths.src.mobile.pug)
        .pipe($.pug({'pretty':true}))
        .pipe($.rename({extname:'.php'}))
        .pipe(gulp.dest(paths.public.mobile.primary))
});
/*=== ! PUG ===*/
/*=== @ JS ===*/
gulp.task('js:common', function () {
    $.pump([
        gulp
            .src(paths.src.common.js),
            $.uglify(),
            $.rename({suffix:'.min'}),
            $.multiDest([paths.public.admin.js,paths.public.desktop.js,paths.public.mobile.js])
    ]);
});
gulp.task('js:admin', function () {
    $.pump([
        gulp
            .src(paths.src.admin.js),
        $.uglify(),
        $.rename({suffix:'.min'}),
        gulp.dest(paths.public.admin.js)
    ]);
});
gulp.task('js:desktop', function () {
    $.pump([
        gulp
            .src(paths.src.desktop.js),
        $.uglify(),
        $.rename({suffix:'.min'}),
        gulp.dest(paths.public.desktop.js)
    ]);
});
gulp.task('js:mobile', function () {
    $.pump([
        gulp
            .src(paths.src.mobile.js),
        $.uglify(),
        $.rename({suffix:'.min'}),
        gulp.dest(paths.public.mobile.js)
    ]);
});
/*=== ! JS ===*/
/*=== @ BUILDER ===*/
gulp.task('build:js',['js:common','js:admin','js:desktop','js:mobile']);
gulp.task('build:lib',['lib:jquery']);
gulp.task('build:php',['php:common','php:admin','php:desktop','php:mobile']);
gulp.task('build:pug',['pug:common','pug:admin','pug:desktop','pug:mobile']);
gulp.task('build', function () {
    $.runSequence('build:lib','build:php','build:pug','build:js');
});
/*=== ! BUILDER ===*/
gulp.task('default', function () {
    $.runSequence('clean','build')
});