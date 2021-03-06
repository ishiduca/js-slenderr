;(function (global) {
'use strict'

function define (_name, _message, _option) {
    var argErrs = [
        '1st argument is required and this type must be "string"'
      , '2nd argument\'s type may be "string"'
      , '3rd argument\'s type may be "object"'
    ]

    if (! _name || 'string' !== typeof _name) throw new TypeError(argErrs[0])
    if (!(! _message || 'string' === typeof _message)) throw new TypeError(argErrs[1])
    if (!(! _option  || 'Object' === isType(_option))) throw new TypeError(argErrs[2])

    var name = camelize((_name.slice(-5).toLowerCase() === 'error') ? _name
                                                                    : _name + 'Error')
    var _constructor = this[name] = function (_mes, _option) {
        if (!(this instanceof _constructor)) {
            return new _constructor(_mes, _option)
        }

        Error.call(this)

        if (_mes && 'string' === typeof _mes) this.message = _mes
        merge(this, _option)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        } else {
            var err = Error(this.message)
            err.name = name
            if (! this.stack && (err.stack || err.stacktrace)) {
                this.stack = err.stack || err.stacktrace
            }
        }

        return this
    }

    var F = function () {}
    F.prototype = Error.prototype
    this[name].prototype = new F
    merge(this[name].prototype, _option)
    this[name].prototype.constructor = this[name]
    this[name].prototype.name = name
    this[name].prototype.message = _message || _name + ' error'

    var proto = this[name].prototype
    this[name].prototype.json = json

    return this

    function json () {
        var me = {}
        var cache = []
        merge(me, proto)
        merge(me, this)
        return JSON.stringify(me, function replacer (key, val) {
            if (!! val && 'object' === typeof val) {
                if (indexOf(cache, val) !== -1) return
                cache.push(val)
            }
            return val
        })
    }

}

;(global['Slenderr'] || (global['Slenderr'] = {})) && (global['Slenderr'].define = define)

function camelize (str) {
    var res = [], reg = /[\s\-_.:*/]+/
    var p = str.split(reg)
    for (var i = 0, len = p.length; i < len; i++) {
        res.push(p[i].slice(0,1).toUpperCase() + p[i].slice(1))
    }
    return res.join('')
}

function merge (org, _opt) {
    if (! _opt) return
    for (var key in _opt) {
        if (_opt.hasOwnProperty(key)) org[key] = _opt[key]
    }
}

function isType (o) { return ({}).toString.apply(o).slice(8, -1) }

function indexOf (arry, target) {
    if (arry.indexOf) return arry.indexOf(target)
    for (var i = 0, len = arry.length; i < len; i++) {
        if (target === arry[i]) return i
    }
    return -1
}

})(this.self)
