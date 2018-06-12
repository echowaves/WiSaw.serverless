(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = undefined;

__webpack_require__(0);

var _sequelize = __webpack_require__(1);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _pg = __webpack_require__(10);

var _pg2 = _interopRequireDefault(_pg);

var _pgHstore = __webpack_require__(9);

var _pgHstore2 = _interopRequireDefault(_pgHstore);

var _config = __webpack_require__(8);

var dbConfig = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this is needed for initialization purpose, although we never user it directly
// eslint-disable-next-line no-unused-vars
if ((process.env.STAGE || 'test') === 'test') {
  process.env.DATABASE_URL = dbConfig.test.DATABASE_URL;
}

// eslint-disable-next-line import/prefer-default-export
// the same as above

// eslint-disable-next-line no-unused-vars
var sequelize = exports.sequelize = new _sequelize2.default(process.env.DATABASE_URL, {
  // disable logging; default: console.log
  logging: false,
  operatorsAliases: _sequelize2.default.Op // use Sequelize.Op
});

sequelize.authenticate().then(function () {
  return console.log('Connection to database has been established successfully.');
}).catch(function (err) {
  return console.error('Unable to connect to the database:', err);
});

// export default sequelize

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

module.exports.config = function () {
    return {
        HOST: "https://api.wisaw.com",

        DB_USERNAME: "awsroot",
        DB_PASSWORD: "h5AGk6eoAdkj234bfbusd87hUn4kCCFCm",
        DB_DATABASE: "wisaw_prod",
        DB_HOST: "wisaw-prod.cbaw0b5dcxjh.us-east-1.rds.amazonaws.com",
        DB_DIALECT: "postgres",
        get DATABASE_URL() {
            return this.DB_DIALECT + "://" + this.DB_USERNAME + ":" + this.DB_PASSWORD + "@" + this.DB_HOST + ":5432/" + this.DB_DATABASE;
        }
    };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

module.exports.config = function () {
    return {
        HOST: "https://testapi.wisaw.com",

        DB_USERNAME: "awsroot",
        DB_PASSWORD: "Un4dLKJjndnrkjnskCCFCdckjsndfkjm",
        DB_DATABASE: "wisaw_test",
        DB_HOST: "wisaw-test.cbaw0b5dcxjh.us-east-1.rds.amazonaws.com",
        DB_DIALECT: "postgres",
        get DATABASE_URL() {
            return this.DB_DIALECT + "://" + this.DB_USERNAME + ":" + this.DB_PASSWORD + "@" + this.DB_HOST + ":5432/" + this.DB_DATABASE;
        }
    };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

module.exports.config = function () {
    return {
        HOST: "https://sampleapi.wisaw.com",

        DB_USERNAME: "root",
        DB_PASSWORD: "root",
        DB_DATABASE: "ew_sample",
        DB_HOST: "localhost",
        DB_DIALECT: "postgres",
        get DATABASE_URL() {
            return this.DB_DIALECT + "://" + this.DB_USERNAME + ":" + this.DB_PASSWORD + "@" + this.DB_HOST + ":5432/" + this.DB_DATABASE;
        }
    };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var devConfig = __webpack_require__(7).config();
var testConfig = __webpack_require__(6).config();
var prodConfig = __webpack_require__(5).config();

module.exports = {
  dev: {
    username: devConfig.DB_USERNAME,
    password: devConfig.DB_PASSWORD,
    database: devConfig.DB_DATABASE,
    host: devConfig.DB_HOST,
    dialect: devConfig.DB_DIALECT,
    DATABASE_URL: devConfig.DATABASE_URL
  },
  test: {
    username: testConfig.DB_USERNAME,
    password: testConfig.DB_PASSWORD,
    database: testConfig.DB_DATABASE,
    host: testConfig.DB_HOST,
    dialect: testConfig.DB_DIALECT,
    DATABASE_URL: testConfig.DATABASE_URL
  },
  prod: {
    username: prodConfig.DB_USERNAME,
    password: prodConfig.DB_PASSWORD,
    database: prodConfig.DB_DATABASE,
    host: prodConfig.DB_HOST,
    dialect: prodConfig.DB_DIALECT,
    DATABASE_URL: prodConfig.DATABASE_URL
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("pg-hstore");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(0);

var _sequelize = __webpack_require__(1);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _consts = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Photo = _consts.sequelize.define('Photo', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: _sequelize2.default.INTEGER
  },
  uuid: {
    type: _sequelize2.default.UUID,
    allowNull: false
  },
  location: {
    type: _sequelize2.default.GEOMETRY('POINT'),
    allowNull: false
  },
  likes: {
    allowNull: false,
    type: _sequelize2.default.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: _sequelize2.default.DATE
  },
  updatedAt: {
    allowNull: false,
    type: _sequelize2.default.DATE
  },
  active: {
    allowNull: false,
    type: _sequelize2.default.BOOLEAN,
    defaultValue: false
  }
}, {
  getterMethods: {
    getImgUrl: function getImgUrl() {
      return 'https://s3.amazonaws.com/' + process.env.IMAGE_BUCKET + '/' + this.id;
    },
    getThumbUrl: function getThumbUrl() {
      return 'https://s3.amazonaws.com/' + process.env.IMAGE_BUCKET + '/' + this.id + '-thumb';
    }
  }
});

// Adding a class level method

// Adding an instance level method

exports.default = Photo;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(0);

var _sequelize = __webpack_require__(1);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _consts = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AbuseReport = _consts.sequelize.define('AbuseReport', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: _sequelize2.default.INTEGER
  },
  photoId: {
    allowNull: false,
    type: _sequelize2.default.INTEGER
  },
  uuid: {
    type: _sequelize2.default.UUID,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: _sequelize2.default.DATE
  },
  updatedAt: {
    allowNull: false,
    type: _sequelize2.default.DATE
  }
});

// Adding a class level method

// Adding an instance level method

exports.default = AbuseReport;

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _regenerator = __webpack_require__(3);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = __webpack_require__(11);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// eslint-disable-next-line import/prefer-default-export
var main = exports.main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var data, uuid, location, likes, _response, c, _response2, createdAt, updatedAt, photo, _response3, s3, s3Params, uploadURL, response;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Instruct the lambda to exit immediately
            // and not wait for node event loop to be empty.
            context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

            data = JSON.parse(event.body);
            // console.log({data})

            uuid = data ? data.uuid : null;
            location = data ? data.location : null;
            likes = 0; // have to privude default value since this column does not allow nulls

            if (!(!data || !uuid || !location)) {
              _context.next = 10;
              break;
            }

            console.log('setting status to 400');
            _response = {
              statusCode: 400,
              body: (0, _stringify2.default)({ error: 'parameters missing' })
            };

            callback(null, _response);
            return _context.abrupt('return', false);

          case 10:
            _context.next = 12;
            return _abuseReport2.default.count({ where: { uuid: uuid } });

          case 12:
            c = _context.sent;

            console.log('count of abuse: ' + c);

            if (!(c > 3)) {
              _context.next = 18;
              break;
            }

            _response2 = {
              statusCode: 401,
              body: (0, _stringify2.default)({ error: 'Anauthorized.' })
            };

            callback(null, _response2);
            return _context.abrupt('return', false);

          case 18:

            console.log('uuid:', uuid);
            console.log('location:', location);

            createdAt = (0, _moment2.default)();
            updatedAt = createdAt;

            // create and safe record

            photo = void 0;
            _context.prev = 23;
            _context.next = 26;
            return _photo2.default.create({
              uuid: uuid,
              location: location,
              likes: likes,
              createdAt: createdAt,
              updatedAt: updatedAt
            });

          case 26:
            photo = _context.sent;
            _context.next = 35;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context['catch'](23);

            console.log('unable to create Photo', _context.t0);
            _response3 = {
              statusCode: 500,
              body: (0, _stringify2.default)({ error: 'Unable to create a new Photo' })
            };

            callback(null, _response3);
            return _context.abrupt('return', false);

          case 35:
            s3 = new AWS.S3();
            s3Params = {
              Bucket: process.env.IMAGE_BUCKET,
              Key: '' + photo.id,
              ContentType: 'image/jpeg',
              Expires: 60, // expires in 1 minute, after that request a new URL
              ACL: 'public-read'
            };
            uploadURL = s3.getSignedUrl('putObject', s3Params);

            // Resond to request indicating the photo was created

            response = {
              statusCode: 201,
              body: (0, _stringify2.default)({
                status: 'success',
                uploadURL: uploadURL,
                photo: photo
              })
            };

            callback(null, response);
            return _context.abrupt('return', true);

          case 41:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[23, 29]]);
  }));

  return function main(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

__webpack_require__(0);

var _moment = __webpack_require__(13);

var _moment2 = _interopRequireDefault(_moment);

var _photo = __webpack_require__(12);

var _photo2 = _interopRequireDefault(_photo);

var _abuseReport = __webpack_require__(15);

var _abuseReport2 = _interopRequireDefault(_abuseReport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AWS = __webpack_require__(14);

/***/ })
/******/ ])));
//# sourceMappingURL=create.js.map