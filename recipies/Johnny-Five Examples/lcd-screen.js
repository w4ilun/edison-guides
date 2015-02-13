// How to write to the Seeed LCD Screen
// NOTE: You *MUST* plug the LCD into an I2C slot or this will not work!
var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var lcd = new five.LCD({
    controller: "JHD1313M1"
  });

  lcd.useChar("heart");
  lcd.cursor(0, 0).print("I :heart: Johnny-Five");
});
