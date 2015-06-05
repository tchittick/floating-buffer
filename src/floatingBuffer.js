var debug = require('debug')('proto')

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
    var bin = this._makeWhole(input[start]);
    debug('bin', bin)
    var s, e, m, d;

    s = bin.charAt(0);
    e = parseInt(bin.substring(1,4),2) - 3;
    m = '1.' + bin.substring(4, 8);
    d = this._shiftDot(m, e);

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
      return values.reduce(this._arraySum);
    }
    return 0;
  },
  _arraySum: function(prev, curr, index, arr){
    return prev + curr;
  },
  _makeWhole: function(buf){
    //accept buffer of length == 1
    debug('_makeWhole', buf);
    var bin = buf.toString(2);
    if(bin.length !== 8){
      bin = this._prepend(bin);
    }
    return bin;
  },
  _prepend: function(bin){
    var diff = 8 - bin.length;
    var str = '';
    for(var i=0; i<diff; i++){
      str += '0'
    }
    return str + bin;
  },
  _shiftDot: function(m, e){
    var str = '000000000000000' + m;
    var dot = str.indexOf('.');
    str = str.replace('.', '');

    return parseFloat(str.substring(0, dot + e) + '.' + str.substring(dot + e));
  }
}

function setArgs(args){
  switch(args.length){
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    default:

  }
}

module.exports = new FloatingBuffer;