#!/usr/bin/env node

var mqtt = require('mqtt')
  , optimist = require('optimist')
  , util = require('util')
  , exec = require('child_process').exec
  , sleep = require('sleep')
  , url = require('url')
  , fs = require('fs');

var argv = optimist
  .usage('mqtt-exec: receive shell commands on MQTT messages\n \
    Usage: mqtt-exec -h <broker-url> -t <topics>')
  .options('h', {
      describe: 'broker url'
    , default: 'mqtt://localhost:1883'
    , alias: 'broker-url'
  })
  .argv;

// Parse url
var mqtt_url = url.parse(argv.h || process.env.MQTT_BROKER_URL);
var auth = (mqtt_url.auth || ':').split(':');

//Loading config
var configuration = JSON.parse(fs.readFileSync(__dirname+'/config.json').toString());
var topics = [];
for(var key in configuration){
    var topic = key;
    topics.push(topic);
}

//Creating the MQTT Client
console.log("Creating client for: " + mqtt_url.hostname);
// Create a client connection
var c = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});

c.on('connect', function() {
  console.log("Subscribe to topics...: " + topics);
  c.subscribe(topics);
  c.on('message', function(topic, message) {
    topic = topic.replace(/"/g, "\\\"");
    var message = message.replace(/"/g, "\\\"");   
    executeShellCommand(topic,message);
    var topic_outgoing = topic.replace(/\/set/g,'');
    console.log("Reportig value back to topic: " + topic_outgoing);
    c.publish(topic_outgoing,message,{retain: true});
  });
});

function executeShellCommand(topic,payload){
    var commands = configuration[topic];
    var command = commands[payload];
    console.log("Executing command: " + command + " for topic: " + topic + " and payload: " + payload);
    //exec(command, puts);
    sleep.sleep(1);//sleep for 1 seconds
}

function puts(error, stdout, stderr) { 
        util.puts(stdout); 
        console.warn("Executing Done");
}
