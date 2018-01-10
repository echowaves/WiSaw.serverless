const argv = require('yargs').argv

const env = argv.env || "test";// default to test stage

const dev_config = require('../.env.sample').config();
const test_config = require('../.env.test').config();
const prod_config = require('../.env.prod').config();



module.exports = {
  dev: {
    username: dev_config.DB_USERNAME,
    password: dev_config.DB_PASSWORD,
    database: dev_config.DB_DATABASE,
    host: dev_config.DB_HOST,
    dialect: dev_config.DB_DIALECT
  },
  test: {
    username: test_config.DB_USERNAME,
    password: test_config.DB_PASSWORD,
    database: test_config.DB_DATABASE,
    host: test_config.DB_HOST,
    dialect: test_config.DB_DIALECT
  },
  prod: {
    username: prod_config.DB_USERNAME,
    password: prod_config.DB_PASSWORD,
    database: prod_config.DB_DATABASE,
    host: prod_config.DB_HOST,
    dialect: prod_config.DB_DIALECT
  }
};
