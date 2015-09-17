# transform-deps

parse the ast and transform require() calls.

# example

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

# api

```js
var transform = require('transform-deps')
```

## var str = transform(src[, opts], cb)

Transforms the string source `src` with the function `cb`, returning transformed string `str`.

`opts` are:

* `asString`: Returns a plain string instead of [falafel](https://github.com/substack/node-falafel) output (default: `true`)
* `ignoreTryCatch`: Skips try/catch statements (default: `false`)

All of the `opts` will be passed to [falafel](https://github.com/substack/node-falafel).

# license

mit
