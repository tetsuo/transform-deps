var falafel = require('falafel'),
    xtend = require('xtend');

module.exports = function (src, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = null;
  }

  opts = xtend({ ranges: true, asString: true }, opts);

  var ret = falafel(src, opts, function (node) {
    if (node.type === 'CallExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'require' && node.arguments) {

      if (opts.ignoreTryCatch) {
        if (parents(node).some(function (s) {
          return s.type === 'TryStatement' || s.type === 'CatchClause';
        })) return;
      }

      var arg0 = node.arguments[0],
          value = arg0.value,
          update = cb(value);

      if (!update || typeof update !== 'string')
        return;

      var src0 = arg0.source(),
          parts = [
            src0.substring(0, 1),
            update,
            src0.substring(src0.length - 1)
          ];

      arg0.update(parts.join(''));
    }
  });

  if (opts.asString)
    return ret.toString();

  return ret;
};

function parents(node) {
  var parents = [];
  for (var p = node.parent; p; p = p.parent) {
    parents.push(p);
  }
  return parents;
}
