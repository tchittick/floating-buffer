
var FloatingBuffer = function(subject, encoding){
  Buffer.call(this, subject, encoding);
}

FloatingBuffer.prototype = {

}

FloatingBuffer.prototype = Object.create(Buffer.prototype);
FloatingBuffer.prototype.constructor = FloatingBuffer;

module.exports = FloatingBuffer;