'use strict'
let buildEnv = process.argv.splice(2)[0]
buildEnv = buildEnv ? buildEnv : 'prod';
module.exports = require('./env/'+ buildEnv +'.js')
