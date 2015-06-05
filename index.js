var debug = require('debug')('index')

var fb = require('./src/floatingBuffer.js')

var buf = new Buffer(1)
buf[0] = 0x26;

debug(fb.readFloat8Bit(0, buf));

buf[0] = 0xe7
debug(fb.readFloat8Bit(0, buf));

buf[0] = 0xd3
debug(fb.readFloat8Bit(0, buf));