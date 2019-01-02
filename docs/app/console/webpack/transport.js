module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var isObject = __webpack_require__(9);

var isArray = __webpack_require__(10);

var node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';
var envcache = false;
/**
 * Private method to get environment variables depending on detected environment
 * @returns {boolean}
 */

var get = function get(name) {
  var env = envcache;

  if (node) {
    if (!envcache) {
      envcache = process.env || {}; // from now on instead WEBPACK_MODE use NODE_ENV
      // from now on instead WEBPACK_MODE use NODE_ENV
      // from now on instead WEBPACK_MODE use NODE_ENV
      // if (envcache['NODE_ ENV'] === 'development') {
      //
      //     envcache.WEBPACK_ MODE = 'dev';
      // }
      // else {
      //
      //     envcache.WEBPACK_ MODE = 'prod';
      // }
    }

    env = envcache;
  } else if (env === false) {
    throw "roderic/webpack/dotenv.js: to use roderic/webpack/dotenv.js in browser mode first run dotenv.webload(.env) in webpack web entrypoint. key: '".concat(name, "'");
  }

  return env;
};
/**
 * General purpose tool to get any envcacheironement variable
 * @param name
 * @param args you can specify default value if there is no ${name} environment variable
 */


var tool = function tool(name) {
  var env = get(name);

  if (!name) {
    // if no name given then return all, but copy first
    return Object.assign({}, env);
  }

  if (typeof env[name] === 'undefined') {
    if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 0) {
      return arguments.length <= 1 ? undefined : arguments[1];
    }

    throw "roderic/webpack/dotenv.js: there is no environment variable '".concat(name, "'");
  }

  return env[name];
};

tool.has = function (name) {
  var env = get(name);

  if (typeof env[name] === 'undefined') {
    return false;
  }

  return true;
};
/**
 * To execute in *.entry.js
 * @param file
 */


tool.webload = function (params) {
  if (!isObject(params)) {
    throw "roderic/webpack/dotenv.js:webload: params must be an object";
  }

  if (isArray(params)) {
    throw "roderic/webpack/dotenv.js:webload: params can't be an array";
  } // console.log('params.ENV_SECURE', params.ENV_SECURE, JSON.stringify(params.ENV_SECURE));


  if (!node) {
    if (typeof params.ENV_SECURE === 'undefined') {
      throw "roderic/webpack/dotenv.js:webload: params should have ENV_SECURE value";
    }

    if (params.ENV_SECURE !== 'true') {
      throw "roderic/webpack/dotenv.js:webload: ENV_SECURE should be 'true' in web mode";
    }
  }

  envcache = params;
};
/**
 * To execute in preprocessor.js
 * @param file
 */


tool.preprocess = function (dotenvfile, targetjsonfile) {
  if (!node) {
    throw "roderic/webpack/dotenv.js:preprocess: don't call this method in web mode";
  }

  console.log("\n");
  var env = tool.parse(dotenvfile);
  env.ENV_ORIGIN = 'preprocessor';
  env.NODE_ENV = "production" || false;
  console.log("Web exposed environment variables: \n\n");
  var max = Object.keys(env).reduce(function (acc, val) {
    var l = val.length;

    if (l > acc) {
      return l;
    }

    return acc;
  }, 0);
  Object.keys(env).map(function (key) {
    var l = key.length;
    var k = key;

    if (l < max) {
      k += ' '.repeat(max - l);
    }

    console.log(k, ':', env[key]);
  });
  console.log("\n");
  var fs = eval('require')('fs');
  fs.writeFileSync(targetjsonfile, JSON.stringify(env, null, 4));

  if (fs.existsSync(targetjsonfile)) {
    console.log("File '".concat(targetjsonfile, "' successfully saved..."));
  } else {
    throw "Preprocessor: Can't save '".concat(targetjsonfile, "'...");
  }

  console.log("\n");
};

tool.parse = function (file) {
  var secure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (!node) {
    throw "roderic/webpack/dotenv.js:parse: don't call this method in web mode";
  }

  var fs = eval('require')('fs');
  var dotenv = eval('require')('dotenv');

  if (!fs.existsSync(file)) {
    throw "File '".concat(file, "' doesn't exist");
  }

  var content = fs.readFileSync(file).toString();
  content = content.split("\n").map(function (e) {
    if (e.indexOf('export ') === 0) {
      e = e.substring(7);
    }

    return e;
  }).join("\n");
  content = dotenv.parse(content);
  content.ENV_SECURE = secure ? 'true' : 'false';
  return Object.keys(content).reduce(function (acc, key) {
    if (!secure || key.indexOf('PROTECTED_') !== 0) {
      acc[key] = content[key];
    }

    return acc;
  }, {});
};

