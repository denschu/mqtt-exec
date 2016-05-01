#!/usr/bin/env node

var mqtt = require('mqtt')
  , optimist = require('optimist')
  , util = require('util')
  , exec = require('child_process').exec
  , sleep = require('sleep')
  , url = require('url')
  , fs = require('fs')
  , log4js = require('log4js')
  , logger = log4js.getLogger();

var argv = optimist
  .usage('mqtt-exec: receive shell commands on MQTT messages\n \
    Usage: mqtt-exec -h <broker-url>')
  .options('h', {
      describe: 'broker url'
    , default: 'mqtt://localhost:1883'
    , alias: 'broker-url'
  })
  .options('c', {
      describe: 'configFile'
    , default: __dirname + '/config.json'
    , alias: 'configFile'
  })
  .argv;

// Parse url
var mqtt_url = url.parse(process.env.MQTT_BROKER_URL || argv.h);
var auth = (mqtt_url.auth || ':').split(':');

//var configuration = JSON.parse(fs.readFileSync(__dirname+'/config.json').toString());
var configuration = {};
var topics = [];

//Loading config
if (argv.c || argv.configFile) {
    var configFile = argv.c || argv.configFile;
    logger.info("Reading configuration from %s", configFile);
    configuration = JSON.parse(fs.readFileSync(configFile).toString());
}
for(var key in configuration){
    var topic = key;
    topics.push(topic);
}

//Creating the MQTT Client
logger.info("Creating client for: " + mqtt_url.hostname);
var c = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});

c.on('connect', function() {
  logger.info("Subscribe to topics...: " + topics);
  c.subscribe(topics);
  c.on('message', function(topic, message) {
    topic = topic.replace(/"/g, "\\\"");
    var message = message.toString().replace(/"/g, "\\\"");   
    executeShellCommand(topic,message);
    var topic_outgoing = topic.replace(/\/set/g,'');
    console.log("Reportig value back to topic: " + topic_outgoing);
    c.publish(topic_outgoing,message,{retain: true});
  });
});

function executeShellCommand(topic,payload){
    var commands = configuration[topic];
    var command = commands[payload];
    logger.info("Executing command: " + command + " for topic: " + topic + " and payload: " + payload);
    exec(command, puts);
    sleep.sleep(1);//sleep for 1 seconds
}

function puts(error, stdout, stderr) { 
        util.puts(stdout); 
        logger.info("Executing Done");
}
