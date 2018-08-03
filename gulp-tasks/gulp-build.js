'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);
const conf = require('../conf/gulp.conf');

module.exports = () => {
    return {
        buildTask: (cb) => {
            return runSequence(
                'clean', [
                    'copy-fonts',
                    'copy-languages',
                    'copy-images',
                    'vendor-js',
                    'make-config-file',
                    'make-version-file',
                    'copy-views',
                    'copy-index',
                    'vendor-css',
                    'sass',
                    'tslint',
                    'compile-ts'
                ],
                cb);
        }
    };
};
