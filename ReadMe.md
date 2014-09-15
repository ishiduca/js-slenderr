# slenderr

defines the error object of your own.
inherits the Error.prototype. but __does not let you perform multiple inheritance__.

## synopsis

```js
var Slenderr = require('slenderr')
// defines "CookieParseError"
Slenderr.define('cookie parse')
// can use "Slenderr.CookieParseError"
var err = new Slenderr.CookieParseError('not found response.headers.cookie')
console.log(err.name) // 'CookieParseError'
console.log(err.message) // 'not found response.headers.cookie'
```

#### in browser

```html
<script src="path/to/slenderr/index.js"></script>
Slenderr.define(...)
```

## methods

### define(name[, defaultMessage [, defaultOption]])

defines the Constructor and attaches to __Slenderr__.

* name           *{String}* __required__ error name. this name is __camelized__ automatically.
* defaultMessage *{String}* __optional__ default error message.
* defaultOption  *{Object}* __optional__ the pair of the properties to add to error.


## defined constructors

defined the Constructor is camelized and attaches to Slenderr.

```js
Slenderr.define(error_name)
var err = new Slenderr.ErrorNameError(message[, option])
```

* message *{String}* __optional__ error message. override default error message.
* option  *{Object}* __optional__ additional properties. override default option.

```js
Slenderr.define('cookie parse', 'can not parse cookie', {code: 400})
// case 1
var err = new Slenderr.CookieParseError()
console.log(err.name)    // 'CookieParseError'
console.log(err.message) // 'can not parse cookie'
console.log(err.code)    // 400
// case 2
var err = new Slenderr.CookieParseError(
    'not found cookie in response.headers'
  , {code: 499}
)
console.log(err.message) // 'not found cookie in response.headers'
console.log(err.code)    // 499
```


## inherits

the constructed error object is inherits from Error.prototype.

```js
Slenderr.define('foo').define('bar')

var err = new Slenderr.BarError('foo is not bar')
console.log(err instanceof Error) // true
console.log(err instanceof Slenderr.BarError) // true
console.log(err instanceof Slenderr.FooError) // false
```


## stacktrace

...


### tips: defines in the small scope

use `call` or `apply`

```js
function scp () {
    var errs = {}
    Slenderr.define.call(errs, 'err_name', ...)
    var err = new errs.ErrNameError(...)
    ...
}
```

## license

MIT
