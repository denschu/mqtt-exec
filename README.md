# mqtt-exec

A simple agent that subscribes to a given list of mqtt topics
on the specified broker and executes a given command whenever
a message arrives.

## Setup

	npm install

## Start Broker

	mosquitto
	
## Publish Configuration

	mosquitto_pub -d -r -t /home/livingroom/light1/config/command/on  -m "echo turnOn"
	mosquitto_pub -d -r -t /home/livingroom/light1/config/command/off  -m "echo turnOff"

##Start Binding

	node mqtt-exec -t /home/livingroom/light1/state/set,/home/livingroom/light2/state/set

## Publish command

	mosquitto_pub -d -t /home/livingroom/light1/state/set -m "on"

## dependencies

* [mqtt.js](http://github.com/adamvr/MQTT.js)
* [optimist](http://github.com/substack/node-optimist)

