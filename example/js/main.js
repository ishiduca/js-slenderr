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
