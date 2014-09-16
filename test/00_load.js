var path = require('path')
var test = require('tape').test
var Slenderr = require(path.join(__dirname, '../lib/slenderr'))

test('can load module', function (t) {
    t.ok(Slenderr.define, 'var Slenderr = require("Slender")')
    t.end()
})
