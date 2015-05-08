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

# api

## var s = transform(src, cb, ignore_trycatch=false)

# license

mit