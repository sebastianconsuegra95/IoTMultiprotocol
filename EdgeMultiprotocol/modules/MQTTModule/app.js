'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;
var Mqtt = require('mqtt');

var ClientMqtt = Mqtt.connect('http://' + process.env.BrokerIpAdress + ':1881');
var Topics = "[\"data/device_id\",\"Sede30/CET/Inversor_1/Proceso/SAI\",\"Sede30/CET/Inversor_1/Proceso/OS\",\"Sede30/CET/Inversor_1/Proceso/VDC_1\",\"Sede30/CET/Inversor_1/Proceso/IDC_1\",\"Sede30/CET/Inversor_1/Proceso/VDC_2\",\"Sede30/CET/Inversor_1/Proceso/IDC_2\",\"Sede30/CET/Inversor_1/Proceso/VDC_3\",\"Sede30/CET/Inversor_1/Proceso/IDC_3\",\"Sede30/CET/Inversor_1/Proceso/VDC_4\",\"Sede30/CET/Inversor_1/Proceso/IDC_4\",\"Sede30/CET/Inversor_1/Proceso/IP\",\"Sede30/CET/Inversor_1/Proceso/UAB\",\"Sede30/CET/Inversor_1/Proceso/UBC\",\"Sede30/CET/Inversor_1/Proceso/UCA\",\"Sede30/CET/Inversor_1/Proceso/UA\",\"Sede30/CET/Inversor_1/Proceso/UB\",\"Sede30/CET/Inversor_1/Proceso/UC\",\"Sede30/CET/Inversor_1/Proceso/IA\",\"Sede30/CET/Inversor_1/Proceso/IB\",\"Sede30/CET/Inversor_1/Proceso/IC\",\"Sede30/CET/Inversor_1/Proceso/APC\",\"Sede30/CET/Inversor_1/Proceso/AP\",\"Sede30/CET/Inversor_1/Proceso/RP\",\"Sede30/CET/Inversor_1/Proceso/FP\",\"Sede30/CET/Inversor_1/Proceso/FR\",\"Sede30/CET/Inversor_1/Proceso/EF\",\"Sede30/CET/Inversor_1/Proceso/T\", \"Sede30/CET/Inversor_1/Proceso/IR\",\"Sede30/CET/Inversor_1/Proceso/DS\",\"Sede30/CET/Inversor_1/Proceso/FC\",\"Sede30/CET/Inversor_1/Proceso/ST\",\"Sede30/CET/Inversor_1/Proceso/SHT\",\"Sede30/CET/Inversor_1/Proceso/ET\",\"Sede30/CET/Inversor_1/Proceso/ED\",\"Sede30/CET/Inversor_1/Proceso/RPC_FP\",\"Sede30/CET/Inversor_1/Proceso/PON\",\"Sede30/CET/Inversor_1/Proceso/POFF\",\"Sede30/CET/Inversor_1/Alarma/AL1_0\",\"Sede30/CET/Inversor_1/Alarma/AL1_1\",\"Sede30/CET/Inversor_1/Alarma/AL1_2\",\"Sede30/CET/Inversor_1/Alarma/AL1_3\",\"Sede30/CET/Inversor_1/Alarma/AL1_4\",\"Sede30/CET/Inversor_1/Alarma/AL1_5\",\"Sede30/CET/Inversor_1/Alarma/AL1_6\",\"Sede30/CET/Inversor_1/Alarma/AL1_7\",\"Sede30/CET/Inversor_1/Alarma/AL1_8\",\"Sede30/CET/Inversor_1/Alarma/AL1_9\",\"Sede30/CET/Inversor_1/Alarma/AL1_10\",\"Sede30/CET/Inversor_1/Alarma/AL1_11\",\"Sede30/CET/Inversor_1/Alarma/AL1_12\",\"Sede30/CET/Inversor_1/Alarma/AL1_13\",\"Sede30/CET/Inversor_1/Alarma/AL1_14\",\"Sede30/CET/Inversor_1/Alarma/AL1_15\",\"Sede30/CET/Inversor_1/Alarma/AL2_0\",\"Sede30/CET/Inversor_1/Alarma/AL2_1\",\"Sede30/CET/Inversor_1/Alarma/AL2_2\",\"Sede30/CET/Inversor_1/Alarma/AL2_3\",\"Sede30/CET/Inversor_1/Alarma/AL2_4\",\"Sede30/CET/Inversor_1/Alarma/AL2_5\",\"Sede30/CET/Inversor_1/Alarma/AL2_6\",\"Sede30/CET/Inversor_1/Alarma/AL2_7\",\"Sede30/CET/Inversor_1/Alarma/AL2_8\",\"Sede30/CET/Inversor_1/Alarma/AL2_9\",\"Sede30/CET/Inversor_1/Alarma/AL2_10\",\"Sede30/CET/Inversor_1/Alarma/AL2_11\",\"Sede30/CET/Inversor_1/Alarma/AL2_12\",\"Sede30/CET/Inversor_1/Alarma/AL2_15\",\"Sede30/CET/Inversor_2/Proceso/SAI\",\"Sede30/CET/Inversor_2/Proceso/OS\",\"Sede30/CET/Inversor_2/Proceso/VDC_1\",\"Sede30/CET/Inversor_2/Proceso/IDC_1\",\"Sede30/CET/Inversor_2/Proceso/VDC_2\",\"Sede30/CET/Inversor_2/Proceso/IDC_2\",\"Sede30/CET/Inversor_2/Proceso/VDC_3\",\"Sede30/CET/Inversor_2/Proceso/IDC_3\",\"Sede30/CET/Inversor_2/Proceso/VDC_4\",\"Sede30/CET/Inversor_2/Proceso/IDC_4\",\"Sede30/CET/Inversor_2/Proceso/IP\",\"Sede30/CET/Inversor_2/Proceso/UAB\",\"Sede30/CET/Inversor_2/Proceso/UBC\",\"Sede30/CET/Inversor_2/Proceso/UCA\",\"Sede30/CET/Inversor_2/Proceso/UA\",\"Sede30/CET/Inversor_2/Proceso/UB\",\"Sede30/CET/Inversor_2/Proceso/UC\",\"Sede30/CET/Inversor_2/Proceso/IA\",\"Sede30/CET/Inversor_2/Proceso/IB\",\"Sede30/CET/Inversor_2/Proceso/IC\",\"Sede30/CET/Inversor_2/Proceso/APC\",\"Sede30/CET/Inversor_2/Proceso/AP\",\"Sede30/CET/Inversor_2/Proceso/RP\",\"Sede30/CET/Inversor_2/Proceso/FP\",\"Sede30/CET/Inversor_2/Proceso/FR\",\"Sede30/CET/Inversor_2/Proceso/EF\",\"Sede30/CET/Inversor_2/Proceso/T\",\"Sede30/CET/Inversor_2/Proceso/IR\",\"Sede30/CET/Inversor_2/Proceso/DS\",\"Sede30/CET/Inversor_2/Proceso/FC\",\"Sede30/CET/Inversor_2/Proceso/ST\",\"Sede30/CET/Inversor_2/Proceso/SHT\",\"Sede30/CET/Inversor_2/Proceso/ET\",\"Sede30/CET/Inversor_2/Proceso/ED\",\"Sede30/CET/Inversor_2/Proceso/RPC_FP\",\"Sede30/CET/Inversor_2/Proceso/PON\",\"Sede30/CET/Inversor_2/Proceso/POFF\",\"Sede30/CET/Inversor_2/Alarma/AL1_0\",\"Sede30/CET/Inversor_2/Alarma/AL1_1\",\"Sede30/CET/Inversor_2/Alarma/AL1_2\",\"Sede30/CET/Inversor_2/Alarma/AL1_3\",\"Sede30/CET/Inversor_2/Alarma/AL1_4\",\"Sede30/CET/Inversor_2/Alarma/AL1_5\",\"Sede30/CET/Inversor_2/Alarma/AL1_6\",\"Sede30/CET/Inversor_2/Alarma/AL1_7\",\"Sede30/CET/Inversor_2/Alarma/AL1_8\",\"Sede30/CET/Inversor_2/Alarma/AL1_9\",\"Sede30/CET/Inversor_2/Alarma/AL1_10\",\"Sede30/CET/Inversor_2/Alarma/AL1_11\",\"Sede30/CET/Inversor_2/Alarma/AL1_12\",\"Sede30/CET/Inversor_2/Alarma/AL1_13\",\"Sede30/CET/Inversor_2/Alarma/AL1_14\",\"Sede30/CET/Inversor_2/Alarma/AL1_15\",\"Sede30/CET/Inversor_2/Alarma/AL2_0\",\"Sede30/CET/Inversor_2/Alarma/AL2_1\",\"Sede30/CET/Inversor_2/Alarma/AL2_2\",\"Sede30/CET/Inversor_2/Alarma/AL2_3\",\"Sede30/CET/Inversor_2/Alarma/AL2_4\",\"Sede30/CET/Inversor_2/Alarma/AL2_5\",\"Sede30/CET/Inversor_2/Alarma/AL2_6\",\"Sede30/CET/Inversor_2/Alarma/AL2_7\",\"Sede30/CET/Inversor_2/Alarma/AL2_8\",\"Sede30/CET/Inversor_2/Alarma/AL2_9\",\"Sede30/CET/Inversor_2/Alarma/AL2_10\",\"Sede30/CET/Inversor_2/Alarma/AL2_11\",\"Sede30/CET/Inversor_2/Alarma/AL2_12\",\"Sede30/CET/Inversor_2/Alarma/AL2_15\",\"Sede30/CET/Estacion_Metereologica/Proceso/RD\",\"Sede30/CET/Estacion_Metereologica/Proceso/RDSM_1\",\"Sede30/CET/Estacion_Metereologica/Proceso/RDSM_2\",\"Sede30/CET/Estacion_Metereologica/Proceso/TA\",\"Sede30/CET/Estacion_Metereologica/Proceso/TP\",\"Sede30/CET/Medidor/Proceso/UA\",\"Sede30/CET/Medidor/Proceso/UB\",\"Sede30/CET/Medidor/Proceso/UC\",\"Sede30/CET/Medidor/Proceso/IA\",\"Sede30/CET/Medidor/Proceso/IB\",\"Sede30/CET/Medidor/Proceso/IC\",\"Sede30/CET/Medidor/Proceso/AP\",\"Sede30/CET/Medidor/Proceso/AP_A\",\"Sede30/CET/Medidor/Proceso/AP_B\",\"Sede30/CET/Medidor/Proceso/AP_C\",\"Sede30/CET/Medidor/Proceso/RP\",\"Sede30/CET/Medidor/Proceso/RP_A\",\"Sede30/CET/Medidor/Proceso/RP_B\",\"Sede30/CET/Medidor/Proceso/RP_C\",\"Sede30/CET/Medidor/Proceso/FP\",\"Sede30/CET/Medidor/Proceso/FP_A\",\"Sede30/CET/Medidor/Proceso/FP_B\",\"Sede30/CET/Medidor/Proceso/FP_C\",\"Sede30/CET/Medidor/Proceso/SP\"]"
var MQTT_Topics = Topics.replace("[", "").replace("]", "").replace(/"/g, '').split(',')

// Agregar evento de error

function msg_format_EE(payload, topic) {
  var message = payload.toString('utf8')
  return new Message(message)
}

function msg_format_REN(payload, topic) {
  console.log(payload)
  var message = JSON.stringify({ 'nombre': topic, 'valor': parseFloat(payload.toString('utf8')), 'estampatiempo': new Date().toISOString() })
  return new Message(message)
}

/* istanbul ignore next */
ClientMqtt.on('connect', function () {
  console.log('MQTT Connected!')
  for (let i = 0; i < MQTT_Topics.length; i++) {
    ClientMqtt.subscribe(MQTT_Topics[i])
  }
  console.log('Subscribe to all Topics!')

})

/* istanbul ignore next */
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
          if (topic == 'data/device_id') {
            var outputMsg = msg_format_EE(payload, topic)
            client.sendOutputEvent('output1', outputMsg, printResultFor('Sending received message to output1'))
          } else {
            var outputMsg = msg_format_REN(payload, topic)
            client.sendOutputEvent('output2', outputMsg, printResultFor('Sending received message to output2'))
          }
        }
      });
    }
  });


})

module.exports = { msg_format_EE, msg_format_REN }

// This function just pipes the messages without any change.
/* istanbul ignore next */
function pipeMessage(client, inputName, msg) {
  client.complete(msg, printResultFor('Receiving message'));

  if (inputName === 'input1') {
    var message = msg.getBytes().toString('utf8');
    if (message) {
      var outputMsg = new Message(message);
      client.sendOutputEvent('output2', outputMsg, printResultFor('Sending received message'));
    }
  }
}

// Helper function to print results in the console
/* istanbul ignore next */
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