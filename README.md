# mqtt-exec

A simple MQTT agent based on node.js that subscribes to a given list of MQTT topics
on the specified broker and executes a given shell script/command whenever
a message arrives. It can also be used in combination with a Home Automation Framework like [Home.Pi](https://github.com/denschu/home.pi)

## Setup

	npm install mqtt-exec -g

## Start broker

Start the MQTT broker with

	mosquitto
	
## Configuration

Create/Modify configuration "config.json"

	{
	  "/home/devices/livingroom/ligh1/value/set":  { "true"  : "sudo /home/pi/rcswitch-pi/sendRev B 1 1", 
	                                                 "false" : "sudo /home/pi/rcswitch-pi/sendRev B 1 0" },
	  "/home/devices/livingroom/ligh2/value/set":  { "true"  : "sudo /home/pi/rcswitch-pi/sendRev B 3 1", 
	                                                 "false" : "sudo /home/pi/rcswitch-pi/sendRev B 3 0"}                     
	}
	
## Start application

Start application with the path to the config file and the URL of the MQTT broker

	mqtt-exec -c /path/to/config.json -h mqtt://localhost:1883

You can also set the MQTT broker url as environment variable

	export MQTT_BROKER_URL=mqtt://localhost:1883

## Simulate the execution of a command

	mosquitto_pub -d -t home/devices/light1/value/set -m "true"


