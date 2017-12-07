/**
 * Configuration server information
 */

const dotenv = require('dotenv');

module.exports = () => {
    dotenv.load();
    const ENV = dotenv.config().parsed || {};
    const ENV_SETUP = process.env;

    const API_PROTOCOL = ENV_SETUP.API_PROTOCAL || ENV.API_PROTOCAL || 'http://';
    const API_HOST = ENV_SETUP.API_HOST_NAME || ENV.API_HOST_NAME || 'localhost';
    const API_PORT = ENV_SETUP.API_PORT || ENV.API_PORT || '9090';
    const API_DOMAIN = ENV_SETUP.API_DOMAIN || ENV.API_DOMAIN || 'rest';

    const SERVICE_URL = API_PROTOCOL + API_HOST + ':' + API_PORT + '/' + API_DOMAIN;

    const LIVE_SERVER_DEV_HOST = ENV_SETUP.DEV_SERVER || ENV.DEV_SERVER || 'localhost';
    const LIVE_SERVER_DEV_PORT = ENV_SETUP.DEV_SERVER_PORT || ENV.DEV_SERVER_PORT || '3000';

    const LIVE_SERVER_TEST_HOST = ENV_SETUP.TEST_SERVER || ENV.TEST_SERVER || 'localhost';
    const LIVE_SERVER_TEST_PORT = ENV_SETUP.TEST_SERVER_PORT || ENV.TEST_SERVER_PORT || '8080';

    const LIVE_SERVER_PROD_HOST = ENV_SETUP.PROD_SERVER || ENV.PROD_SERVER || 'localhost';
    const LIVE_SERVER_PROD_PORT = ENV_SETUP.PROD_SERVER_PORT || ENV.PROD_SERVER_PORT || '9090';

    const NODE_ENV = ENV.NODE_ENV || 'dev';

    let config = {
        api_protocol: API_PROTOCOL,
        api_host: API_HOST,
        api_port: API_PORT,
        api_domain: API_DOMAIN,
        service_url: SERVICE_URL,
        environment: NODE_ENV,
        dev_environment: {
            host: LIVE_SERVER_DEV_HOST,
            port: LIVE_SERVER_DEV_PORT,
            base_dir: ['build']
        },
        test_environment: {
            host: LIVE_SERVER_TEST_HOST,
            port: LIVE_SERVER_TEST_PORT,
            base_dir: ['build']
        },
        prod_environment: {
            host: LIVE_SERVER_PROD_HOST,
            port: LIVE_SERVER_PROD_PORT,
            base_dir: ['build']
        }
    };

    return config;
};