'use strict';

const gulp = require('gulp');
const connect = require("gulp-connect");
const runSequence = require("run-sequence").use(gulp);

const liteServer = require('../conf/lite-server.conf')();
const conf = require('../conf/gulp.conf');

module.exports = () => {
    let SERVER_DEV = connect;
    let SERVER_TEST = connect;
    let SERVER_PROD = connect;

    return {
        devServerTask: () => {
            SERVER_DEV.server(liteServer.DEV_SERVER);
        },
        testServerTask: () => {
            SERVER_TEST.server(liteServer.TEST_SERVER);
        },
        prodServerTask: () => {
            SERVER_PROD.server(liteServer.PROD_SERVER);
        },
        serverDevStartTask: () => {
            return runSequence('dev-server', conf.serverCallBack);
        },
        serverTestStartTask: () => {
            return runSequence('test-server', conf.serverCallBack);
        },
        serverProdStartTask: () => {
            return runSequence('prod-server', conf.serverCallBack);
        }
    }
};
