// Plug the temperature sensor into the Analog port A0 on the provided
// Seeed Sensor Kit Arduino Shield
// MUST be in the analog pin slots!
var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var temp = new five.Temperature({
    pin: "A0",
    controller: "GROVE"
  });

  this.loop(2000, function() {
    console.log("%d°C", Math.round(temp.celsius));
  });
});
