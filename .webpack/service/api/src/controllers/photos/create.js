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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = undefined;

var _sequelize = __webpack_require__(0);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _pg = __webpack_require__(7);

var _pg2 = _interopRequireDefault(_pg);

var _pgHstore = __webpack_require__(8);

var _pgHstore2 = _interopRequireDefault(_pgHstore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// the same as above


var sequelize = exports.sequelize = new _sequelize2.default(process.env.DATABASE_URL, {

  // disable logging; default: console.log
  logging: false
}); //this is needed for initialization purpose, although we never user it directly


sequelize.authenticate().then(function (err) {
  console.log('Connection to database has been established successfully.');
}).catch(function (err) {
  console.error('Unable to connect to the database:', err);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _regenerator = __webpack_require__(3);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = __webpack_require__(4);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(5);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = exports.main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var data, uuid, location, imageData, _response, c, _response2, thumbNail, image, bitmap, createdAt, updatedAt, photo, _response3, response;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Instruct the lambda to exit immediately
            //and not wait for node event loop to be empty.
            context.callbackWaitsForEmptyEventLoop = false;
            data = JSON.parse(event.body);
            // console.log({data})

            uuid = data ? data.uuid : null;
            location = data ? data.location : null;
            imageData = data ? data.imageData : null;

            if (!(!data || !uuid || !location || !imageData)) {
              _context.next = 10;
              break;
            }

            console.log("setting status to 400");
            _response = {
              statusCode: 400,
              body: (0, _stringify2.default)({ error: 'parameters missing' })
            };

            callback(null, _response);
            return _context.abrupt('return');

          case 10:
            _context.next = 12;
            return _abuseReport2.default.count({ where: { uuid: uuid } });

          case 12:
            c = _context.sent;

            console.log("count of abuse: " + c);

            if (!(c > 3)) {
              _context.next = 18;
              break;
            }

            _response2 = {
              statusCode: 401,
              body: (0, _stringify2.default)({ error: 'Anauthorized.' })
            };

            callback(null, _response2);
            return _context.abrupt('return');

          case 18:

            console.log("imageData.length: ", imageData.length);

            _context.prev = 19;
            _context.next = 22;
            return Jimp.read(new Buffer(imageData));

          case 22:
            image = _context.sent;
            bitmap = image.resize(150, Jimp.AUTO) // resize
            .exifRotate() // rotate
            .bitmap;

            thumbNail = bitmap.data;

            _context.next = 30;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](19);

            console.log({ err: _context.t0 });

          case 30:

            console.log("uuid:", uuid);
            console.log("location:", location);
            console.log("imageData.length:", imageData.length);
            console.log("thumbNail.length:", thumbNail.length);

            createdAt = (0, _moment2.default)();
            updatedAt = createdAt;

            // create and safe record

            photo = void 0;
            _context.prev = 37;
            _context.next = 40;
            return _photo2.default.create({
              uuid: uuid,
              location: location,
              imageData: imageData,
              thumbNail: thumbNail,
              createdAt: createdAt,
              updatedAt: updatedAt
            });

          case 40:
            photo = _context.sent;
            _context.next = 49;
            break;

          case 43:
            _context.prev = 43;
            _context.t1 = _context['catch'](37);

            console.log("unable to create Photo", _context.t1);
            _response3 = {
              statusCode: 500,
              body: (0, _stringify2.default)({ error: 'Unable to create a new Photo' })
            };

            callback(null, _response3);
            return _context.abrupt('return');

          case 49:

            // Resond to request indicating the photo was created
            response = {
              statusCode: 201,
              body: (0, _stringify2.default)({ status: 'success', id: photo.id })
            };

            callback(null, response);

          case 51:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[19, 27], [37, 43]]);
  }));

  return function main(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _photo = __webpack_require__(6);

var _photo2 = _interopRequireDefault(_photo);

var _abuseReport = __webpack_require__(9);

var _abuseReport2 = _interopRequireDefault(_abuseReport);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _sequelize = __webpack_require__(0);

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Jimp = __webpack_require__(11);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(0);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _consts = __webpack_require__(1);

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
  },
  thumbNail: {
    allowNull: false,
    type: _sequelize2.default.BLOB
  },
  imageData: {
    allowNull: false,
    type: _sequelize2.default.BLOB
  }

});

// Adding a class level method

// Adding an instance level method

exports.default = Photo;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("pg-hstore");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(0);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _consts = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AbuseReport = _consts.sequelize.define('AbuseReport', {

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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("jimp");

/***/ })
/******/ ])));