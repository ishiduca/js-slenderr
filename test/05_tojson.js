var test = require('tape').test
var slenderr = require('../lib/slenderr')

function teardown () {
    Object.keys(slenderr).forEach(function (key) {
        if ('define' !== key) delete slenderr[key]
    })
}

test('err.json()', function (t) {
    slenderr.define('alphabet', null, {status: false})

    t.test('var err = new slenderr.AlphabetError()', function (tt) {
        var err = new slenderr.AlphabetError()

        tt.is(err.name, 'AlphabetError', 'err.name === "AlphabetError"')
        tt.is(err.message, 'alphabet error', 'err.message = "alphabet error"')
        tt.is(err.status, false, 'err.status === false')

        tt.deepEqual(err, {}
          , 'err deepEqual {} # .name, .message, .status is prototype property')
        tt.is(JSON.stringify(err), "{}", 'JSON.stringify(err) === "{}"')

        tt.is('function', typeof err.json, '"function" === typeof err.json')

        var json = err.json()
        tt.ok(/"name"\s*:\s*"AlphabetError"/.test(json)
          , '/"name"\\s*:\\s*"AlphabetError"/.test(err.json())')
        tt.ok(/"message"\s*:\s*"alphabet error"/.test(json)
          , '/"message"\\s*:\\s*"alphabet error"/.test(err.json())')
        tt.ok(/"status"\s*:\s*false/.test(json)
          , '/"status"\\s*:\\s*false/.test(err.json())')

        tt.end()
    })

    t.test('var err = new slenderr.AlphabetError("non", {status: true})', function (tt) {
        var err = new slenderr.AlphabetError('non', {status: !0})

        tt.is(err.name, 'AlphabetError', 'err.name === "AlphabetError"')
        tt.is(err.message, 'non', 'err.message = "non"')
        tt.is(err.status, true, 'err.status === true')

        tt.deepEqual(err, {message: 'non', status: true}
          , 'err deepEqual {message: "non", status: true} # .message, .status override')
        tt.ok(/"message"\s*:\s*"non"/.test(JSON.stringify(err))
          , '/"message"\\s*:\\s*"non"/.test(JSON.stringify(err)')
        tt.ok(/"status"\s*:\s*true/.test(JSON.stringify(err))
          , '/"status"\\s*:\\s*true/.test(JSON.stringify(err)')
        tt.notOk(/"name"/.test(JSON.stringify(err))
          , '! /"name"/.test(JSON.stringify(err)')

        var json = err.json()
        tt.ok(/"name"\s*:\s*"AlphabetError"/.test(json)
          , '/"name"\\s*:\\s*"AlphabetError"/.test(err.json())')
        tt.ok(/"message"\s*:\s*"non"/.test(json)
          , '/"message"\\s*:\\s*"non"/.test(err.json())')
        tt.ok(/"status"\s*:\s*true/.test(json)
          , '/"status"\\s*:\\s*true/.test(err.json())')

        tt.end()
    })

    t.end()
    teardown()
})
