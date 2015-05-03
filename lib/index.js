'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.defaults = defaults;
exports.build = build;

var _merge = require('deepmerge');

var merge = _interopRequire(_merge);

var _array = require('ensure-array');

var array = _interopRequire(_array);

var _resolve = require('path');

var _browserify = require('browserify');

var browserify = _interopRequire(_browserify);

var _Promise = require('bluebird');

var Promise = _interopRequire(_Promise);

var _outputFile = require('output-file');

var outputFile = _interopRequire(_outputFile);

var _clone = require('clone');

var clone = _interopRequire(_clone);

'use strict';

var writeFile = Promise.promisify(outputFile);
Promise.promisifyAll(browserify.prototype);

function defaults(pack, config) {
  return merge({
    name: pack.get('name'),
    filename: '' + pack.get('name') + '.js',
    browserify: {
      transform: []
    }
  }, config);
}

function build(pack, config) {
  var b = browserify({
    standalone: config.name
  }).add(pack.get('main'));
  clone(config.browserify.transform).map(function (t) {
    return array(t);
  }).forEach(function (t) {
    return b.transform.apply(b, t);
  });
  return b.bundleAsync().then(function (code) {
    return writeFile(_resolve.resolve(config.dest, config.filename), code);
  });
}