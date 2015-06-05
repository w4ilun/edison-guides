/*
 * Copyright (c) 2015 Intel Corporation.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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