tool.isProd = function () {
  return tool('NODE_ENV') === 'production';
};

(function () {
  if (typeof window !== 'undefined') {
    window.env = tool;
  }
})();

module.exports = tool;

if (!node) {
  window.env = tool;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("./../../public.config.js");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Szymon Działowski
 * @license MIT License (c) copyright 2017-present original author or authors
 * @homepage https://github.com/stopsopa/roderic
 */


var log = function () {
  try {
    if (console.log) {
      return function () {
        try {
          console.log.apply(this, Array.prototype.slice.call(arguments));
        } catch (e) {}

        return log;
      };
    }
  } catch (e) {
    return function () {
      return log;
    };
  }
}();

log.stack = function () {
  return log;
};

module.exports = log.dump = log.start = log.get = log.json = log.log = log;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 return Promise.resolve()
    .then(() => delay(3000, 'ok'))

 */

var delay = function delay(time, data) {
  return new Promise(function (resolve) {
    return time ? setTimeout(resolve, time, data) : resolve(data);
  });
};
/**
 return Promise.resolve()
     .then(
         () => delay(3000, 'ok')
         () => delay.reject(3000, 'error')
     )

 */


var reject = function reject(time, data) {
  return new Promise(function (resolve, reject) {
    return time ? setTimeout(reject, time, data) : reject(data);
  });
};
/**
 * Promise.reject('test')
 *     .then(...then(1000))
 *     .catch(data => console.log(data))
 * ;
 * Promise.resolve('test')
 *     .then(...then(1000))
 *     .then(data => console.log(data))
 * ;
 * @param time
 */


var then = function then(time) {
  return [function (data) {
    return delay(time, data);
  }, function (data) {
    return delay.reject(time, data);
  }];
};

delay.reject = reject;
delay.then = then;
module.exports = delay;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, log) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return delay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setJwtToken", function() { return setJwtToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUrl", function() { return getUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ee", function() { return ee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dd", function() { return dd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchJson", function() { return fetchJson; });
/* harmony import */ var public_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var public_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(public_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var roderic_libs_ajax_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var roderic_libs_ajax_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(roderic_libs_ajax_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var roderic_webpack_delay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var roderic_webpack_delay__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(roderic_webpack_delay__WEBPACK_IMPORTED_MODULE_3__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * This file can be loaded from node_modules/roderic
 */

/**
 *
 *
 *
 * https://github.com/krakenjs/jwt-csrf
 *
 *
 *
 *
 */


roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.webload(__webpack_require__(11), 'web'); // import 'isomorphic-fetch';


var delay = public_config__WEBPACK_IMPORTED_MODULE_0__["delay"];

var modeNode = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';
var jwtToken;
var isProd = roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.isProd();
/**
 * Shortcut to don't engage second api server to fetch data if data are in static files
 * remove that later if read api with data in db will be implemented vvv
 */
//import { fakeTest, fakeReturn } from './transport-fake';
//
//     let fetchDataDirectly = () => {};
//
//     if (modeNode) {
//
//         const nodePath = eval('require')('path');
//
//         const jsonFilesCacheMiddleware = eval('require')(nodePath.resolve(__dirname, 'libs', 'jsonFilesCacheMiddleware'));
//
//         let regex = jsonFilesCacheMiddleware.regex;
//
//         jsonFilesCacheMiddleware.setup(config.jsonApi);
//
//         fetchDataDirectly = path => {
//
//             if (modeNode) {
//
//                 if (config.jsonApi.inNodeFetchDirectlyFromFiles) {
//
//                     if (regex.test(path)) {
//
//                         var param = path.match(regex)[1];
//
//                         var data = jsonFilesCacheMiddleware.getDataFromJsonFile(param);
//
//                         if (data) {
//
//                             if (data.content) {
//
//                                 // log(`found data by param '${param}' ` + data.status)
//
//                                 return JSON.parse(data.content)
//                             }
//                             else {
//                                 // log(`no 'content' field for param '${param}'`, data);
//                             }
//                         }
//                     }
//                 }
//                 else {
//                     log(`path: ${param}, can't fetch directly, inNodeFetchDirectlyFromFiles disabled`);
//                 }
//             }
//         }
//     }
// // remove that later if read api with data in db will be implemented ^^^

var setJwtToken = function setJwtToken(token) {
  return jwtToken = token;
};
var host = false;
/**
 * NODE_DONT_UNDERSTAND_*
 */

var ndur = false;
var getUrl = function getUrl() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var forceRelative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var sendJWTToken = false;

  if (/^https?:\/\//.test(path)) {
    return {
      path: path,
      sendJWTToken: sendJWTToken
    };
  }

  if (host === false) {
    host = '';
    ndur = '';

    if (modeNode) {
      if (!roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_SSR_PROTOCOL') || !roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_SSR_HOST') || !roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_SSR_PORT')) {
        throw "Declare all tree environment variables NODE_SSR_PROTOCOL, NODE_SSR_HOST and NODE_SSR_PORT because something is missing";
      }

      host += roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_SSR_PROTOCOL') + '://' + roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_SSR_HOST');

      if (roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_SSR_PORT') != 80) {
        host += ':' + roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_SSR_PORT');
      }

      if (roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_DONT_UNDERSTAND_RELATIVE_PROTOCOL') || roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_DONT_UNDERSTAND_RELATIVE_HOST') || roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_DONT_UNDERSTAND_RELATIVE_PORT')) {
        if (!roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_DONT_UNDERSTAND_RELATIVE_PROTOCOL') || !roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_DONT_UNDERSTAND_RELATIVE_HOST') || !roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_DONT_UNDERSTAND_RELATIVE_PORT')) {
          throw "Declare all tree environment variables NODE_DONT_UNDERSTAND_RELATIVE_PROTOCOL, NODE_DONT_UNDERSTAND_RELATIVE_HOST and NODE_DONT_UNDERSTAND_RELATIVE_PORT if you declared one of them because something is missing";
        }

        ndur += roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_DONT_UNDERSTAND_RELATIVE_PROTOCOL') + '://' + roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_DONT_UNDERSTAND_RELATIVE_HOST');

        if (roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_DONT_UNDERSTAND_RELATIVE_PORT') != 80) {
          ndur += ':' + roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_DONT_UNDERSTAND_RELATIVE_PORT');
        }
      }
    } else {
      if (roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_CORS_PROTOCOL') || roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_CORS_HOST') || roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_CORS_PORT')) {
        if (!roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_CORS_PROTOCOL') || !roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_CORS_HOST') || !roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_CORS_PORT')) {
          throw "Declare all tree environment variables NODE_CORS_PROTOCOL, NODE_CORS_HOST and NODE_CORS_PORT if you declared one of them because something is missing";
        }

        host += roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_CORS_PROTOCOL') + '://' + roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_CORS_HOST');

        if (roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_CORS_PORT') != 80) {
          host += ':' + roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_CORS_PORT');
        }
      }
    }
  }

  var prefix = '';

  if (roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.has('NODE_SSR_PREFIX')) {
    prefix = roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_SSR_PREFIX');
  } // modeNode && console.log('before: ' + path);


  if (public_config__WEBPACK_IMPORTED_MODULE_0__["php_proxy"] && public_config__WEBPACK_IMPORTED_MODULE_0__["php_proxy"].prefix) {
    var match = path.match(public_config__WEBPACK_IMPORTED_MODULE_0__["php_proxy"].prefix);

    if (match) {
      if (modeNode) {
        // if node then cut /endpoint
        path = match[2];

        if (isProd) {
          path = prefix + path;
        } else {
          path = '/app_dev.php' + prefix + path;
        }
      } else {
        if (match) {
          if (!isProd && !/^\/app_dev\.php(\/.*)?$/.test(match[2])) {
            path = path.replace(public_config__WEBPACK_IMPORTED_MODULE_0__["php_proxy"].prefix, "$1/app_dev.php".concat(prefix, "$2"));
          }

          if (isProd) {
            path = path.replace(public_config__WEBPACK_IMPORTED_MODULE_0__["php_proxy"].prefix, "$1".concat(prefix, "$2"));
          }
        }
      }
    }
  } // if ( ( ! isProd ) && ( ! /^\/app_dev\.php(\/.*)?$/.test(path) ) ) {
  //
  //     modeNode && console.log('inside: ');
  //
  //     path = '/app_dev.php' + path;
  // }
  // modeNode && console.log('after: ' + path);


  sendJWTToken = true;

  if (forceRelative) {
    if (modeNode) {
      path = ndur + path;
    }

    log('transport (forceRelative): ' + path);
    return {
      path: path,
      sendJWTToken: sendJWTToken
    };
  }

  path = host + path;
  log('transport: ' + path + "\n");
  return {
    path: path,
    sendJWTToken: sendJWTToken
  };
};
var fetchData = function fetchData(path, _opt) {
  var promise;

  var node = _opt.node,
      opt = _objectWithoutProperties(_opt, ["node"]);

  var _getUrl = getUrl(path, node),
      _path = _getUrl.path,
      sendJWTToken = _getUrl.sendJWTToken;

  opt.sendJWTToken = sendJWTToken;

  if (opt.sendJWTToken) {
    opt.headers = Object.assign({}, opt.headers, {
      'X-jwt': jwtToken
    });
  } // if (fakeTest(path)) {
  //
  //     promise = fakeReturn(path);
  // }
  // else {


  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  var args = [_path, opt].concat(rest);

  if (opt && opt.real) {
    if (modeNode) {
      log("fetchData: can't handle fetch(opt.real) to endpoint '".concat(path, "' - it's request in node")); // rare situation - usually pure fetch we gonna need in browser

      promise = server.apply(void 0, _toConsumableArray(args));
    } else {
      if (window.fetch) {
        opt.credentials = "same-origin";
        promise = fetch.apply(void 0, _toConsumableArray(args));
      } else {
        log("fetchData: can't handle fetch(opt.real) to endpoint '".concat(path, "' - window.fetch doesn't exist"));
        promise = server.apply(void 0, _toConsumableArray(args));
      }
    }
  } else {
    promise = server.apply(void 0, _toConsumableArray(args));
  }

  if (typeof opt.always === 'function') {
    promise.then(opt.always, opt.always);
  }

  promise = promise.then(function (res) {
    if (res.ok) {
      return res;
    }

    return new Promise(function (resolve, reject) {
      res.json().catch(function () {
        return null;
      }).then(function (json) {
        // log.dump('json')
        // log.dump(json)
        // log.dump(res.statusText)
        // log.dump('end...');
        if (roderic_webpack_dotenv__WEBPACK_IMPORTED_MODULE_1___default()('NODE_ENV') === 'development') {
          var method = '';

          try {
            if (args[1].method !== 'get') {
              method = ' -X ' + args[1].method.toUpperCase();
            }
          } catch (e) {}

          var data = '';

          try {
            if (args[1].body) {
              data = " --data '".concat(args[1].body, "'");
            }
          } catch (e) {}

          console.log("\ncurl".concat(method, " ").concat(args[0]).concat(data));
        }

        return reject({
          req: _toConsumableArray(args),
          res: {
            status: res.status,
            statusText: res.statusText,
            json: json
          }
        });
      });
    });
  }, function (e) {
    return Promise.reject({
      req: _toConsumableArray(args),
      res: {
        status: 'no status',
        statusText: 'Request failed',
        json: null
      }
    });
  }); // }

  return roderic_webpack_delay__WEBPACK_IMPORTED_MODULE_3___default()(delay || 0).then(function () {
    return promise;
  });
};
var ee = function ee(str) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (typeof str !== 'string') {
    throw "ee(): given value is not string: " + JSON.stringify(str);
  }

  while (times !== 0) {
    str = encodeURIComponent(str);
    times -= 1;
  }

  return str;
};
var dd = function dd(str) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (typeof str !== 'string') {
    throw "dd(): given value is not string: " + JSON.stringify(str);
  }

  while (times !== 0) {
    str = decodeURIComponent(str);
    times -= 1;
  }

  return str;
};
/**
 * Warning in .catch() always expect format:
 *  {
        req: [...args],
        res: {
            status: 'no status',
            statusText: 'Request failed'
        }
    }
 * @param path
 * @param opt
 * @param rest
 * @returns {*|PromiseLike<T>|Promise<T>}
 */

