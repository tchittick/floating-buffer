var debug = require('debug')('util');

var floatUtil = {
  arraySum: function(prev, curr, index, arr){
    return prev + curr;
  },

  makeWhole: function(buf){
    //accept buffer of length == 1
    debug('makeWhole', buf);
    var bin = buf.toString(2);
    if(bin.length !== 8){
      bin = this.prepend(bin);
    }
    return bin;
  },

  prepend: function(bin){
    var diff = 8 - bin.length;
    var str = '';
    for(var i=0; i<diff; i++){
      str += '0'
    }
    return str + bin;
  },

  shiftDot: function(m, e){
    var str = '000000000000000' + m;
    var dot = str.indexOf('.');
    str = str.replace('.', '');

    return parseFloat(str.substring(0, dot + e) + '.' + str.substring(dot + e));
  }
}

module.exports = floatUtil;