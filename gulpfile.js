'use strict';

const gulp = require('gulp');

const gulpCommon = require('./gulp-tasks/gulp-common')();
const gulpBuild = require('./gulp-tasks/gulp-build')();
const gulpServer = require('./gulp-tasks/gulp-server')();
const gulpDeploy = require('./gulp-tasks/gulp-deploy')();
const gulpDefault = require('./gulp-tasks/gulp-default')();

gulp.task('clean', gulpCommon.cleanTask);
gulp.task('copy-views', gulpCommon.copyViewsTask);
gulp.task('copy-images', gulpCommon.copyImagesTask);
gulp.task('copy-fonts', gulpCommon.copyFontsTask);
gulp.task('copy-index', gulpCommon.copyIndexTask);
gulp.task('sass', gulpCommon.sassTask);
gulp.task('lint-fix', gulpCommon.lintFixTask);
gulp.task('lint-watch', gulpCommon.lintWatchTask);
gulp.task('del-config-file', gulpCommon.delConfigFileTask);
gulp.task('make-config-file', gulpCommon.makeConfigFileTask);
gulp.task('vendor-css', gulpCommon.vendorCssTask);
gulp.task('copy-angular', gulpCommon.copyAngularTask);
gulp.task('copy-corejs', gulpCommon.copyCorejsTask);
gulp.task('copy-zonejs', gulpCommon.copyZonejsTask);
gulp.task('copy-reflectjs', gulpCommon.copyReflectjsTask);
gulp.task('copy-systemjs', gulpCommon.copySystemjsTask);
gulp.task('copy-rxjs', gulpCommon.copyRxjsTask);
gulp.task('copy-rxjs-compat', gulpCommon.copyRxjsCompatTask);
gulp.task('copy-angularWebApi', gulpCommon.copyAngularWebApiTask);
gulp.task('copy-system-conf-file', gulpCommon.copySystemConfigFileTask);
gulp.task('copy-app', gulpCommon.copyAppTask);
gulp.task('copy-respondjs', gulpCommon.copyRespondjsTask);
gulp.task('copy-xdomainjs', gulpCommon.copyXdomainjsTask);
gulp.task('copy-tslib', gulpCommon.copyTslibTask);
gulp.task('copy-lodash', gulpCommon.copyLodashTask);
gulp.task('copy-crypto', gulpCommon.copyCryptoTask);
gulp.task('copy-string-format', gulpCommon.copyStringFormatTask);
gulp.task('copy-ngrx-store-freeze', gulpCommon.copyNgrxStoreFreezeTask);
gulp.task('copy-deep-freeze-strict', gulpCommon.copyDeepFreezeStrictTask);
gulp.task('copy-hammerjs', gulpCommon.copyHammerjsTask);
gulp.task('copy-ngrx', gulpCommon.copyNgRxTask);
gulp.task('vendor-js', gulpCommon.vendorJsTask);
gulp.task('bundle-js', gulpCommon.bundleJsTask);
gulp.task('tslint', gulpCommon.tslintTask);
gulp.task('compile-ts', ['make-config-file'], gulpCommon.compileTsTask);
gulp.task('watch', gulpCommon.watchTask);
gulp.task('copy-urlencode', gulpCommon.browserifyFilesTask);

/**
 * Gulp task for start server
 */
gulp.task('dev-server', gulpServer.devServerTask);
gulp.task('test-server', gulpServer.testServerTask);
gulp.task('prod-server', gulpServer.prodServerTask);
gulp.task('server-dev-start', gulpServer.serverDevStartTask);
gulp.task('server-test-start', gulpServer.serverTestStartTask);
gulp.task('server-prod-start', gulpServer.serverProdStartTask);


/**
 * Gulp task for run local
 */
gulp.task('default', gulpDefault.defaultTask);


/**
 * Gulp task for build
 */
gulp.task('build', gulpBuild.buildTask);

/**
 * gulp task for deploy
 */
gulp.task('del-version-file', gulpDeploy.delVersionFileTask);
gulp.task('get-version-info', gulpDeploy.getVersionInfoTask);
gulp.task('make-version-file', gulpDeploy.makeVersionFileTask);
gulp.task('make-deploy-folder', ['get-version-info'], gulpDeploy.makeDeployFolderTask);
gulp.task('copy-file-to-deploy', gulpDeploy.copyFileToDeployFolderTask);
gulp.task('make-zip-folder', ['build', 'make-deploy-folder', 'make-version-file', 'copy-file-to-deploy'], gulpDeploy.makeZipFolderTask);
gulp.task('deploy', gulpDeploy.deployTask);

/**
 * Gulp task for unit test
 */


/**
 * Gulp task for automation
 */
