var path = require('path')
var test = require('tape').test
var Slenderr = require(path.join(__dirname, '../lib/slenderr'))

function teardown () {
    Object.keys(Slenderr).forEach(function (key) {
        if (key !== 'define') delete Slenderr[key]
    })
}

test('stack', function (t) {
    Slenderr.define('stack')

    function step1 () {
        step2()
    }
    function step2 () {
        throw new Slenderr.StackError('stack out')
    }

    function step0 () {
        try {
            step1()
        } catch (err) {
            t.ok(err, '"step0" catch up error')
            t.is(err.name, 'StackError', 'err.name === "StackError"')
            t.ok(/step2.+\n.+step1.+\n.+step0/.test(err.stack)
              , '/step2.+\\n.+step1.+\\n.+step0/.test(err.stack)')
        }
    }

    step0()

    t.end()
    teardown()
})
