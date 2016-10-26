var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var NetworkCharacteristic = function() {
 NetworkCharacteristic.super_.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb07',
    properties: ['read'],
  });

 this._value = new Buffer(0);
};

NetworkCharacteristic.prototype.onReadRequest = function(offset, callback) {

  if(!offset) {

    this._value = new Buffer(JSON.stringify({
      'freeNetwork' : os.freemem(),
      'totalMemory' : os.totalmem()
    }));
  }

    console.log('MemoryCharacteristic - onReadRequest: value = ' +
      this._value.slice(offset, offset + bleno.mtu).toString()
    );

  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(MemoryCharacteristic, BlenoCharacteristic);
module.exports = MemoryCharacteristic;
