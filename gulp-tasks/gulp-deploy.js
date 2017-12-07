'use strict';

const gulp = require('gulp');
const del = require('del');
const dotenv = require('dotenv');
const createFile = require("create-file");
const git = require("git-rev-sync");
const dateFormat = require("dateformat");
const zip = require("zipfolder");
const runSequence = require('run-sequence').use(gulp);

const conf = require('../conf/gulp.conf');

module.exports = () => {
    dotenv.load();

    return {
        delVersionFileTask: () => {
            return del([
                conf.paths.build + '/version.txt'
            ]);
        },
        getVersionInfoTask: () => {
            process.env.GIT_COMMIT_ID = git.short();
            process.env.GIT_BRANCH = git.branch();

            let now = new Date();
            process.env.GIT_BUILD_TIME = dateFormat(now, 'dd/mm/yyyy');

            let number = process.env.DEPLOY_MAJOR + '.' + process.env.DEPLOY_MINOR + '.' + process.env.DEPLOY_POINT;
            let build_type = process.env.DEPLOY_BUILD_TYPE;

            let firstName = process.env.DEPLOY_PROJECT_NAME + '-frontend-' + process.env.DEPLOY_RELEASE_NAME + '-' + dateFormat(now, 'yyyymmdd') + '-build-' + number + '-' + build_type;
            let lastName = '-Rev-' + process.env.GIT_COMMIT_ID;

            process.env.FOLDER_ZIP = firstName + lastName;
            process.env.FOLDER_ZIP_RELEASE = firstName;
        },
        makeVersionFileTask: () => {
            var contents = 'Build Time: ' + process.env.GIT_BUILD_TIME + '\n' +
                'Build Number: ' + process.env.DEPLOY_MAJOR + '.' + process.env.DEPLOY_MINOR + '.' + process.env.DEPLOY_POINT + '\n' +
                'Build Type: ' + process.env.DEPLOY_BUILD_TYPE + '\n' +
                'Branch: ' + process.env.GIT_BRANCH + '\n' +
                'Git Commit Id: ' + process.env.GIT_COMMIT_ID + '\n';

            createFile(conf.paths.deploy + '/' + process.env.FOLDER_ZIP + '/' + process.env.FOLDER_ZIP_RELEASE + '/version.txt', contents, function (err) {
                if (err) {
                    conf.errorHandler(err);
                } else {
                    console.log('create version file successfully !');
                }
            });
        },
        makeDeployFolderTask: () => {
            return gulp.src([
                    conf.paths.build + '/**/*'
                ])
                .pipe(gulp.dest(conf.paths.deploy + '/' + process.env.FOLDER_ZIP + '/' + process.env.FOLDER_ZIP_RELEASE + '/' + conf.paths.build + '/'));
        },
        copyFileToDeployFolderTask: function () {
            return gulp.src([
                    conf.paths.release + '/*',
                    conf.paths.release + '/.env'
                ])
                .pipe(gulp.dest(conf.paths.deploy + '/' + process.env.FOLDER_ZIP + '/' + process.env.FOLDER_ZIP_RELEASE + '/'));
        },
        makeZipFolderTask: () => {
            var folderName = process.env.FOLDER_ZIP;

            zip.zipFolder({
                folderPath: conf.paths.deploy + '/' + folderName
            }, function (err, path) {
                if (err) {
                    conf.errorHandler(err);
                } else {
                    del([conf.paths.deploy + '/' + process.env.FOLDER_ZIP]).then(paths => {
                        console.log('Deleted folder:', paths.join('\n'));
                    });
                }
            });
        },
        deployTask: () => {
            return runSequence(
                'clean',
                // 'unit-tests',
                'make-zip-folder',
                conf.errorHandler);
        }
    }
};