var fetchJson = function fetchJson(path) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // // remove that later if read api with data in db will be implemented vvv
  //     const data = fetchDataDirectly(path);
  //
  //     if (data) {
  //
  //         return Promise.resolve(data);
  //     }
  // // remove that later if read api with data in db will be implemented ^^^
  opt.headers = _objectSpread({}, opt.headers, {
    Accept: 'application/json',
    'Content-type': 'application/json; charset=utf-8'
  });

  if (opt.body && typeof opt.body !== 'string') {
    try {
      if (opt.body instanceof FormData) {// unfortunately i can't put negative here
      } else {
        opt.body = JSON.stringify(opt.body);
      }
    } catch (e) {
      opt.body = JSON.stringify(opt.body);
    }
  }

  for (var _len2 = arguments.length, rest = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    rest[_key2 - 2] = arguments[_key2];
  }

  var promise = fetchData.apply(void 0, [path, opt].concat(rest)).then(function (res) {
    return res.text();
  }).then(function (text) {
    // decode manually in order to provide better debug informations because standard res.json() sometimes
    // provide error messages like :
    // invalid json response body at http://localhost:98/endpoint/app_dev.php/userprovider reason: Unexpected token t in JSON at position 124< len: 134
    try {
      return JSON.parse(text);
    } catch (e) {
      return Promise.reject("fetchJson: json parse error >>>".concat(e, "<<<: \n\n").concat(text));
    }
  });
  return promise;
};

