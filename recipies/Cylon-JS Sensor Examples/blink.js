// Blink an LED
var Cylon = require('cylon');

Cylon
  .robot()
  .connection('edison', { adaptor: 'intel-iot' })
  .device('led', { driver: 'led', pin: 4, connection: 'edison' })
  .on('ready', function(my) {
    setInterval(function() {
      my.led.toggle();
    }, 1000);
  });

Cylon.start();