;(function (global) {
    'use strict'
/* show error *
*  show fail case data *
*  show success case data */
    if (! global.console) global.console = {}
    if (! global.console.log) global.console.log = function dummyConsoleLog () {}

    global['log'] = function log () {
        var args = [].slice.apply(arguments)
        args.unshift('[' + (new Date).toString() + ']')
        console.log(args.join(' '))
    }

})(this)
