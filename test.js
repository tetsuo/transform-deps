var assert = require('assert');
var transform = require('./index');
var obj = {
  fs: 'fsx',
  path: './path',
  util: 'zxcqlw'
};
function fn (dep) {
  return obj[dep];
}
var obj1 = {
  fs: null,
  path: undefined,
  util: function () {
    return;
  }
};
function fn1 (dep) {
  return obj1[dep];
}
var src = "var x=5;\nfunction k() {require(\"util\");return 1;}\nvar fs = require('fs');\n/* ehlo */\nrequire('path');var k = 3;\n";
var res = transform(src, fn);
assert.equal("var x=5;\nfunction k() {require(\"zxcqlw\");return 1;}\nvar fs = require('fsx');\n/* ehlo */\nrequire('./path');var k = 3;\n", res);
res = transform(src, fn1);
assert.equal(res, src);
src = "try { require('a') } catch (e) { require('b'); } require('c');";
res = transform(src, function () { return 'x'; }, true);
assert.equal(res, "try { require('a') } catch (e) { require('b'); } require('x');");