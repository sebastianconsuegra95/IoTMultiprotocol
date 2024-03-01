'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;
var Mqtt = require('mqtt');

var ClientMqtt = Mqtt.connect('http://' + process.env.brokerIpAdress + ':1881');
var Topics = ['prueba']
var MQTT_Topics = Topics

ClientMqtt.on('connect', function () {
  console.log('MQTT Connected!')
  for (let i = 0; i < MQTT_Topics.length; i++) {
    ClientMqtt.subscribe(MQTT_Topics[i])
  }
  console.log('Subscribe to all Topics!')
})

ClientMqtt.on('message', (topic, payload) => {
  Client.fromEnvironment(Transport, function (err, client) {
    if (err) {
      throw err;
    } else {
      client.on('error', function (err) {
        throw err;
      });

      // connect to the Edge instance
      client.open(function (err) {
        if (err) {
          throw err;
        } else {
          var message = payload.toString('utf8')
          var outputMsg = new Message(message)
          client.sendOutputEvent('output1', outputMsg, printResultFor('Sending received message to output1'))
        }
      });
    }
  });
})

// This function just pipes the messages without any change.
// function pipeMessage(client, inputName, msg) {
//   client.complete(msg, printResultFor('Receiving message'));

//   if (inputName === 'input1') {
//     var message = msg.getBytes().toString('utf8');
//     if (message) {
//       var outputMsg = new Message(message);
//       client.sendOutputEvent('output1', outputMsg, printResultFor('Sending received message'));
//     }
//   }
// }

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    }
    if (res) {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}
