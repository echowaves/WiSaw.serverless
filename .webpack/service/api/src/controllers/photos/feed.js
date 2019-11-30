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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = undefined;

__webpack_require__(0);

var _sequelize = __webpack_require__(1);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _pg = __webpack_require__(7);

var _pg2 = _interopRequireDefault(_pg);

var _pgHstore = __webpack_require__(8);

var _pgHstore2 = _interopRequireDefault(_pgHstore);

var _lambdaLog = __webpack_require__(9);

var _lambdaLog2 = _interopRequireDefault(_lambdaLog);

var _config = __webpack_require__(10);

var dbConfig = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// the same as above

// eslint-disable-next-line no-unused-vars
_lambdaLog2.default.options.debug = true; // this is needed for initialization purpose, although we never user it directly
// eslint-disable-next-line no-unused-vars


if ((process.env.STAGE || 'test') === 'test') {
  process.env.DATABASE_URL = dbConfig.test.DATABASE_URL;
}

// eslint-disable-next-line import/prefer-default-export
const sequelize = exports.sequelize = new _sequelize2.default(process.env.DATABASE_URL, {
  // disable logging; default: console.log
  // logging: log.debug,
  logging: false
  // operatorsAliases: Sequelize.Op, // use Sequelize.Op
});

sequelize.authenticate().then(() => console.log('Connection to database has been established successfully.')).catch(err => console.error('Unable to connect to the database:', err));

// export default sequelize

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(0);

var _sequelize = __webpack_require__(1);

var _consts = __webpack_require__(2);

// import Photo from './photo'


class Watcher extends _sequelize.Model {}
exports.default = Watcher;
Watcher.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: _sequelize.DataTypes.INTEGER
  },
  photoId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  uuid: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  },
  watchedAt: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  }
}, {
  sequelize: _consts.sequelize
});

// Watcher.belongsTo(Photo)

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(5);

var _stringify2 = _interopRequireDefault(_stringify);

exports.main = main;
exports.byDate = byDate;
exports.forWatcher = forWatcher;
exports.forTextSearch = forTextSearch;

__webpack_require__(0);

var _sequelize = __webpack_require__(1);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

var _consts = __webpack_require__(2);

var _photo = __webpack_require__(14);

var _photo2 = _interopRequireDefault(_photo);

var _watcher = __webpack_require__(3);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stringifyObject = __webpack_require__(15);

const { Op } = _sequelize2.default;

// eslint-disable-next-line import/prefer-default-export
async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

  const data = JSON.parse(event.body);
  // console.log({data})

  const location = data ? data.location : null;
  if (!data || !location) {
    console.log('setting status to 400');
    const response = {
      statusCode: 400,
      body: (0, _stringify2.default)({ error: 'parameters missing' })
    };
    callback(null, response);
    return false;
  }

  console.log('location:', location);

  let limit = data ? data.limit : null;
  limit = 1000;

  let offset = data ? data.offset : null;
  if (!limit) {
    limit = 100;
  }
  if (!offset) {
    offset = 0;
  }

  const lat = location.coordinates[0];
  const lng = location.coordinates[1];

  const point = _sequelize2.default.fn('ST_MakePoint', lat, lng);

  // retrieve photos
  let photos;
  try {
    photos = await _photo2.default.findAll({
      where: { active: true },
      attributes: {
        include: [[_sequelize2.default.fn('ST_Distance', point, _sequelize2.default.col('location')), 'distance'], [_sequelize2.default.literal('(SELECT COUNT("Comments") FROM "Comments" WHERE "Comments"."photoId" = "Photo"."id" and "active" = true)'), 'commentsCount']]
      },
      // order: Sequelize.col('distance'),
      order: [['id', 'DESC']],
      limit,
      offset
    });
    console.log('retrived photos:', photos.length);
    // add img_url and thumb_url properties
    // photos = dbPhotos.map((dbPhoto) => {
    //   const photo = dbPhoto
    //   photo.dataValues.img_url = `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${photo.id}`
    //   photo.dataValues.thumb_url = `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${photo.id}-thumb`
    //   // console.log({ photo })
    //   return photo
    // })
    // console.log({ photos })
  } catch (err) {
    console.log('Unable to retrieve Photos feed', err);
    const response = {
      statusCode: 500,
      body: (0, _stringify2.default)({ error: 'Unable to retrieve Photos feed' })
    };
    callback(null, response);
    return false;
  }

  // Resond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    body: (0, _stringify2.default)({ status: 'success', photos })
  };
  callback(null, response);
  return true;
}

