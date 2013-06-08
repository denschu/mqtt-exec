#!/usr/bin/env node

var mqtt = require('mqtt')
  , optimist = require('optimist')
  , util = require('util')
  , exec = require('child_process').exec
  , sleep = require('sleep');

var argv = optimist
  .usage('mqtt-exec: receive shell commands on mqtt messages\n \
    Usage: mqtt-exec -p <port> -h <host> -t <topics>')
  .options('h', {
      describe: 'broker host name'
    , default: 'localhost'
    , alias: 'host'
  })
  .options('p', {
      describe: 'broker port'
    , default: 1883
    , alias: 'port'
  })
  .options('t', {
      describe: 'topics to monitor, comma separated'
    , demand: true
    , alias: 'topics'
  })
  .argv;

var topics = argv.t.split ? argv.t.split(',') : false
  , host = argv.h
  , port = argv.p;

if (!topics) {
  optimist.showHelp();
  process.exit(1);
}

//Loading config
var configuration = {};

//Creating the MQTT Client
console.log("Creating client...");
var c = mqtt.createClient(port, host);

c.on('connect', function() {
  console.log("Subscribe to topics...: " + topics);
  c.subscribe(topics);
  //For configuration
  c.subscribe('/home/+/+/config/command/+');

  c.on('message', function(topic, message) {
    topic = topic.replace(/"/g, "\\\"");
    var message = message.replace(/"/g, "\\\"");   
    console.log("Incoming message: " + message + " for topic: " + topic);
    var splitTopic = topic.split("/");
    if(splitTopic[4] == "config"){
      var zone = splitTopic[2];
      var deviceName = splitTopic[3];
      var command = splitTopic[6];
      var configKey = "/home/" + zone + "/" + deviceName + "/state/set:" + command;
      console.log("Adding configuration: " + configKey);
      //Message contains the script/executable command
      configuration[configKey] = message;
    }else{
      executeShellCommand(topic,message);
    }
  });
});

function executeShellCommand(topic,message){
    var key = topic+":"+message;
    console.log("DEBUG: " + key);
    var command = configuration[key];
    console.log("Executing command: " + command + " for topic: " + topic);
    exec(command, puts);
    sleep.sleep(1);//sleep for 1 seconds
}

function puts(error, stdout, stderr) { 
        util.puts(stdout); 
        console.warn("Executing Done");
}
