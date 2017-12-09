/* eslint-disable */
/**
 * requestAnimationFrame polyfill v1.0.1
 * requires Date.now
 *
 * © Polyfiller 2015
 * Released under the MIT license
 * github.com/Polyfiller/requestAnimationFrame
 */
global.requestAnimationFrame = function () {
  var fps = 60;
  var delay = 1000 / fps;
  var animationStartTime = Date.now();
  var previousCallTime = animationStartTime;

  return function requestAnimationFrame(callback) {
    var requestTime = Date.now();
    var timeout = Math.max(0, delay - (requestTime - previousCallTime));
    var timeToCall = requestTime + timeout;

    previousCallTime = timeToCall;

    return global.setTimeout(function onAnimationFrame() {
      callback(timeToCall - animationStartTime);
    }, timeout);
  };
}();

global.cancelAnimationFrame = function cancelAnimationFrame(id) {
  global.clearTimeout(id);
};
