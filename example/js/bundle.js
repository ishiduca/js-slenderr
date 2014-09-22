(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

var d = document
var model = require('./models')
var view  = {}

function onError (err) {
    view.result.write(String(err))

    console.log('function' === typeof err.json ? err.json() : String(err))
    err.stack && console.log(err.stack)
}

view.result = {
    dom: d.querySelector('#result')
  , write : function (str) {
        this.dom.textContent = String(str)
    }
}

d.querySelectorAll('form')[0].onsubmit = function (ev) {
    try {
        var q = model.register.validate({
            user_name: d.querySelector('#user_name').value
          , password:  d.querySelector('#password').value
        })

        view.result.write(JSON.stringify(q))

    } catch (err) {
        onError(err)
    }
}


this.onload = function onLoad () {
    d.querySelector('#user_name').focus()
}

},{"./models":2}],2:[function(require,module,exports){
'use strict'

module.exports.register = require('./register')

},{"./register":3}],3:[function(require,module,exports){
'use strict'

var Slenderr = require('../../../index')
var register = module.exports

Slenderr.define.apply( register, ['Register'])

var errorMess = {
    user_name: '"user_name" must be 4~8 charactors'
  , password:  '"password" must be over 6 charactors'
}

var tester = {
    user_name: {
        test: function registerTesterTest (v) {
            return v && v.length > 3 && v.length < 9
        }
    }
  , password: /^[a-zA-Z0-9\-]{6,}/
}

register.validate = function (formDatas) {
    var res = {}
    Object.keys(formDatas).forEach(function registerValidate (key) {
        res[key] = validate.apply({
                                      tester: tester[key]
                                    , errorMess: errorMess[key]
                                  }, [formDatas[key]])
    })

    return res

    function validate (v) {
        if (! this.tester.test(v = v.replace(/^\s*/, '').replace(/\s*$/, '')))
            throw new register.RegisterError(this.errorMess, {input_data: v})
        return v
    }
}

},{"../../../index":4}],4:[function(require,module,exports){
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

    var name = camelize(_name + 'Error')

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
            if ((err.stack || err.stacktrace) && ! this.stack) {
                this.stack = err.stack || err.stacktrace
            }
            if (! this.stack) err.toString() + '\n    sorry... error.stack not found'
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
        //return JSON.stringify(me)
        return JSON.stringify(me, function replacer (key, val) {
            if (!! val && 'object' === typeof val) {
                if (indexOf(cache, val) !== -1) return
                cache.push(val)
            }
            return val
        })
    }

}


if (this.self || this.WorkerLocation) {
    ;(this['Slenderr'] || (this['Slenderr'] = {})) && (this['Slenderr'].define = define)
} else {
    module.exports.define = define
}


function camelize (str) {
//    function uc (str) { return str.slice(0,1).toUpperCase() + str.slice(1) }
//    return str.split(/[\s\-_.:*/]+/).map(uc).join('')
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

},{}]},{},[1]);
