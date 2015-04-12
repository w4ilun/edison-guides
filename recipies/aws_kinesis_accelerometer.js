var five = require("johnny-five");
var Edison = require("edison-io");
var AWS = require('aws-sdk');
var board = new five.Board({
  io: new Edison()
});

var awsRegion = "us-east-1";
var deviceId = "team38";
var streamName = 'iot-DeviceStream-11A8Y2K4HA3X2'; // Kinesis stream that we'll use in this example
var partitionKey = "xyz";
var tableName = "iot-DeviceDataTable-QNC566GK8S5V";
var cognitoParams = {
    AccountId: "673485280914",
    RoleArn: "arn:aws:iam::673485280914:role/Cognito_umassUnauth_Role",
    IdentityPoolId: "us-east-1:94b083d6-ad03-4d4b-858b-7d97e3e22a8b"
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
