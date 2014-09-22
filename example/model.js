;(function (global) {
'use strict'

var m = {}
m.register = {}

Slenderr.define.apply(m.register, [ 'operate register' ])

m.register.tester = {
    user_name: {test: function (v) {return v && v.length > 3 && v.length < 9 }}
  , password:  /^[a-zA-Z-0-9\-_]{6,}$/
}
m.register.mess = {
    user_name: '"user name" needs 4~6 charactors'
  , password:  '"password" neeeds over 6 charactors, ' +
               'allows Alphabet, Number, Underscore and hyphen'
}
m.register.validate = function (_v) {
    var v  = _v.replace(/^\s*/, '').replace(/\s*$/, '')
    if (this.tester.test(v)) return v
    throw new m.register.OperateRegisterError(this.mess, {
        inputData: _v, domName: this.domName
    })
}

m.register.onError = function (err) {
// messaging for developers.
	log(err.json ? err.json() : String(err))
    err.stack && log(err.stack)
// messaging for operators.
    m.register.write(String(err))

    //v[err.domName].focus()
}

m.register.submit = function (content) {
    var q = {}
    try {
        Object.keys(content).forEach(function (key) {
            q[key] = m.register.validate.apply({
                tester: m.register.tester[key]
              , mess:   m.register.mess[key]
              , domName: key
            }, [ content[key] ])
        })

        m.register.write(JSON.stringify(q))
        log('success: ' + JSON.stringify(q))

    } catch (err) {
        this.onError(err)
    }
}

global['m'] = m

})(this.self)
