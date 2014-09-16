var test = require('tape').test
var slenderr = require('..')

test('define http statusCode error', function (t) {
    if (global && global.global) {
        var httpStatus = require('./http_status/error')
        var err418 = new httpStatus.HTTP418Error()

        t.ok(err418, 'var err418 = new sc.HTTP418Error()')
        t.is(err418.name, 'HTTP418Error', 'err418.name === "HTTP418Error"')
        t.is(err418.message, "I'm a teapot", 'err418.message === "I\'m a teapot"')
        t.is(err418.code, "418", 'err418.code === "418"')
    }

    else {
        t.skip('skip this test because of the http-server test')
    }

    t.end()
})
