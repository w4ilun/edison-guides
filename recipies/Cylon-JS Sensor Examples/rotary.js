// Rotary angle switch
var Cylon = require('cylon');

Cylon
  .robot({ name: 'Rotary'})
  .connection('edison', { adaptor: 'intel-iot' })
  .device('rotary', { driver: 'analogSensor', pin: 0, connection: 'edison' })
  .on('ready', function(my) {
     var sensorVal = 0;
     my.rotary.on('analogRead', function(data) {
      sensorVal = data;
      console.log("Reading: " + sensorVal);
    });
  })
  .start();