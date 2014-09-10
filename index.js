
module.exports = transformdeps;

var acorn = require('acorn');
var walk = require('acorn/util/walk');

function transformdeps (src, fn) {
  var ret = src;
  var ast = acorn.parse(src, { ranges: true });
  var offset = 0;
  walk.simple(ast, {
    CallExpression: function (node) {
      if (node.callee.type === 'Identifier' && 
          node.callee.name === 'require' && node.arguments) {
        var arg0 = node.arguments[0];
        var value = src.substring(arg0.range[0] + 1, arg0.range[1] - 1);
        var update = fn(value);
        if (!update || typeof update !== 'string')
          return;
        ret = ret.substring(0, arg0.range[0] + 1 + offset) + 
          update + ret.substring(arg0.range[1] - 1 + offset);
        offset += update.length - value.length;
      }
    }
  });
  return ret;
}
