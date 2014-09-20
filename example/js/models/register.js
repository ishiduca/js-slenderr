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
