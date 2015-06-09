var debug = require('debug')('index')

var fb = require('./src/floatingBuffer.js')

var buf = new Buffer(1)
buf[0] = 0x26;

console.log(fb.readFloat8Bit(0, buf));

buf[0] = 0xe7
console.log(fb.readFloat8Bit(0, buf));

buf[0] = 0xd3
console.log(fb.readFloat8Bit(0, buf));


console.log('wtf?')