if (!modeNode) {
  window.fetchData = fetchData;
  window.fetchJson = fetchJson;
  window.dd = dd;
  window.ee = ee;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2), __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @author Szymon Działowski
 * @license MIT License (c) copyright 2017-present original author or authors
 * @homepage https://github.com/stopsopa/roderic
 */
 // -- test --- vvv
// const log = require('./logn');
//
// (function () {
//
//     (function () {
//
//         console.log('------------ 1');
//
//         log('one')('two')('three');
//
//         console.log('------------ 2');
//
//         log('-test-')('+test+')('testddd')('next');
//
//         console.log('------------ 3');
//
//         log.stack(2)('-test-')('+test+')('testddd')('next');
//
//         console.log('------------ 4');
//
//         log.stack(0).log('stack 0', 'two');
//
//         log.stack(1).log('stack 1', 'two');
//
//         log.stack(2).log('stack 2', 'two');
//
//         console.log('------------ stack default 2');
//
//         log.stack(0)('-test-')('+test+')('testddd')('next');
//
//         console.log('------------ json');
//
//         log.json({one: "two", three: [5, 'eight']})
//
//         log.stack(2).json({one: "two", three: [5, 'eight']})({one: "two", three: [5, 'eight']})
//
//         console.log('------------ dump');
//
//         // only one arg
//         log.dump({one: "two", three: [5, 'eight']}, 2 /* show levels (must be int > 0) */);
//
//         console.log('------------ stack dump ');
//
//         // in second cascade call 'level' is not necessary (stil .dump() accept only one ar
//         log.stack(2).dump({one: "two", three: [5, 'eight']}, 2)({one: "two", three: [5, 'eight']})
//
//
//     }());
//
// }());
// -- test --- ^^^

