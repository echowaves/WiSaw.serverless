const argv = require('yargs').argv

const env = argv.env || "test";// default to test stage

const config = require('../.env.'+ env).config();



module.exports = {
  dev: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT
  },
  test: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT
  },
  prod: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT
  }
};
