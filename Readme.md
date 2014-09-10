# transform-deps

parse the ast and transform require calls.

```js
transformdeps("require('fs');require('path');", fn (n) {
	if (n == 'fs') return 'util';
}); // require('util');require('path');
```