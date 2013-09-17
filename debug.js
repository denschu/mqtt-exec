#!/usr/bin/env node

var fs = require('fs');

var myMap = {};
var configs = JSON.parse(fs.readFileSync(__dirname+'/config.json').toString());
        configs.forEach(function (config) { 
          console.log('Loading configuration for topic: ' + config.topic + " -> " + config.command);
          myMap[config.topic] = config.command;
        });
        console.log('Finished loading configuration.');


console.log('Debug: ' + myMap["home/test:on"]);
