// Blink an LED
// Pin 13 is the default pin on the large Arduino breakout board, change as needed.
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