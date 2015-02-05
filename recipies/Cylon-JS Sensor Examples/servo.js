// Servo Demo
// This code will move the servo in several directions as proof of concept
var Cylon = require('cylon');

Cylon
  .robot()
  .connection('edison', { adaptor: 'intel-iot' })
  .device('servo', { driver: 'servo', pin: 3, connection: 'edison' })
  .on('ready', function(my) {
    var angle = 0;
    my.servo.angle(angle);
    setInterval(function(){
      angle = angle + 45;
      if(angle > 135){
          angle = 45; //reset position if servo angle is greater than 135 (i.e. 180)
      }
      my.servo.angle(angle);
      console.log("Servo Angle: "+angle);
    },1000);
  });

Cylon.start();