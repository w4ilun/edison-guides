// Servo Demo
// This code will move the servo in several directions as proof of concept
var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var servo = new five.Servo(3);
  servo.sweep({
    range: [45, 135],
    interval: 1000
  });
});
