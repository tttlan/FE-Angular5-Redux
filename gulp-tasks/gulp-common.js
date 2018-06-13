'use strict';

const gulp = require('gulp');
const del = require('del');
const plugins = require('gulp-load-plugins')();
const paths = require('path');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const htmlmin = require('gulp-htmlmin');
const createFile = require('create-file');
const b2v = require('buffer-to-vinyl');
const gulpTsConfig = require('gulp-ts-config');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const typescript = require('gulp-typescript');
const tslint = require('gulp-tslint');
const tsc = require('gulp-typescript');
const runSequence = require('run-sequence').use(gulp);
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const gp_concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const conf = require('../conf/gulp.conf');
const server = require('../conf/server.conf')();
const tsProject = tsc.createProject('./tsconfig.json');
const gulpDefault = require('./gulp-default')();

module.exports = () => {
    let OPTIONS = {
        DO_UGLIFY: false,
        DO_SOURCEMAPS: true,
        watchInterval: 1000
    };

    var sass = () => {
        OPTIONS.DO_SOURCEMAPS = process.env.NODE_ENV === 'dev' ? true : false;

        return gulp.src(conf.paths.src + conf.paths.mainScss)
            .pipe(plugins.if(OPTIONS.DO_SOURCEMAPS, plugins.sourcemaps.init()))
            .pipe(plugins.sass())
            .on('error', conf.errorHandler)
            .pipe(plugins.rename(function (path) {
                path.basename = path.basename.replace('styles', 'app.bundle');
            }))
            .pipe(cleanCSS())
            .pipe(plugins.if(OPTIONS.DO_SOURCEMAPS, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(conf.paths.build + conf.paths.buildCssFolder));
    };

    var tsCompile = () => {
        OPTIONS.DO_SOURCEMAPS = process.env.NODE_ENV === 'dev' ? true : false;

        let tsResult = gulp.src([
            conf.paths.src + '/**/*.ts'
        ])
            .pipe(plugins.if(OPTIONS.DO_SOURCEMAPS, plugins.sourcemaps.init()))
            .pipe(tsProject());

        return tsResult.js
            .pipe(plugins.if(OPTIONS.DO_SOURCEMAPS, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(conf.paths.build + '/'));
    };

    var minifyHtml = () => {
        // OPTIONS.DO_UGLIFY = process.env.NODE_ENV === 'dev' ? false : true; //need check

        return gulp.src([
            conf.paths.src + conf.paths.appHtmlFile
        ])
            .pipe(plugins.if(OPTIONS.DO_UGLIFY, htmlmin(conf.htmlmin)))
            .pipe(gulp.dest(conf.paths.build + conf.paths.buildAppFolder));
    };

    var minifyIndex = () => {
        // OPTIONS.DO_UGLIFY = process.env.NODE_ENV === 'dev' ? false : true;

        return gulp.src(conf.paths.src + conf.paths.appIndexFile)
            .pipe(plugins.if(OPTIONS.DO_UGLIFY, htmlmin(conf.htmlmin)))
            .pipe(gulp.dest(conf.paths.build + '/'));
    };

    var vendorCSS = () => {
        OPTIONS.DO_SOURCEMAPS = process.env.NODE_ENV === 'dev' ? true : false;

        return gulp.src(conf.vendorCss)
            .pipe(plugins.if(OPTIONS.DO_SOURCEMAPS, plugins.sourcemaps.init()))
            .pipe(plugins.concat('vendor.bundle.css'))
            .pipe(cleanCSS())
            .pipe(plugins.if(OPTIONS.DO_SOURCEMAPS, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(conf.paths.build + conf.paths.buildCssFolder));
    };

    return {
        cleanTask: () => {
            return del([
                conf.paths.build + '/**/*'
            ], {
                    force: true
                });
        },
        copyViewsTask: () => {
            minifyHtml();
        },
        copyImagesTask: () => {
            return gulp.src(conf.paths.src + conf.paths.assetImageFile)
                .pipe(imagemin())
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildImageFolder));
        },
        copyFontsTask: () => {
            return gulp.src(conf.paths.src + conf.paths.assetFontsFile)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildFontsFolder));
        },
        copyIndexTask: () => {
            minifyIndex();
        },
        sassTask: () => {
            sass();
        },
        lintFixTask: () => {
            return gulp.src([
                conf.paths.src + '**/*.ts'
            ])
                // .pipe(eslint({
                //     fix: true
                // }))
                // .pipe(eslint.format())
                .pipe(gulp.dest(conf.paths.src + '/'));
        },
        lintWatchTask: () => {
            return gulp.watch([
                conf.paths.src + '**/*.ts'
            ], ['lint-fix']);
        },
        makeConfigFileTask: () => {
            let json = JSON.stringify({});

            return b2v.stream(new Buffer(json), 'AppSettings.js')
                .pipe(gulpTsConfig('AppSettings', {
                    createModule: false,
                    constants: {
                        SERVICE_URL: server.service_url,
                        API_PROTOCOL: server.api_protocol,
                        API_HOST: server.api_host,
                        API_PORT: server.api_port,
                        API_DOMAIN: server.api_domain,
                        ENVIRONMENT: server.environment
                    }
                }))
                .pipe(gulp.dest(conf.paths.src + conf.paths.environmentFile));
        },
        delConfigFileTask: () => {
            return del([
                conf.paths.build + conf.paths.environmentFile + 'AppSettings.js'
            ]);
        },
        vendorCssTask: () => {
            vendorCSS();
        },
        copyAngularTask: () => {
            return gulp.src([
                conf.configs.angular,
                '!' + conf.configs.angularHttp
            ])
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder + '@angular/'));
        },
        copyRxjsTask: () => {
            return gulp.src(conf.configs.rxjs)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder + 'rxjs/'));
        },
        copyAngularWebApiTask: () => {
            return gulp.src(conf.configs.angularWebApi)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder + 'angular2-in-memory-web-api/'));
        },
        copyCorejsTask: () => {
            return gulp.src(conf.configs.corejs)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copyZonejsTask: () => {
            return gulp.src(conf.configs.zonejs)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copyReflectjsTask: () => {
            return gulp.src(conf.configs.reflectjs)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copySystemjsTask: () => {
            return gulp.src(conf.configs.systemjs)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copySystemConfigFileTask: () => {
            return gulp.src(conf.configs.systemConfigFile)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copyRespondjsTask: () => {
            return gulp.src(conf.configs.respondjs)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copyXdomainjsTask: () => {
            return gulp.src(conf.configs.xdomain)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copyTslibTask: () => {
            return gulp.src(conf.configs.tslib)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copyLodashTask: () => {
            return gulp.src(conf.configs.lodash)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copyCryptoTask: () => {
            return gulp.src(conf.configs.cryptoJs)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder + 'cryptoJs/'));
        },
        copyStringFormatTask: () => {
            return gulp.src(conf.configs.stringFormat)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        copyDeepFreezeStrictTask: () => {
            return gulp.src(conf.configs.deepFreezeStrict)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder + 'deep-freeze-strict/'));
        },
        copyNgrxStoreFreezeTask: () => {
            return gulp.src(conf.configs.ngrxStoreFreeze)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder + 'ngrx-store-freeze/'));
        },
        copyHammerjsTask: () => {
            return gulp.src(conf.configs.hammerjs)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder + 'hammerjs/'))
        },
        copyAppTask: () => {
            return gulp.src([
                conf.paths.src + '/**/*.js',
                '!' + conf.paths.src + conf.paths.assetJsAllFile
            ])
                .pipe(gulp.dest(conf.paths.build + '/client/'));
        },
        copyNg2BootstrapTask: () => {
            return gulp.src(conf.configs.ng2Bootstrap)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder + 'ng2-bootstrap/'));
        },
        copyNgRxTask: () => {
            return gulp.src(conf.configs.ngrx)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder + '@ngrx/'));
        },
        bundleJsTask: () => {
            return gulp.src(conf.bundleJs)
                // .pipe(eslint({
                //     quiet: true
                // }))
                .pipe(plugins.sourcemaps.init())
                .pipe(gp_concat('vendor.bundle.js'))
                .pipe(uglify())
                .pipe(ngAnnotate())
                .pipe(plugins.sourcemaps.write('./'))
                .on('error', conf.errorHandler)
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildJsFolder));
        },
        browserifyFilesTask: function () {
            var urlencode = conf.paths.urlencode;

            return browserify([urlencode], { standalone: "urlencode" })
                .bundle()
                //Pass desired output filename to vinyl-source-stream
                .pipe(source('urlencode.js'))
                // Start piping stream to tasks!
                .pipe(gulp.dest(conf.paths.build + conf.paths.buildLibsFolder));
        },
        vendorJsTask: (cb) => {
            return runSequence(
                'copy-system-conf-file',
                'bundle-js', [
                    'copy-angular',
                    'copy-rxjs',
                    'copy-angularWebApi',
                    'copy-ngrx',
                    'copy-ngrx-store-freeze',
                    'copy-hammerjs',
                    'copy-corejs',
                    'copy-zonejs',
                    'copy-reflectjs',
                    'copy-systemjs',
                    'copy-respondjs',
                    'copy-xdomainjs',
                    'copy-tslib',
                    'copy-lodash',
                    'copy-urlencode',
                    'copy-crypto',
                    'copy-string-format',
                    'copy-deep-freeze-strict'
                ],
                cb
            );
        },
        tslintTask: () => {
            return gulp.src([
                conf.paths.src + '/**/*.ts',
                '!' + conf.paths.src + conf.paths.environmentFile + 'AppSettings.ts'
            ])
                .pipe(tslint({
                    formatter: 'verbose'
                }))
                .pipe(tslint.report());
        },
        compileTsTask: () => {
            tsCompile();
        },
        watchTask: (cb) => {
            plugins.livereload.listen();

            gulp.watch(conf.paths.src + conf.paths.assetImageAllFile, {
                interval: OPTIONS.watchInterval
            }, () => {
                runSequence('copy-images', cb);
            });

            gulp.watch(conf.paths.src + conf.paths.assetFontsAllFile, {
                interval: OPTIONS.watchInterval
            }, () => {
                runSequence('copy-fonts', cb);
            });

            gulp.watch(conf.paths.src + conf.paths.assetCssFile, {
                interval: OPTIONS.watchInterval
            }, () => {
                runSequence('vendor-css', cb);
            });

            gulp.watch(conf.paths.src + conf.paths.appScssFile, {
                interval: OPTIONS.watchInterval
            }, () => {
                runSequence('sass', cb);
            });

            gulp.watch([
                conf.paths.src + conf.paths.appTsFile,
                '!' + conf.paths.src + conf.paths.environmentFile + 'AppSettings.ts'
            ], {
                    interval: OPTIONS.watchInterval
                }, () => {
                    runSequence(
                        'tslint',
                        'compile-ts',
                        cb
                    );
                });

            gulp.watch(conf.paths.src + conf.paths.appIndexFile, {
                interval: OPTIONS.watchInterval
            }, () => {
                runSequence('copy-index', cb);
            });

            gulp.watch(conf.paths.src + conf.paths.appHtmlFile, {
                interval: OPTIONS.watchInterval
            }, () => {
                runSequence('copy-views', cb);
            });

            gulp.watch(conf.paths.src + '/**/*', {
                interval: OPTIONS.watchInterval
            }).on('change', function (file) {
                setTimeout(function () {
                    plugins.livereload.changed(file);
                }, 1000);
            });
        }
    }
};
