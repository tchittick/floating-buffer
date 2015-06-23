var util = require('./floatUtil.js')

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
  readFloat8Bit: function(start, input, options){
    //Converts single octet to floating point of specified compenent lengths
    var bin = util.makeWhole(input[start]);
    var s, e, m, d;

    s = bin.charAt(0);
    e = parseInt(bin.substring(1, 4), 2) - 3;
    m = '1.' + bin.substring(4, 8);
    d = util.shiftDot(m, e);

    var result = this._convert(e, d);

    return parseInt(s) ? -result : result;

  },
  //PRIVATE METHODS
  _convert: function(e, d){
    console.log('e', e, 'd', d)
    var strDot, length, dotIndex, num, frac;
    var values = [];

    strDot = d.toString();
    length = strDot.length;
    dotIndex = strDot.indexOf('.');
    num = strDot.substring(0, dotIndex).split('');
    frac = strDot.substring(dotIndex + 1).split('');

    for(var i=num.length-1, n=0; i>-1; i--, n++){
      if(parseInt(num[i])){
        values.push(Math.pow(2, n));
      }
    }
   
    for(var i=0; i<frac.length; i++){
      if(parseInt(frac[i])){
        values.push(Math.pow(2, -i-1));
      }
    }

    if(values.length){
      return values.reduce(util.arraySum);
    }
    return 0;
  }
}

module.exports = new FloatingBuffer;