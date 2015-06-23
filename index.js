
var fb = require('./src/floatingBuffer.js')

var buf = new Buffer(1)
buf[0] = 0xe7
console.log('8', fb.readFloat8Bit(0, buf));