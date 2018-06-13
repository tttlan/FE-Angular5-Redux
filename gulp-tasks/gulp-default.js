'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);
const conf = require('../conf/gulp.conf');

module.exports = () => {
    return {
        defaultTask: (cb) => {
            return runSequence(
                'clean', [
                    'copy-fonts',
                    'copy-images',
                    'vendor-css',
                    'vendor-js',
                    'make-config-file',
                    'copy-views',
                    'copy-index',
                    'sass',
                    'tslint',
                    'compile-ts'
                ],
                'server-dev-start',
                'watch',
                cb);
        }
    };
};
