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

// Plug the sound sensor into the Analog port A0 on the provided
// Seeed Sensor Kit Arduino Shield
// MUST be in the analog pin slots!

var Cylon = require('cylon');

Cylon
  .robot({ name: 'Temperature'})
  .connection('edison', { adaptor: 'intel-iot' })
  .device('sensor', { driver: 'analogSensor', pin: 0, connection: 'edison' })
  .on('ready', function(my) {
    var sensorVal = 0;
    var ready = false;

    my.sensor.on('analogRead', function(data) {
      sensorVal = data;
      console.log('Sound Sensor Value:' + sensorVal);
    });

    setInterval(function() {
      if (ready) {
        var toSend = {
          analogSensor: sensorVal
        };
        if (err != null) {
          console.log("Error sending analog sensor information: " + err);
        }
      }
    }, 2000);
  })
  .start();