/**
 * log(arg1, arg2, ...)(arg1, arg2, ...)  - line and args
 * log.json(arg1, arg2, ...)(arg1, arg2, ...) - line and args as human readdable json
 * log.dump(arg1, arg2, ...)(arg1, arg2, ...) - line and args (exact description of types)
 *
 * log.stack(5)(arg1, arg2, ...)(arg1, arg2, ...)  - line and args
 * log.stack(5).json(arg1, arg2, ...)(arg1, arg2, ...) - line and args as human readdable json
 * log.stack(5).dump(arg1, arg2, ...)(arg1, arg2, ...) - line and args (exact description of types)
 *
 * and...
 * var tmp = log.stack(4)('test')
 *
 * tmp('test2')
 *
 * gives:
 * /opt/spark_dev/crawler.js:47
 * test
 * /opt/spark_dev/crawler.js:47
 * test2
 *
 * buffering (returning output as a string)
 *

 log.start();

 log.dump('test1');

 log('test2');

 // true or false to additionally flush data to screen after return (def false)
 const tmp = log.get(true);
 */
// web version

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';

if (!node) {
  module.exports = __webpack_require__(3);
} // logic from https://github.com/gavinengel/magic-globals/blob/master/index.js
// node && (function () {
// }());

/** returns line number when placing this in your code: __line */
// Object.defineProperty(global, '__line', {
//     get: function(){
//         return String("     " + __stack[2].getLineNumber()).slice(-5);
//     }
// });
// /** return filename (without directory path or file extension) when placing this in your code: __file */
// Object.defineProperty(global, '__file', {
//     get: function(){
//         return __stack[2].getFileName();
//     }
// });


