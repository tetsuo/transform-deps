var assign = require('lodash.assign');
var falafel = require('falafel');

function parents(node) {
  var parents = [];
  for (var p = node.parent; p; p = p.parent) {
    parents.push(p);
  }
  return parents;
}

var defaultOptions = {
  ranges: true
};

module.exports = function (src, options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = assign({}, defaultOptions);
  } else {
    options = assign({}, defaultOptions, options);
  }

  var ignore_trycatch = options.ignoreTryCatch;
  delete options.ignoreTryCatch;

  return falafel(src, options, function(node) {
    if (node.type === 'CallExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'require' && node.arguments) {
      if (ignore_trycatch) {
        var istrycatch = parents(node).some(function (s) {
          return s.type === 'TryStatement' || s.type === 'CatchClause';
        });
        if (istrycatch)
          return;
      }
      var arg0 = node.arguments[0];
      var value = arg0.value;
      var update = fn(value);
      if (!update || typeof update !== 'string')
        return;
      var nodesrc = arg0.source();
      var parts = [
        nodesrc.substring(0, 1),
        update,
        nodesrc.substring(nodesrc.length - 1)
      ];
      arg0.update(parts.join(''));
    }
  }).toString();
};
