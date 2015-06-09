var debug = require('debug')('proto')
  , util = require('./floatUtil.js')

var FloatingBuffer = function(buf, options){
  this.options = options || defaultOptions();
  this.buf = buf || null;

  function defaultOptions(){
    return {'BE': true,
            'sign': 1,
            'exponent': 3,
            'mantissa': 4 };
  }
}

FloatingBuffer.prototype = {
  //PUBLIC METHODS
  //The first arg of each meo
  test: function(){
    console.log('Test Method');
  },
  readFloat8Bit: function(start, input, options){
    //Converts single octet to floating point of specified compenent lengths
    debug('input', input);
    var bin = util.makeWhole(input[start]);
    debug('bin', bin)
    var s, e, m, d;

    s = bin.charAt(0);
    e = parseInt(bin.substring(1,4),2) - 3;
    m = '1.' + bin.substring(4, 8);
    d = util.shiftDot(m, e);

    debug('tes', s)
    debug('tes', e)
    debug('tes', m)
    debug('tes', d)

    var result = this._convert(e, d);

    return parseInt(s) ? -result : result;

  },
  readFloat16Bit: function(start, input, options){

  },
  readFloat24Bit: function(start, input, options){

  },
  readFloatNBit: function(start, input, options){
    //accepts a buffer


  },
  //PRIVATE METHODS
  _convert: function(e, d){
    debug('e', e, 'd', d)
    var strDot, length, dotIndex, num, frac;
    var values = [];

    strDot = d.toString();
    length = strDot.length;
    dotIndex = strDot.indexOf('.');
    num = strDot.substring(0, dotIndex).split('');
    frac = strDot.substring(dotIndex + 1).split('');

    for(var i=num.length-1, n=0; i>-1; i--, n++){
      if(parseInt(num[i])){
        console.log(i, n)
        values.push(Math.pow(2, n));
      }
    }
   
    for(var i=0; i<frac.length; i++){
      //console.log(frac)
      if(parseInt(frac[i])){
        //console.log(Math.pow(2, -i))
        values.push(Math.pow(2, -i-1));
      }
    }
    debug('balues', values)
    if(values.length){
      return values.reduce(util.arraySum);
    }
    return 0;
  }
}

module.exports = new FloatingBuffer;