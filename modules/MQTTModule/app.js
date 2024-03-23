'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;
var Mqtt = require('mqtt');

var ClientMqtt = Mqtt.connect('http://' + process.env.brokerIpAddress + ':1881');
var MQTT_Topics = process.env.topics.split(",")

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

      client.getTwin(function (err, twin) {
        if (err) {
          console.error('Error getting twin: ' + err.message);
        } else {
          twin.on('properties.desired', function (obj) {
            console.log(obj)
            var brokerMqtt = obj.brokerMqtt
            var topicsMqtt = obj.topics
            //mqttConnect(Mqtt, brokerMqtt, topicsMqtt)
          });
        }
      })

      // connect to the Edge instance
      client.open(function (err) {
        if (err) {
          throw err;
        } else {
          var message = payload.toString('utf8')
          console.log(`Message recieved from topic ${topic} :`)
          console.log(message)
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
