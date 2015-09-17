# transform-deps

parses the ast and transforms require() calls.

```js
var transform = require('transform-deps');
var src = "require('x'); require('y');"
src = transform(src, function (name) {
	if (name == 'x') return 'z';
});
console.log(src);
```

outputs:

```
require('z'); require('y')
```

# options

in addition to the [options supported by falafel](https://github.com/substack/node-falafel#custom-parser), we support:

- `ignoreTryCatch=false`: ignore require statements in try/catch blocks

options may be passed by using an object as the second argument.  If this is done, pass the transform function as the
3rd argument.

```js
var acorn = require('acorn-jsx');
var transform = require('transform-deps');
var src = [
    "require('x');",
    "function Thing() {}",
    "var foo = <Thing/>;",
    "var arr1 = [1]; var arr2 = [...arr1, 2]",
    "require('y');"
].join("\n");
src = transform(src, {
    ecmaVersion: 6,
    parser: acorn,
    plugins: {jsx: true}
}, function(name) {
    if (name == 'x') return 'z';
});
console.log(src);
```

# api

## var s = transform(src, cb)

## var s = transform(src, options, cb)

# license

mit