if (node) {
  global.__stack || Object.defineProperty(global, '__stack', {
    get: function tmp() {
      var orig = Error.prepareStackTrace;

      Error.prepareStackTrace = function (_, stack) {
        return stack;
      };

      var err = new Error();
      Error.captureStackTrace(err, tmp); // Error.captureStackTrace(err, arguments.callee); // without 'use strict'

      var stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });

  global.__line = function () {
    function rpad(s, n) {
      typeof n === 'undefined' && (n = 5);

      try {
        if (s && s.length && s.length >= n) {
          return s;
        }
      } catch (e) {
        console.log('exception', _typeof(s), s, e);
      }

      return String(s + " ".repeat(n)).slice(0, n);
    }

    var tool = function tool(n) {
      if (typeof n === 'undefined') {
        var tmp = [];

        for (var i in __stack) {
          if (__stack.hasOwnProperty(i)) {
            tmp.push('stack: ' + rpad(i) + ' file:' + __stack[i].getFileName() + ':' + rpad(__stack[i].getLineNumber()) + ' ');
          }
        }

        return tmp;
      }

      typeof n === 'undefined' && (n = 1);

      if (!__stack[n]) {
        return "".concat(n, " not in stack: ") + tool(n - 1);
      }

      var file = __stack[n].getFileName();

      if (file === null) {
        return 'corrected:' + tool(n - 1);
      }

      return new Date().toISOString().substring(0, 19).replace('T', ' ') + ' ' + file + ':' + rpad(__stack[n].getLineNumber());
    };

    return tool;
  }();
}

var manualMode = false;

var native = function () {
  var nat = function () {
    try {
      return function () {
        Array.prototype.slice.call(arguments, 0).forEach(function (m) {
          if (typeof m === 'string') {
            process.stdout.write("\n".concat(m));
            return;
          }

          m = JSON.stringify(m, null, 4);
          process.stdout.write("\n".concat(m));
        });
      }; // return console.log.bind(console);
    } catch (e) {
      return function () {};
    }
  }();

  var emmit = true,
      cache = [];
  ;

  var tool = function tool() {
    var args = Array.prototype.slice.call(arguments, 0);

    if (emmit) {
      nat.apply(this, args);
    } else {
      cache = cache.concat(args);
    }
  };

  tool.start = function () {
    if (manualMode) {
      return tool;
    }

    emmit = true;
    tool.flush();
    emmit = false;
    return tool;
  };

  tool.get = function (flush) {
    flush === undefined && (flush = false);
    manualMode = false;
    var data = cache.join("\n");

    if (!flush) {
      cache = [];
    }

    tool.flush();
    return data;
  };

  tool.flush = function () {
    if (manualMode) {
      return tool;
    }

    emmit = true;

    if (emmit && cache.length) {
      tool.call(this, cache.join("\n"));
    }

    cache = [];
    return tool;
  };

  return tool;
}();

var stack = false;

function log() {
  var s = stack === false ? 0 : stack;
  native(__line(s + 2));

  if (this !== true) {
    s += 1;
  }

  stack = false;
  native.apply(this, Array.prototype.slice.call(arguments, 0));
  return function () {
    return log.stack(s).apply(true, Array.prototype.slice.call(arguments, 0));
  };
}

;
log.native = native;

log.log = function () {
  return log.apply(this, Array.prototype.slice.call(arguments, 0));
};

log.start = function () {
  native.start();
  manualMode = true;
  return function () {
    return log.stack(s).apply(true, Array.prototype.slice.call(arguments, 0));
  };
};

log.get = function (flush) {
  return native.get(flush);
};

log.json = function () {
  var s = stack === false ? 0 : stack;
  native(__line(s + 2));

  if (this !== true) {
    s += 1;
  }

  stack = false;
  native.start();
  Array.prototype.slice.call(arguments).forEach(function (a) {
    return (JSON.stringify(a, null, 4) + '').split(/\n/g).forEach(function (l) {
      native(l);
    });
  });
  native("");
  native.flush();
  return function () {
    return log.stack(s).json.apply(true, Array.prototype.slice.call(arguments, 0));
  };
};

log.stack = function (n
/* def: 0 */
) {
  if (n === false) {
    stack = n;
    return log;
  }

  var nn = parseInt(n, 10);

  if (!Number.isInteger(n) || n < 0) {
    throw "Can't setup stack to '" + nn + "' (" + n + ")";
  }

  stack = nn;
  return log;
};

log.i = __webpack_require__(7);
log.t = __webpack_require__(8);

(function (ll) {
  // http://stackoverflow.com/a/16608045/5560682
  function isObject(a) {
    // return (!!a) && (a.constructor === Object);
    return Object.prototype.toString.call(a) === '[object Object]'; // better in node.js to dealing with RowDataPacket object
  }

  ;

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  ;

  var type = function (t) {
    return function (n) {
      if (n === undefined) {
        return 'Undefined';
      }

      if (n === null) {
        return 'Null';
      }

      t = _typeof(n);

      if (t === 'Function') {
        return t;
      }

      if (Number.isNaN(n)) {
        return "NaN";
      }

      if (t === 'number') {
        return Number(n) === n && n % 1 === 0 ? 'Integer' : 'Float';
      }

      return n.constructor ? n.constructor.name : t; // t = Object.prototype.toString.call(n);
      // if (t.indexOf('[object ') === 0) {
      //     t = t.substring(8);
      //     t = t.substring(0, t.length - 1);
      // }
      // return t;
    };
  }();

  function each(obj, fn, context) {
    var r;

    if (isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; ++i) {
        if (fn.call(context, obj[i], i) === false) {
          return;
        }
      }
    } else if (isObject(obj) || count(obj)) {
      for (var i in obj) {
        if (obj && obj.hasOwnProperty && obj.hasOwnProperty(i)) {
          if (fn.call(context, obj[i], i) === false) {
            return;
          }
        }
      }
    }
  }

  function toString(o, k) {
    if (typeof o === 'function') {
      k = Object.keys(o).join(',');
      return k ? 'object keys:' + k : '';
    }

    return o;
  } // only for function


  function count(o) {
    if (typeof o === 'function') {
      for (var i in o) {
        if (o && o.hasOwnProperty && o.hasOwnProperty(i)) {
          return true;
        }
      }
    }

    return false;
  }

  log.dump = function () {
    native.start();
    var args = Array.prototype.slice.call(arguments, 0);
    var limit = args[args.length - 1];

    if (args.length > 1 && Number.isInteger(limit) && limit > 0) {
      args.pop();
      limit -= 1;
    } else {
      limit = 1;
    }

    function inner(d, l, index) {
      typeof l === 'undefined' && (l = 0);
      index = typeof index === 'undefined' ? '' : '<' + index + '> ';
      var isOb = isObject(d) || count(d);

      if (isOb || isArray(d)) {
        ll('  '.repeat(l) + index + type(d) + ' ' + (isOb ? '{' : '['));
        each(d, function (v, i) {
          var isOb = isObject(v) || count(v) || isArray(v);

          if (limit !== false && l >= limit && isOb) {
            ll('  '.repeat(l + 1) + (typeof i === 'undefined' ? '' : '<' + i + '> ') + '[' + type(v) + ']: ' + '>>more<<'); // inner('... more: ' + type(v), l + 1, i);
          } else {
            inner(v, l + 1, i);
          }
        });
        ll('  '.repeat(l) + (isOb ? '}' : ']'));
      } else {
        var t = type(d);
        var c = toString(d);
        ll('  '.repeat(l) + index + '[' + t + ']: ' + '>' + c + '<' + (t === 'String' ? ' len: ' + c.length : ''));
      }
    }

    var s = stack === false ? 0 : stack;
    native(__line(s + 2));

    if (this !== true) {
      s += 1;
    }

    stack = false;
    args.forEach(function (d) {
      inner(d);
    });
    native("");
    native.flush();
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);

      if (limit !== false) {
        args = args.concat(limit + 1);
      }

      return log.stack(s).dump.apply(true, args);
    };
  };
})(native);

