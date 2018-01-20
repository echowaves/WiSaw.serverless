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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = __webpack_require__(19);

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// eslint-disable-next-line import/prefer-default-export
var main = exports.main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, cb) {
    var widths, record, name, s3, sourcePath, targetStream, fileStream;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // define all the thumbnails that we want
            widths = {
              150: '-thumbnail 150x'
            };
            record = event.Records[0];

            // we only want to deal with originals

            if (!record.s3.object.key.includes('-thumb')) {
              _context.next = 6;
              break;
            }

            console.warn('Not an original, skipping');
            cb('Not an original, skipping');
            return _context.abrupt('return', false);

          case 6:

            // get the prefix, and get the hash

            name = record.s3.object.key;

            console.log('record.s3.bucket.name:', record.s3.bucket.name);
            console.log('record.s3.object.key:', record.s3.object.key);
            // download the original to disk
            s3 = new _awsSdk2.default.S3();
            sourcePath = '/tmp/' + name;
            targetStream = _fs2.default.createWriteStream(sourcePath);
            fileStream = s3.getObject({
              Bucket: record.s3.bucket.name,
              Key: record.s3.object.key
            }).createReadStream();

            fileStream.pipe(targetStream);

            // when file is downloaded, start processing
            fileStream.on('end', function () {
              // resize to every configured size
              (0, _keys2.default)(widths).forEach(function (size) {
                var tmpFileName = '/tmp/' + name + '-thumb-' + size;
                var cmd = 'convert ' + widths[size] + ' ' + sourcePath + ' ' + tmpFileName;
                console.log('Running: ', cmd);

                (0, _child_process.exec)(cmd, function (error, stdout, stderr) {
                  // eslint-disable-line no-unused-vars
                  if (error) {
                    // the command failed (non-zero), fail
                    console.warn('exec error: ' + error + ', stdout, stderr');
                    // continue
                  } else {
                    // resize was succesfull, upload the file
                    console.info('Resize to ' + size + ' OK');
                    var fileBuffer = _fs2.default.readFileSync(tmpFileName);
                    console.log('thumb size:', fileBuffer.byteLength);

                    s3.putObject({
                      ACL: 'public-read',
                      Key: name + '-thumb',
                      Body: fileBuffer,
                      Bucket: record.s3.bucket.name,
                      ContentType: 'image/jpg'
                    }, function (err, res) {
                      if (err) {
                        console.log({ err: err });
                      }
                      console.log({ res: res });
                      console.log('done');
                    });
                  }
                });
                return true;
              });
            });
            cb('success');
            return _context.abrupt('return', true);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
// import axios from 'axios'

var _fs = __webpack_require__(20);

var _fs2 = _interopRequireDefault(_fs);

var _awsSdk = __webpack_require__(10);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _child_process = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ })
/******/ ])));