// Plug the temperature sensor into the Analog port A0 on the provided
// Seeed Sensor Kit Arduino Shield
// MUST be in the analog pin slots!

var Cylon = require('cylon');

Cylon
  .robot({ name: 'Temperature'})
  .connection('edison', { adaptor: 'intel-iot' })
  .device('sensor', { driver: 'analogSensor', pin: 0, connection: 'edison' })
  .on('ready', function(my) {
    var sensorVal = 0;
    var ready = false;

    my.sensor.on('analogRead', function(data) {
      sensorVal = data;
      console.log('Temperature Sensor Value:' + sensorVal);
    });

    setInterval(function() {
      if (ready) {
        var toSend = {
          analogSensor: sensorVal
        };
        if (err != null) {
          console.log("Error sending analog sensor information: " + err);
        }
      }
    }, 2000);
  })
  .start();