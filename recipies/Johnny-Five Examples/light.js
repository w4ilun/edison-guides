// Plug the light sensor into the Analog port A0 on the provided
// Seeed Sensor Kit Arduino Shield
// MUST be in the analog pin slots!
var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var light = new five.Sensor("A0");
  this.loop(2000, function() {
    console.log("Light sensor value: ", light.value);
  });
});