if (node) {
  module.exports = log;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]'; // better in node.js to dealing with RowDataPacket object
}

var node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';
var colorscache = null;

if (node) {
  global.__stack || Object.defineProperty(global, '__stack', {
    get: function tmp() {
      var orig = Error.prepareStackTrace;

      Error.prepareStackTrace = function (_, stack) {
        return stack;
      };

      var err = new Error();
      Error.captureStackTrace(err, tmp); // Error.captureStackTrace(err, arguments.callee); // without 'use strict'

      var stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });

  global.__line = function () {
    function rpad(s, n) {
      typeof n === 'undefined' && (n = 5);

      try {
        if (s && s.length && s.length >= n) {
          return s;
        }
      } catch (e) {
        console.log('exception', _typeof(s), s, e);
      }

      return String(s + " ".repeat(n)).slice(0, n);
    }

    var tool = function tool(n) {
      if (typeof n === 'undefined') {
        var tmp = [];

        for (var i in __stack) {
          if (__stack.hasOwnProperty(i)) {
            tmp.push('stack: ' + rpad(i) + ' file:' + __stack[i].getFileName() + ':' + rpad(__stack[i].getLineNumber()) + ' ');
          }
        }

        return tmp;
      }

      typeof n === 'undefined' && (n = 1);

      if (!__stack[n]) {
        return "".concat(n, " not in stack: ") + tool(n - 1);
      }

      var file = __stack[n].getFileName();

      if (file === null) {
        return 'corrected:' + tool(n - 1);
      }

      return new Date().toISOString().substring(0, 19).replace('T', ' ') + ' ' + file + ':' + rpad(__stack[n].getLineNumber());
    };

    return tool;
  }();

  var util = eval('require')('util');

  var tool = function tool(obj, depth, colors, stack) {
    process.stdout.write(tool.log(obj, depth, colors, stack) + "\n");
  };
  /**
   * https://nodejs.org/api/util.html#util_util_inspect_object_options
   */


  tool.log = function (obj) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var colors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var stack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var opt = {// depth,
      // colors,
      // compact: true,
      // breakLength: 80,
    };

    if (isObject(depth)) {
      opt = Object.assign({
        colors: false,
        compact: false
      }, opt);
    } else {
      opt.depth = depth;
      opt.colors = typeof colorscache === 'boolean' ? colorscache : colors;
    }

    return __line(stack + 3) + "\n" + util.inspect(obj, opt);
  };

  tool.colors = function (c) {
    return colorscache = c;
  };

  module.exports = tool;
} else {
  module.exports = __webpack_require__(3);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

module.exports = function () {
  try {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args = [new Date().toISOString().substring(0, 19).replace('T', ' '), ': '].concat(_toConsumableArray(args), ["\n"]);
      process.stdout.write(args.join(''));
    };
  } catch (e) {
    return function () {};
  }
}();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
module.exports = isArray;

