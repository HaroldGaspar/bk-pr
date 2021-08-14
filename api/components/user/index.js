const store = require('../../../store/dummy')
const ctrl = require('./controller')


//its exported as a fx with the stored injected
//console.log(ctrl.toString())
module.exports = ctrl(store)