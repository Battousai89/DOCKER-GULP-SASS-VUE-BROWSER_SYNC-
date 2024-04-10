import { src, dest, watch, lastRun, series, parallel } from 'gulp';
import * as nsass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass( nsass );
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import vueComponent from 'gulp-vue-single-file-component';
import gulpCopy from 'gulp-copy';

export function HTML() {
    return src("app/**/*.html", { since: lastRun(HTML) })
        .pipe(dest("_local_server/"))
        .pipe(browserSync.stream())
}

export function IMAGES() {
    return src("app/src/images/**/*.*")
        .pipe(gulpCopy("_local_server/", { prefix: 1 }))
        .pipe(browserSync.stream())
}

export function JS() {
    return src("app/src/js/**/*.js", { since: lastRun(JS) })
        .pipe(babel({ plugins: ['@babel/plugin-transform-modules-amd'] }))
        .pipe(dest("_local_server/src/js/"))
        .pipe(browserSync.stream())
}

export function VUE() {
    return src("app/src/js/components/**/*.vue", { since: lastRun(VUE) })
        .pipe(vueComponent({ debug: true, loadCssMethod: 'loadCss' }))
        .pipe(babel({ plugins: ['@babel/plugin-transform-modules-amd'] }))
        .pipe(rename({ extname: '.js' }))
        .pipe(dest("_local_server/src/js/components/"))
        .pipe(browserSync.stream())
} 

export function SASS() {
    return src("app/src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write("."))
        .pipe(dest("app/src/css/"))
        .pipe(dest("_local_server/src/css/"))
        .pipe(browserSync.stream())
}

function myServer() {
    browserSync.init({
        server: {
            baseDir: "_local_server" // папка для локального сервера
        },
        notify: false
    });

    watch("app/src/scss/**/*", { usePolling: true }, SASS); // следим за SASS
    watch("app/src/js/**/*.js", { usePolling: true }, JS); // следим за JS
    watch("app/src/images/**/*.*", { usePolling: true }, IMAGES);    // следим за картинками
    watch('app/src/js/components/**/*.vue', { usePolling: true }, VUE); // следим за VUE
    watch("app/**/*.html", { usePolling: true }, HTML);    // следим за HTML
}

export const defaultTask = series(SASS, HTML, JS, VUE, IMAGES, myServer);
export { defaultTask as default };