// eslint-disable-next-line import/prefer-default-export
async function byDate(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

  const data = JSON.parse(event.body);
  console.log({ data });

  const location = data ? data.location : null;
  const daysAgo = data ? data.daysAgo || 0 : 0;
  const batch = data ? data.batch || 0 : 0;

  console.log('location:', location);
  console.log('daysAgo:', daysAgo);

  if (!data || !location) {
    console.log('setting status to 400');
    const response = {
      statusCode: 400,
      body: (0, _stringify2.default)({ error: 'parameters missing' })
    };
    callback(null, response);
    return false;
  }

  let limit = data ? data.limit : null;
  let offset = data ? data.offset : null;
  if (!limit) {
    limit = 100;
  }
  if (!offset) {
    offset = 0;
  }

  const lat = location.coordinates[0];
  const lng = location.coordinates[1];

  const point = _sequelize2.default.fn('ST_MakePoint', lat, lng);

  // retrieve photos
  let photos;

  try {
    // const utcDate = moment().startOf('day');
    const currentDate = (0, _moment2.default)();

    // if (utcDate.date() === currentDate.date()) {
    //   daysAgo += 1
    // }
    // console.log('utcDate: ', utcDate)
    console.log('currentDate: ', currentDate);
    console.log('daysAgo: ', daysAgo);

    photos = await _photo2.default.findAll({
      where: {
        createdAt: {
          [Op.gte]: currentDate.clone().subtract(daysAgo, 'days'),
          [Op.lte]: currentDate.clone().add(1, 'days').subtract(daysAgo, 'days')
        },
        active: true
      },
      attributes: {
        include: [[_sequelize2.default.fn('ST_Distance', point, _sequelize2.default.col('location')), 'distance'],
        // [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'creationDate'],
        [_sequelize2.default.literal('(SELECT COUNT("Comments") FROM "Comments" WHERE "Comments"."photoId" = "Photo"."id" and "active" = true)'), 'commentsCount']]
      },
      order: _sequelize2.default.col('distance'),
      limit,
      offset
    });
    console.log('retrived photos:', photos.length);
    // add img_url and thumb_url properties
    // photos = dbPhotos.map((dbPhoto) => {
    //   const photo = dbPhoto
    //   photo.dataValues.img_url = `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${photo.id}`
    //   photo.dataValues.thumb_url = `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${photo.id}-thumb`
    //   // console.log({ photo })
    //   return photo
    // })
    // console.log({ photos })
  } catch (err) {
    console.log('Unable to retrieve Photos feed', err);
    const response = {
      statusCode: 500,
      body: (0, _stringify2.default)({ error: 'Unable to retrieve Photos feed' })
    };
    callback(null, response);
    return false;
  }

  // Resond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    body: (0, _stringify2.default)({ status: 'success', batch, photos: photos.sort((a, b) => b.id - a.id) })
  };
  callback(null, response);
  return true;
}

// eslint-disable-next-line import/prefer-default-export
async function forWatcher(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

  const data = JSON.parse(event.body);

  const pageNumber = data ? data.pageNumber || 0 : 0;
  const limit = data ? data.pageLimit || 100 : 100;

  const uuid = data ? data.uuid : null;
  const batch = data ? data.batch || 0 : 0;

  console.log({ data });

  if (!data || !uuid) {
    console.log('setting status to 400');
    const response = {
      statusCode: 400,
      body: (0, _stringify2.default)({ error: 'parameters missing' })
    };
    callback(null, response);
    return false;
  }

  const offset = limit * pageNumber;

  // retrieve photos
  let photos;

  try {
    photos = await _photo2.default.findAll({
      where: {
        // uuid,
        active: true
      },
      include: [{
        model: _watcher2.default,
        required: true,
        where: { uuid }
      }],
      attributes: {
        include: [[_sequelize2.default.literal('(SELECT COUNT("Comments") FROM "Comments" WHERE "Comments"."photoId" = "Photo"."id" and "active" = true)'), 'commentsCount']]
      },
      order: [['Watchers', 'updatedAt', 'DESC']],
      limit,
      offset
    });
    console.log('retrived photos:', photos.length);
  } catch (err) {
    console.log('Unable to retrieve Photos feed', err);
    const response = {
      statusCode: 500,
      body: (0, _stringify2.default)({ error: 'Unable to retrieve Photos feed' })
    };
    callback(null, response);
    return false;
  }

  // Resond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    body: (0, _stringify2.default)({ status: 'success', batch, photos })
  };
  callback(null, response);
  return true;
}

