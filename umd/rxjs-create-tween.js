(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rxjs"));
	else if(typeof define === 'function' && define.amd)
		define("rxjsCreateTween", ["rxjs"], factory);
	else if(typeof exports === 'object')
		exports["rxjsCreateTween"] = factory(require("rxjs"));
	else
		root["rxjsCreateTween"] = factory(root["Rx"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTween = createTween;

var _rxjs = __webpack_require__(1);

// eslint-disable-line

/**
 * Creates an observable that emits samples from an easing function on every animation frame
 * for a duration `d` ms.
 *
 * The first value will be emitted on the next animation frame,
 * and is the value of the easing function at `t = 0`.
 * The final value is guaranteed to be the easing function at `t = d`.
 * The observable completes one frame after the final value was emitted.
 *
 * @param {function(t: number, b: number, c: number, d: number, [s]: number): number} easingFunction
 * - the easing fuction to sample from; can use any of Robert Penner's easing functions
     (without the `x` paramter)
 * @param {number} b - beginning value and 2nd parameter of the easing function
 * @param {number} c - change in value (or end value) and 3rd parameter of the easing function
 * @param {number} d - total duration of the tween in ms and 4th parameter of the easing function
 * @param {number} [s] - 5th parameter of the easing function (optional)
 * @return {Observable<number>} - an observable emitting samples of the easing function on
 *   animation frames for `d` ms.
 */
function createTween(easingFunction, b, c, d, s) {
  return _rxjs.Observable.create(function (observer) {
    var startTime = void 0;
    var id = requestAnimationFrame(function sample(time) {
      startTime = startTime || time;
      var t = time - startTime;
      if (t < d) {
        observer.next(easingFunction(t, b, c, d, s));
        id = requestAnimationFrame(sample);
      } else {
        observer.next(easingFunction(d, b, c, d, s));
        id = requestAnimationFrame(function () {
          return observer.complete();
        });
      }
    });
    return function () {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  });
}

exports.default = createTween;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=rxjs-create-tween.js.map