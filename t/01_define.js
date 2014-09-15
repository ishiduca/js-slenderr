var path = require('path')
var test = require('tape').test
var Slenderr = require(path.join(__dirname, '..'))

function teardown () {
    Object.keys(Slenderr).forEach(function (Constructor) {
        if (Constructor !== 'define') delete Slenderr[Constructor]
    })
}

test('Slenderr.define(error_name, _default_message, _default_option)', function (t) {
    t.test('define("error name")', function (tt) {
        var mess = [
            /1st argument is required and this type must be "string"/
        ]

        tt.throws(function () { Slenderr.define() }, mess[0]
          , 'Slenderr.define() throw error. 1st argument is required')
        tt.throws(function () { Slenderr.define({}) }, mess[0]
          , 'Slenderr.define({}) throw error. 1st arguments type is "string"')

        Slenderr.define('set-cookie parse')
        tt.ok(Slenderr.SetCookieParseError
          , 'Slenderr.define("set-cookie parse")' +
            ' attach "Slenderr.SetCookieParseError"')

        teardown()
        tt.end()
    })

    t.test('inheritance', function (tt) {
        Slenderr.define('foo').define('bar')
        tt.ok(Slenderr.FooError, 'defined "Slenderr.FooError"')
        tt.ok(Slenderr.BarError, 'defined "Slenderr.BarError"')

        var err = new Slenderr.BarError('foo is not bar')

        tt.ok(err instanceof Error, 'barerr instanceof Error === true')
        tt.ok(err instanceof Slenderr.BarError
          , 'barerr instanceof Slenderr.BarError === true')
        tt.notOk(err instanceof Slenderr.FooError
          , 'barerr instanceof Slenderr.FooError === false')

        teardown()
        tt.end()
    })

    t.test('Slenderr.define("foo")'
    , function (tt) {
        Slenderr.define('foo')

        tt.test('var err = new Slenderr.FooError()', function (t) {
            var err = Slenderr.FooError()
            t.is(err.name, 'FooError', 'err.name === "FooError"')
            t.is(err.message, 'foo error', 'err.message === "foo error"')
            t.is(err.toString(), 'FooError: foo error'
              , 'err.toString() === "FooError: foo error"')

            t.end()
        })

        tt.test('var err = new Slenderr.FooError("bar is not foo") ' +
                '# override mes.message'
        , function (t) {
            var mes = 'bar is not foo'
            var err = Slenderr.FooError(mes)
            t.is(err.message, mes, 'err.message === "' + mes + '"')
            t.is(err.toString(), 'FooError: ' + mes
              , 'err.toString() === "FooError: ' + mes + '"')
            delete err.message
            t.is(err.toString(), 'FooError: foo error'
              , 'delete err.message && err.toString() === "FooError: foo error"')
            t.end()
        })

        tt.test('var err = new Slenderr.FooError(null, {code: 7}) ' +
                '# attache option'
        , function (t) {
            var option = {code: 7}
            var err = Slenderr.FooError(null, option)
            t.is(err.message, 'foo error'
              , 'err.message === "foo error"')
            t.is(err.code, 7, 'err.code === 7')
            delete err.code
            t.notOk(err.code, 'delete err.code && err.code === undefined')

            t.end()
        })

        tt.end()
        teardown()
    })

    t.test('Slenderr.define("bar", "bar is always barring")',function (tt) {
        var mes = 'bar is always barring'
        Slenderr.define('bar', mes)

        tt.test('var err = new Slenderr.BarError()', function (t) {
            var err = Slenderr.BarError()
            t.is(err.name, 'BarError', 'err.name === "BarError"')
            t.is(err.message, 'bar is always barring'
              , 'bar.message === "bar is always barring"')
            t.end()
        })

        tt.end()
        teardown()
    })

    t.test('Slenderr.define("opt", null, {code: 99, reason: "i do not know"})',function (tt) {
        Slenderr.define('opt', null, {code: 99, reason: 'i do not know'})

        tt.test('var err = new Slenderr.OptError()', function (t) {
            var err = Slenderr.OptError()
            t.is(err.name, 'OptError', 'err.name === "OptError"')
            t.is(err.message, 'opt error', 'err.message === "opt error"')
            t.is(err.code, 99, 'err.code === 99')
            t.is(err.reason, 'i do not know', 'err.reason === "i do not know"')
            t.end()
        })

        tt.test('var err = new Slenderr.OptError(null, {code: 100, subCode: 88})', function (t) {
            var err = Slenderr.OptError(null, {code: 100, subCode: 88})
            t.is(err.code, 100, 'err.code === 100')
            t.is(err.reason, 'i do not know', 'err.reason === "i do not know"')
            t.is(err.subCode, 88, 'err.subCode === 88')
            t.end()
        })

        tt.end()
        teardown()
    })

    t.end()
})
