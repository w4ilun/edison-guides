// Make the buzzer go beep
// Warning - this is going to be really annoying.
//
// ----> npm install j5-songs <----
//
var songs = require("j5-songs");
var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var buzzer = new five.Piezo(4);
  var tetris = songs.load("tetris-theme");
  buzzer.play(tetris);
});
