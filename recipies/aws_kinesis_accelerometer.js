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

var five = require("johnny-five");
var Edison = require("edison-io");
var AWS = require('aws-sdk');
var board = new five.Board({
  io: new Edison()
});

var awsRegion = "us-east-1";
var deviceId = "team38";
var streamName = 'iot-DeviceStream-XXXXXXXXXXXX'; // Kinesis stream that we'll use in this example
var partitionKey = "xyz";
var tableName = "iot-DeviceDataTable-XXXXXXXXXXXX";
var cognitoParams = {
    AccountId: "XXXXXXXXXXXX",
    RoleArn: "arn:aws:iam::XXXXXXXXXXXX:role/Cognito_umassUnauth_Role",
    IdentityPoolId: "us-east-1:XXXXXXXXXXXX"
};

AWS.config.region = awsRegion;
AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoParams);
AWS.config.credentials.get(function(err) {
    if (!err) {
        console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
    }
});

var kinesis = new AWS.Kinesis();

board.on("ready", function() {                
  var accelerometer = new five.Accelerometer({
    controller: "ADXL335",                    
    pins: ["A0", "A1", "A2"]                  
  });                                         
                                              
  accelerometer.on("change", function() {     
    console.log("accelerometer");             
    console.log("  x            : ", this.x); 
    console.log("  y            : ", this.y); 
    console.log("  z            : ", this.z);    
    console.log("  pitch        : ", this.pitch);
    console.log("  roll         : ", this.roll);        
    console.log("  acceleration : ", this.acceleration);
    console.log("  inclination  : ", this.inclination); 
    console.log("  orientation  : ", this.orientation);   
    console.log("--------------------------------------");

    var json = {
        device_id: deviceId,
        time: (new Date).getTime(),
        sensors: [{
            Accelerometer: {
                x: this.x,
                y: this.y,
                z: this.z
            }
        }]
    };

    var kparams = {
        Data: JSON.stringify(json),
        PartitionKey: partitionKey,
        StreamName: streamName
    };

    kinesis.putRecord(kparams, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
    });
});
