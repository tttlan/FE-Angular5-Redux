'use strict';

const path = require('path');
const gutil = require('gulp-util');

exports.paths = {
    src: 'src',
    test: 'test',
    tasks: 'gulp-tasks',
    build: 'build',
    tmp: '.tmp',
    deploy: 'deploy',
    release: 'release',
    environmentFile: '/app/shared/enums/',

    mainScss: '/assets/styles/styles.scss',
    appScssFile: '/assets/styles/**/*.scss',

    appHtmlFile: '/app/**/*.html',
    appTsFile: '/app/**/*.ts',

    appIndexFile: '/index.html',

    assetCssFile: '/assets/css/**/*.css',
    assetCssAllFile: '/assets/**/*.css',
    assetImageFile: '/assets/images/**/*',
    assetImageAllFile: '/assets/images/**',
    assetFontsFile: '/assets/fonts/**/*',
    assetFontsAllFile: '/assets/fonts/**',
    assetJsFile: '/assets/js/**/*.js',
    assetJsAllFile: '/assets/**/*.js',

    buildCssFolder: '/css/',
    buildImageFolder: '/images/',
    buildFontsFolder: '/fonts/',
    buildLibsFolder: '/libs/',
    buildJsFolder: '/js/',
    buildAppFolder: '/app/'
};

exports.htmlmin = {
    ignoreCustomFragments: [/{{.*?}}/],
    collapseWhitespace: true
};

exports.path = {};
for (const pathName in exports.paths) {
    if (Object.prototype.hasOwnProperty.call(exports.paths, pathName)) {
        exports.path[pathName] = function () {
            const pathValue = exports.paths[pathName];
            const funcArgs = Array.prototype.slice.call(arguments);
            const joinArgs = [pathValue].concat(funcArgs);
            return path.join.apply(this, joinArgs);
        };
    }
}

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = (title) => {
    return function (err) {
        gutil.log(gutil.colors.red(`[${title}]`), err.toString());
        this.emit('end');
    };
};

exports.serverCallBack = (err) => {
    if (err) {
        console.log('Sorry! Server could not be ran. Please try to again');
        console.log(err);
    } else {
        console.log('Server ran successfully!');
    }
};

exports.app = {
    moduleName: 'mcare'
};

exports.configs = {
    angular: './node_modules/@angular/**/*.js',
    angularHttp: './node_modules/@angular/http',
    angularWebApi: './node_modules/angular2-in-memory-web-api/*.js',
    corejs: './node_modules/core-js/client/shim.min.js',
    zonejs: './node_modules/zone.js/dist/zone.js',
    reflectjs: './node_modules/reflect-metadata/Reflect.js',
    systemjs: './node_modules/systemjs/dist/system.src.js',
    rxjs: './node_modules/rxjs/**/*.js',
    jasminejs: './node_modules/jasmine-core/lib/jasmine-core/*.*',
    systemConfigFile: './conf/systemjs.conf.js',
    respondjs: './node_modules/respond.js/src/respond.js',
    xdomain: './node_modules/xdomain/dist/xdomain.js',
    moment: './node_modules/moment/moment.js',
    momentTimeZone: './node_modules/moment-timezone/moment-timzone.js',
    bootstrapJs: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    bootstrapCSS: './node_modules/bootstrap/dist/css/bootstrap.min.css',
    ng2Bootstrap: './node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
    jquery: './node_modules/jquery/dist/jquery.min.js',
    ngrx: './node_modules/@ngrx/**/*.js',
    ngrxStoreFreeze: './node_modules/ngrx-store-freeze/**/*.js',
    hammerjs: './node_modules/hammerjs/**/*',
    materialTheme: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
    tslib: './node_modules/tslib/tslib.js',
    lodash: './node_modules/lodash/lodash.js',
    cryptoJs: './node_modules/crypto-js/crypto-js.js',
    deepFreezeStrict: './node_modules/deep-freeze-strict/**/*.js'
};

exports.bundleJs = [
    this.configs.jquery,
    this.configs.bootstrapJs,
    this.configs.moment,
    this.configs.momentTimeZone,
    this.configs.cryptoJs,
    this.paths.src + this.paths.assetJsFile
];

exports.vendorCss = [
    this.configs.bootstrapCSS,
    this.configs.materialTheme,
    this.paths.src + this.paths.assetCssAllFile
];
