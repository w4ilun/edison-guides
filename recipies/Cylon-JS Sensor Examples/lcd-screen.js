// How to write to the Seeed LCD Screen
// NOTE: You *MUST* plug the LCD into an I2C slot or this will not work!
var Cylon = require('cylon');

function writeToScreen(screen, message) {
  screen.setCursor(0,0);
  screen.write(message);
}

Cylon
  .robot({ name: 'LCD'})
  .connection('edison', { adaptor: 'intel-iot' })
  .device('screen', { driver: 'upm-jhd1313m1', connection: 'edison' })
  .on('ready', function(my) {
    writeToScreen(my.screen, "Ready!");
  })
  .start();