// eslint-disable-next-line import/prefer-default-export
async function forTextSearch(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

  const data = JSON.parse(event.body);

  const pageNumber = data ? data.pageNumber || 0 : 0;
  const limit = data ? data.pageLimit || 25 : 25;

  const uuid = data ? data.uuid : null;
  const batch = data ? data.batch || 0 : 0;
  const term = data ? data.term : null;

  console.log((0, _stringify2.default)(data));

  if (!data || !uuid || !term || term.length < 2) {
    console.log('setting status to 400');
    const response = {
      statusCode: 400,
      body: (0, _stringify2.default)({ error: 'parameters missing' })
    };
    callback(null, response);
    return false;
  }

  const offset = limit * pageNumber;

  // retrieve photos
  let photos;

  try {
    /* eslint-disable no-multi-str */
    photos = await _consts.sequelize.query(`SELECT p.*, (SELECT COUNT("Comments") FROM "Comments" WHERE "Comments"."photoId" = "p"."id" and "active" = true) as "commentsCount" \
          FROM "Photos" p where active = true and "id" in ( \
          SELECT "photoId" \
          FROM "Recognitions" \
          WHERE \
          to_tsvector('English', "metaData"::text) @@ plainto_tsquery('English', '${term}') \
        UNION \
          SELECT "photoId" \
          FROM "Comments" \
          WHERE \
          to_tsvector('English', "comment"::text) @@ plainto_tsquery('English', '${term}') \
        ) \
        order by id desc \
        limit ${limit} offset ${offset}`,
    // { replacements: { term, limit, offset }, type: sequelize.QueryTypes.SELECT },
    {
      model: _photo2.default,
      mapToModel: true // pass true here if you have any mapped fields
    }
    // {
    //   attributes: {
    //     include: [
    //       [Sequelize.literal('(SELECT COUNT("Comments") FROM "Comments" WHERE "Comments"."photoId" = "Photo"."id" and "active" = true)'), 'commentsCount'],
    //     ],
    //   },
    // },
    // limit,
    // offset,

    );

    console.log('retrived photos:', photos.length);
    console.log(stringifyObject(photos, {
      indent: '  ',
      singleQuotes: false
    }));
  } catch (err) {
    console.log('Unable to retrieve Photos feed');
    console.log((0, _stringify2.default)(err));
    const response = {
      statusCode: 500,
      body: (0, _stringify2.default)({ error: 'Unable to retrieve Photos feed' })
    };
    callback(null, response);
    return false;
  }

  // Respond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    body: (0, _stringify2.default)({ status: 'success', batch, photos })
  };
  callback(null, response);
  return true;
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("moment");

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
/***/ (function(module, exports) {

module.exports = require("lambda-log");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

const devConfig = __webpack_require__(11).config();
const testConfig = __webpack_require__(12).config();
const prodConfig = __webpack_require__(13).config();

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

module.exports.config = () => {
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

module.exports.config = () => ({
  HOST: 'https://testapi.wisaw.com',

  DB_USERNAME: 'awsroot',
  DB_PASSWORD: 'Un4dLKJjndnrkjnskCCFCdckjsndfkjm',
  DB_DATABASE: 'wisaw_test',
  DB_HOST: 'wisaw-test.cbaw0b5dcxjh.us-east-1.rds.amazonaws.com',
  DB_DIALECT: 'postgres',
  get DATABASE_URL() {
    return `${this.DB_DIALECT}://${this.DB_USERNAME}:${this.DB_PASSWORD}@${this.DB_HOST}:5432/${this.DB_DATABASE}`;
  }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

module.exports.config = () => ({
  HOST: 'https://api.wisaw.com',

  DB_USERNAME: 'awsroot',
  DB_PASSWORD: 'h5AGk6eoAdkj234bfbusd87hUn4kCCFCm',
  DB_DATABASE: 'wisaw_prod',
  DB_HOST: 'wisaw-prod.cbaw0b5dcxjh.us-east-1.rds.amazonaws.com',
  DB_DIALECT: 'postgres',
  get DATABASE_URL() {
    return `${this.DB_DIALECT}://${this.DB_USERNAME}:${this.DB_PASSWORD}@${this.DB_HOST}:5432/${this.DB_DATABASE}`;
  }
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(0);

var _sequelize = __webpack_require__(1);

var _consts = __webpack_require__(2);

var _watcher = __webpack_require__(3);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Photo extends _sequelize.Model {}

exports.default = Photo;
Photo.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: _sequelize.DataTypes.INTEGER
  },
  uuid: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  location: {
    type: _sequelize.DataTypes.GEOMETRY('POINT'),
    allowNull: false
  },
  likes: {
    allowNull: false,
    type: _sequelize.DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: _sequelize.DataTypes.DATE
  },
  active: {
    allowNull: false,
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  },
  getImgUrl: {
    type: _sequelize.DataTypes.VIRTUAL,
    get() {
      return `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${this.id}`;
    }
  },
  getThumbUrl: {
    type: _sequelize.DataTypes.VIRTUAL,
    get() {
      return `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${this.id}-thumb`;
    }
  }
}, {
  sequelize: _consts.sequelize
});

Photo.hasMany(_watcher2.default, { foreignKey: 'photoId' });

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("stringify-object");

/***/ })
/******/ ])));
//# sourceMappingURL=feed.js.map