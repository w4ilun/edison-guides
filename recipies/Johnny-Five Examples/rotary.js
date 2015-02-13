// Rotary angle switch
var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var rotary = new five.Sensor("A0");
  rotary.on("data", function() {
    console.log(this.value);
  });
});
