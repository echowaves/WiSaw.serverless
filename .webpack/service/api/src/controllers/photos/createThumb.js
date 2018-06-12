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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _regenerator = __webpack_require__(3);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = __webpack_require__(22);

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// eslint-disable-next-line import/prefer-default-export
var main = exports.main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, cb) {
    var widths, record, name, activateUrl, s3, sourcePath, targetStream, fileStream;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // define all the thumbnails that we want
            widths = {
              150: '-thumbnail 150x'
            };
            record = event.Records[0];
            name = record.s3.object.key;
            // we only want to deal with originals

            if (!name.includes('-thumb')) {
              _context.next = 10;
              break;
            }

            console.log('thumbnail uploaded, activating image');

            // activate image
            activateUrl = process.env.HOST + '/photos/' + name.replace('-thumb', '') + '/activate';
            // console.log({ activateUrl })

            _context.next = 8;
            return _axios2.default.put(activateUrl);

          case 8:
            cb(null, 'activating the image in DB');
            return _context.abrupt('return', true);

          case 10:

            // get the prefix, and get the hash

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
                var cmd = 'convert -auto-orient ' + widths[size] + ' ' + sourcePath + ' ' + tmpFileName;
                console.log('Running: ', cmd);

                (0, _child_process.exec)(cmd, function (error, stdout, stderr) {
                  // eslint-disable-line no-unused-vars
                  if (error) {
                    // the command failed (non-zero), fail
                    console.warn('exec error: ' + error + ', stdout, stderr');
                    cb('failed converting');
                    return false;
                  }
                  // resize was succesfull, upload the file
                  console.info('Resize to ' + size + ' OK');
                  var fileBuffer = _fs2.default.readFileSync(tmpFileName);
                  console.log('thumb size:', fileBuffer.byteLength);

                  try {
                    console.log('uploading image: ', name + '-thumb');
                    // await s3.putObject({
                    //   ACL: 'public-read',
                    //   Key: `${name}-thumb`,
                    //   Body: fileBuffer,
                    //   Bucket: record.s3.bucket.name,
                    //   ContentType: 'image/jpeg',
                    // })

                    s3.putObject({
                      ACL: 'public-read',
                      Key: name + '-thumb',
                      Body: fileBuffer,
                      Bucket: record.s3.bucket.name,
                      ContentType: 'image/jpeg'
                    }, function (err, res) {
                      if (err) {
                        console.log({ err: err });
                      }
                      // // activate image
                      // axios.put(`${process.env.HOST}/${name}/activate`)
                      console.log({ res: res });
                      console.log('done');
                    });
                    console.log('finished uploading');
                  } catch (err) {
                    console.log('Unable to upload thumb ' + name, err);
                  }
                  cb(null, 'success');
                  return true;
                });
              });
            });

            cb(null, 'success everything');
            return _context.abrupt('return', true);

          case 20:
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

__webpack_require__(0);

var _fs = __webpack_require__(21);

var _fs2 = _interopRequireDefault(_fs);

var _awsSdk = __webpack_require__(14);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _axios = __webpack_require__(20);

var _axios2 = _interopRequireDefault(_axios);

var _child_process = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ])));
//# sourceMappingURL=createThumb.js.map