var FloatingBuffer = function(options, buf){
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
  readFloat8Bit: function(start, end, input, options){
    //Converts single octet to floating point of specified compenent lengths
    var start, end, inpu
    switch(args.length){
      case 0:
        start = 0;
        end = this.buf.length;
        input = this.input;
        options = this.options;
        break;
    }

  },
  readFloat16Bit: function(start, end, input, options){

  },
  readFloat24Bit: function(start, end, input, options){

  },
  readFloatNBit: function(start, end, input, options){
    //accepts a buffer

  },
  //PRIVATE METHODS
  _arraySum: function(prev, curr, index, arr){
    return prev + curr;
  },
  _makeWhole: function(buf){
    //accept buffer of length == 1
    if(buf.length !== 1)
      return "buffer wrong size"

    var bin = buf[0].toString(2);
    if(bin.length !== 8){
      bin = this.prepend(bin);
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

module.exports = new FloatingBuffer;