var slenderr = require('../..')
var http = require('http')
var status_codes = http.STATUS_CODES

Object.keys(status_codes).forEach(function (key) {
    slenderr.define.apply( module.exports, [
        'HTTP' + key, status_codes[key], {code: key}
    ])
})

