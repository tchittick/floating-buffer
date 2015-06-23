var floatUtil = {
  arraySum: function(prev, curr, index, arr){
    return prev + curr;
  },

  makeWhole: function(buf){
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
  shiftDot2: function(m, e){
    var arr = m.split('');

    //prepending zeros
    if(e < 0){
      //shift left
      for(var i=0; i<Math.abs(e); i++){
        arr.unshift('0')
      }
    } else if(e > 0){
      //shift right
      for(var i=0; i<e; i++){
        arr.push('0')
      }
    }

    var dot = arr.indexOf('.');
    arr.splice(dot, 1);

    var fir = arr.splice(0, dot + e).join('')
    var fin = arr.join('');

    return [parseFloat(fir), parseFloat(fin)];

  },
  shiftDot: function(m, e){
    var str = '000000000000000' + m;
    var dot = str.indexOf('.');
    str = str.replace('.', '');

    console.log('str', str, 'e', e)

    return parseFloat(str.substring(0, dot + e) + '.' + str.substring(dot + e));
  }
}

module.exports = floatUtil;