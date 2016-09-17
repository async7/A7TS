/// <binding ProjectOpened='watch:js' />
var gulp = require("gulp"),
    rimraf = require("gulp-rimraf"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify");


var paths = {
    webroot: "."
};

paths.appJsFiles = paths.webroot + "/scripts/app/*.js";
paths.distJsFolder = paths.webroot + "/scripts/app/dist/";
paths.ditJsFiles = paths.webroot + "/scripts/app/dist/*.min.js";

gulp.task("clean:js", function (cb) {
    rimraf(paths.distJsFiles, cb);
});

gulp.task("min:js", function () {
    return gulp.src([paths.appJsFiles])
        .pipe(uglify({ mangle: { keep_fnames: true } }))
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest(paths.distJsFolder));
});

gulp.task("cleanAndMin:js", ["clean:js", "min:js"]);

gulp.task('watch:js', function () {
    gulp.watch(paths.appJsFiles, ['clean:js', 'min:js']);
});


