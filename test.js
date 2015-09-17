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
res = transform(src, {}, fn1);
assert.equal(res, src);
src = "try { require('a') } catch (e) { require('b'); } require('c');";
res = transform(src, { ignoreTryCatch: true }, function () { return 'x'; });
assert.equal(res, "try { require('a') } catch (e) { require('b'); } require('x');");
src = "var arr1 = ['val1'];\nvar arr2 = [...arr1, 'val2'];\nvar fs = require('fs');";
res = transform(src, { ecmaVersion: 6 }, fn);
assert.equal(typeof res === 'string', true);
assert.equal(res, "var arr1 = ['val1'];\nvar arr2 = [...arr1, 'val2'];\nvar fs = require('fsx');");
src = "k = require('x')";
res = transform(src, { asString: false }, function (j) { assert.equal(j, 'x'); return 'y'; });
assert.equal(typeof res === 'string', false);
