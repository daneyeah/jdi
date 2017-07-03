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
var localSite = 'http://jdi-engine.loc/',
    mobileBS=$.browserSync.create('mobile'),
    adminBS=$.browserSync.create('admin'),
    desktopBS=$.browserSync.create('desktop');
/*=== @ CLEANER ===*/
gulp.task('storage:clean', function () {
    return gulp
        .src(paths.dist.clean, {read: true})
        .pipe($.clean());
});
gulp.task('public:clean', function () {
    return gulp
            .src(paths.public.clean, {read: true})
            .pipe($.clean());
});
gulp.task('dist:clean', function () {
    return gulp
        .src([paths.dist.common.css,paths.dist.admin.css,paths.dist.mobile.css,paths.dist.desktop.css], {read: true})
        .pipe($.clean());
});
gulp.task('clean', function () {
    $.runSequence('dist:clean','storage:clean','public:clean');
});
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
/*=== @ LESS ===*/
gulp.task('less:common', function () {
    return gulp
        .src([paths.src.common.less,paths.src.common.ignore_less])
        .pipe($.less())
        .pipe(gulp.dest(paths.dist.common.css));
});
gulp.task('less:admin', function () {
    return gulp
        .src([paths.src.admin.less,paths.src.admin.ignore_less])
        .pipe($.less())
        .pipe(gulp.dest(paths.dist.admin.css));
});
gulp.task('less:desktop', function () {
    return gulp
        .src([paths.src.desktop.less,paths.src.desktop.ignore_less])
        .pipe($.less())
        .pipe(gulp.dest(paths.dist.desktop.css));
});
gulp.task('less:mobile', function () {
    return gulp
        .src([paths.src.mobile.less,paths.src.mobile.ignore_less])
        .pipe($.less())
        .pipe(gulp.dest(paths.dist.mobile.css));
});
/*=== ! LESS ===*/
/*=== @ CSS ===*/
gulp.task('css:common', function () {
    return gulp
            .src(paths.src.common.css)
            .pipe($.autoprefixer({browsers:['last 2 version']}))
            .pipe($.csscomb())
            .pipe($.csso())
            .pipe($.rename({suffix: '.min'}))
            .pipe(gulp.dest(paths.dist.common.min_css))
            .pipe($.concat('style.min.css'))
});
gulp.task('css:admin', function () {
    return gulp
        .src(paths.src.admin.css)
        .pipe($.autoprefixer({browsers:['last 2 version']}))
        .pipe($.csscomb())
        .pipe($.csso())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist.admin.min_css))
        .pipe($.concat('style.min.css'))
        .pipe(gulp.dest(paths.public.admin.css))
});
gulp.task('css:desktop', function () {
    return gulp
        .src(paths.src.desktop.css)
        .pipe($.autoprefixer({browsers:['last 2 version']}))
        .pipe($.csscomb())
        .pipe($.csso())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist.desktop.min_css))
        .pipe($.concat('style.min.css'))
        .pipe(gulp.dest(paths.public.desktop.css))
});
gulp.task('css:mobile', function () {
    return gulp
        .src(paths.src.mobile.css)
        .pipe($.autoprefixer({browsers:['last 2 version']}))
        .pipe($.csscomb())
        .pipe($.csso())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist.mobile.min_css))
        .pipe($.concat('style.min.css'))
        .pipe(gulp.dest(paths.public.mobile.css))
});
/*=== ! CSS ===*/
/*=== @ CONCAT ===*/
gulp.task('concat:css:admin',function () {
   return gulp
            .src([paths.src.admin.min_css,paths.src.common.min_css])
            .pipe($.sourcemaps.init())
            .pipe($.concat('style.min.css'))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(paths.public.admin.css))
});
gulp.task('concat:css:desktop',function () {
    return gulp
        .src([paths.src.desktop.min_css,paths.src.common.min_css])
        .pipe($.sourcemaps.init())
        .pipe($.concat('style.min.css'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.public.desktop.css))
});
gulp.task('concat:css:mobile',function () {
    return gulp
        .src([paths.src.mobile.min_css,paths.src.common.min_css])
        .pipe($.sourcemaps.init())
        .pipe($.concat('style.min.css'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.public.mobile.css))
});
/*=== ! CONCAT ===*/
/*=== @ FONT ===*/
gulp.task('font:less',function(){
    return gulp
        .src([paths.src.common.font.less,paths.src.common.font.ignore_less])
        .pipe($.less())
        .pipe(gulp.dest(paths.dist.common.font.css));
});
gulp.task('font:copy',function () {
   return gulp
            .src([paths.src.common.font.file,paths.src.common.font.css,paths.src.common.font.js])
            .pipe($.multiDest([paths.public.admin.font,paths.public.desktop.font,paths.public.mobile.font]))
});
/*=== ! FONT ===*/


/*=== @ BUILDER ===*/
gulp.task('build:less',['less:common','less:admin','less:desktop','less:mobile']);
gulp.task('build:css', ['css:common','css:admin','css:desktop','css:mobile']);
gulp.task('build:concat', ['concat:css:admin','concat:css:desktop','concat:css:mobile']);
gulp.task('build:styles',function () {
   $.runSequence('build:less','build:css','build:concat')
});
gulp.task('build:js',['js:common','js:admin','js:desktop','js:mobile']);
gulp.task('build:lib',['lib:jquery']);
gulp.task('build:php',['php:common','php:admin','php:desktop','php:mobile']);
gulp.task('build:pug',['pug:common','pug:admin','pug:desktop','pug:mobile']);
gulp.task('build:font', ['font:less','font:copy']);
gulp.task('build', function () {
    $.runSequence('build:lib', 'build:styles', 'build:pug','build:php','build:js','build:font');
});
/*=== ! BUILDER ===*/
/*=== @ WATCHER ===*/
gulp.task('watch:common',function () {
    gulp.watch(paths.src.common.less,['build:styles']);
    gulp.watch(paths.src.common.js, ['build:js']);
    gulp.watch(paths.src.common.pug, ['build:pug']);
    gulp.watch(paths.src.common.php, ['build:php']);
    gulp.watch(paths.src.library.jquery, ['build:lib']);
    //gulp.watch(paths.src.common.fonts, ['fonts:build']); TODO: BUILDER JSON/IMAGE
});
gulp.task('watch',['watch:common']);
/*=== ! WATCHER ===*/
/*=== @ RELOADER ===*/
gulp.task('bs',function () {
   adminBS.init({
       proxy: 'admin.jdi-engine.loc',
       port: 3000,
       notify: false,
       ui: {
           port: 3001
       },
       browser: 'firefox'

   });
   mobileBS.init({
       proxy: 'm.jdi-engine.loc',
        port: 3002,
       notify: false,
       ui: {
           port: 3003
       },
       browser: 'firefox'
   });
   desktopBS.init({
       proxy: 'jdi-engine.loc',
       port: 3004,
       notify: false,
       ui: {
           port: 3005
       },
       browser: 'firefox'
   })
});
/*=== ! RELOADER ===*/
gulp.task('default', function () {
    $.runSequence('clean','build','watch');
    $.runSequence('bs')
});