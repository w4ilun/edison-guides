// Blink an LED
// Pin 13 is the default pin on the large Arduino breakout board, change as needed.
var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(1000);
});
