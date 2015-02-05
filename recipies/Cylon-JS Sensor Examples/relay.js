// Blink an LED
// Pin 13 is the default pin on the large Arduino breakout board, change as needed.
var Cylon = require('cylon');

Cylon
  .robot()
  .connection('edison', { adaptor: 'intel-iot' })
  .device('relay', { driver: 'direct-pin', pin: 4, connection: 'edison' })
  .on('ready', function(my) {
    var state = 0;
    setInterval(function() {
      state = 1 - state;
      my.relay.digitalWrite(state);
      console.log("Relay State: "+state);
    }, 1000);
  });

Cylon.start();