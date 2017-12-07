'use strict';

/**
 * Configuration lite server 
 */
const history = require("connect-history-api-fallback");

const server = require('./server.conf')();

module.exports = () => {
    let DEV_SERVER = {};
    let TEST_SERVER = {};
    let PROD_SERVER = {};

    return {
        DEV_SERVER: {
            port: server.dev_environment.port,
            host: server.dev_environment.host,
            root: server.dev_environment.base_dir,
            index: server.dev_environment.index,
            livereload: false,
            middleware: function (connect, opt) {
                return [
                    history({
                        index: server.dev_environment.index,
                        verbose: true
                    })
                ]
            },
            debug: true
        },
        TEST_SERVER: {
            port: server.test_environment.port,
            host: server.test_environment.host,
            root: server.test_environment.base_dir,
            index: server.test_environment.index,
            wait: 1000,
            livereload: false,
            middleware: function (connect, opt) {
                return [
                    history({
                        index: server.test_environment.index,
                        verbose: true
                    })
                ]
            }
        },
        PROD_SERVER: {
            port: server.prod_environment.port,
            host: server.prod_environment.host,
            root: server.prod_environment.base_dir,
            index: server.prod_environment.index,
            wait: 1000,
            livereload: false,
            middleware: function (connect, opt) {
                return [
                    history({
                        index: server.prod_environment.index,
                        verbose: true
                    })
                ]
            }
        }
    }
};