/***/ }),
/* 11 */
/***/ (function(module) {

module.exports = {"NODE_PORT":"2000","NODE_HOST":"0.0.0.0","NODE_SSR_PROTOCOL":"http","NODE_SSR_HOST":"localhost","NODE_SSR_PORT":"2000","NODE_SSR_PREFIX":"/api","JWT_COOKIE_NAME":"jwt_cookie","ENV_SECURE":"true","ENV_ORIGIN":"preprocessor","NODE_ENV":"development"};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';
/**
 * @date 2018-02-01
 *
 * I introduced main transport tool (server) based on old fasion ajax on purpose, that's not mistake.
 * The reason is lack in chrome "Replay XHR" feature.
 * But it is though provided through fetch polyfill so it will be easy to revert it back
 * when they finally implement "Replay XHR"
 */

if (node) {
  // log("\n\n" + 'try to polyfill node' + "\n\n");
  eval('require')('isomorphic-fetch');
  global.server = fetch; // global.server = (...args) => {
  //
  //     log("\n\n" + 'node fetch polyfill' + "\n\n");
  //
  //     return fetch(...args)
  // };
} else {
  // log("\n\n" + 'try to polyfill browser' + "\n\n");
  (function (old) {
    // https://github.com/github/fetch/issues/544
    window.fetch = undefined;

    __webpack_require__(13);

    window.server = fetch;
    window.fetch = old; // window.fetch = (...args) => {
    //
    //     log('browser fetch polyfill');
    //
    //     return old(...args)
    // };
  })(window.fetch);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }

    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }

    return value;
  } // Build a destructive iterator for the value list


  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return {
          done: value === undefined,
          value: value
        };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }

    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }

    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;

      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);

        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);

      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  } // HTTP methods whose capitalization should be normalized


  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }

      this.url = input.url;
      this.credentials = input.credentials;

      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }

      this.method = input.method;
      this.mode = input.mode;

      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';

    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }

    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }

    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, {
      body: this._bodyInit
    });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2

    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();

      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';

    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, {
      status: 0,
      statusText: ''
    });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, {
      status: status,
      headers: {
        location: url
      }
    });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });
      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };

  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : this);

/***/ })
/******/ ]);