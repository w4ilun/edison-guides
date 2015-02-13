// Activate the touch button
// This code will work for BOTH the capactive button and the "standard" button with a black tip
var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var touch = new five.Button(4);

  touch.on("press", function() {
    console.log("Pressed!");
  });
  touch.on("release", function() {
    console.log("Released!");
  });
  touch.on("hold", function() {
    console.log("Holding...");
  });
});
