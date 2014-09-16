var path = require('path')
var test = require('tape').test
var Slenderr = require(path.join(__dirname, '../lib/slenderr'))

function teardown () {
    Object.keys(Slenderr).forEach(function (key) {
        if (key !== 'define') delete Slenderr[key]
    })
}

test('defineとYourOwnErrorConstructorを分離', function (t) {
    var def = Slenderr.define
    var HttpError = {}

    def.apply(HttpError, ['client', 'Bad Request', {statusCode: 400}])

    t.notOk(Slenderr.ClientError,  'no exists "Slenderr.ClientError"')
    t.ok(   HttpError.ClientError, 'exists "HttpError.ClientError"')
    t.notOk(HttpError.define, 'no exists "HttpError.define"')

    try {
        throw new HttpError.ClientError(
          'Request Header Fields Too Large', {statusCode: 431})
    } catch (err) {
        t.is(err.name, 'ClientError', 'err.name === "ClientError"')
        t.is(err.message, 'Request Header Fields Too Large'
          , 'err.message === "Request Header Fields Too Large"')
        t.is(err.toString()
          , 'ClientError: Request Header Fields Too Large'
          , 'err.toString() === "ClientError: Request Header Fields ' +
            'Too Large"')
        t.ok(err instanceof HttpError.ClientError
          , 'err instanceof HttpError.ClientError')
    }

    t.end()
    teardown()
})
