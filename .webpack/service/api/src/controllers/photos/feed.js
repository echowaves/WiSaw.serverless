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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = undefined;

var _sequelize = __webpack_require__(0);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _pg = __webpack_require__(5);

var _pg2 = _interopRequireDefault(_pg);

var _pgHstore = __webpack_require__(6);

var _pgHstore2 = _interopRequireDefault(_pgHstore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// the same as above

// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line no-unused-vars
var sequelize = exports.sequelize = new _sequelize2.default(process.env.DATABASE_URL, {
  // disable logging; default: console.log
  logging: false,
  operatorsAliases: _sequelize2.default.Op // use Sequelize.Op
}); // this is needed for initialization purpose, although we never user it directly
// eslint-disable-next-line no-unused-vars


sequelize.authenticate().then(function () {
  return console.log('Connection to database has been established successfully.');
}).catch(function (err) {
  return console.error('Unable to connect to the database:', err);
});

// export default sequelize

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("pg-hstore");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(0);

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

exports.default = Photo;

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = __webpack_require__(3);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// eslint-disable-next-line import/prefer-default-export
var main = exports.main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var data, location, _response, limit, offset, lat, lng, point, photos, dbPhotos, _response2, response;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Instruct the lambda to exit immediately
            // and not wait for node event loop to be empty.
            context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

            data = JSON.parse(event.body);
            // console.log({data})

            location = data ? data.location : null;

            if (!(!data || !location)) {
              _context.next = 8;
              break;
            }

            console.log('setting status to 400');
            _response = {
              statusCode: 400,
              body: (0, _stringify2.default)({ error: 'parameters missing' })
            };

            callback(null, _response);
            return _context.abrupt('return', false);

          case 8:

            console.log('location:', location);

            limit = data ? data.limit : null;
            offset = data ? data.offset : null;

            if (!limit) {
              limit = 100;
            }
            if (!offset) {
              offset = 0;
            }

            lat = location.coordinates[0];
            lng = location.coordinates[1];
            point = _sequelize2.default.fn('ST_MakePoint', lat, lng);

            // retrieve photos

            photos = void 0;
            _context.prev = 17;
            _context.next = 20;
            return _photo2.default.findAll({
              attributes: {
                include: [[_sequelize2.default.fn('ST_Distance', point, _sequelize2.default.col('location')), 'distance']]
              },
              order: _sequelize2.default.col('distance'),
              limit: limit,
              offset: offset
            });

          case 20:
            dbPhotos = _context.sent;

            console.log('retrived photos:', dbPhotos.length);
            // add img_url and thumb_url properties
            photos = dbPhotos.map(function (dbPhoto) {
              var photo = dbPhoto;
              photo.dataValues.img_url = 'https://s3.amazonaws.com/' + process.env.IMAGE_BUCKET + '/' + photo.id;
              photo.dataValues.thumb_url = 'https://s3.amazonaws.com/' + process.env.IMAGE_BUCKET + '/' + photo.id + '-thumb';
              // console.log({ photo })
              return photo;
            });
            // console.log({ photos })
            _context.next = 31;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context['catch'](17);

            console.log('Unable to retrieve Photos feed', _context.t0);
            _response2 = {
              statusCode: 500,
              body: (0, _stringify2.default)({ error: 'Unable to retrieve Photos feed' })
            };

            callback(null, _response2);
            return _context.abrupt('return', false);

          case 31:

            // Resond to request indicating the photo feed was created
            response = {
              statusCode: 200,
              body: (0, _stringify2.default)({ status: 'success', photos: photos })
            };

            callback(null, response);
            return _context.abrupt('return', true);

          case 34:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[17, 25]]);
  }));

  return function main(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _sequelize = __webpack_require__(0);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _photo = __webpack_require__(7);

var _photo2 = _interopRequireDefault(_photo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ])));