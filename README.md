# mqtt-exec

A simple MQTT agent based on node.js that subscribes to a given list of MQTT topics
on the specified broker and executes a given shell script/command whenever
a message arrives.

## Setup

	npm install --production

## Start Broker

	mosquitto
	
## Publish Configuration

	mosquitto_pub -d -r -t home/devices/light1/config/command/on  -m "echo turnOn"
	mosquitto_pub -d -r -t home/devices/light1/config/command/off  -m "echo turnOff"
	
##Start Binding with Topics to subscribe

	node mqtt-exec -t home/devices/light1/state/set,home/devices/light2/state/set,home/devices/light3/state/set,home/devices/light4/state/set,home/devices/light5/state/set

	nohup node mqtt-exec -t home/devices/light1/state/set,home/devices/light2/state/set,home/devices/light3/state/set,home/devices/light4/state/set,home/devices/light5/state/set > /home/pi/logs/mqtt-exec.log &

	/opt/node/bin/forever start /home/pi/mqtt-exec/mqtt-exec.js -t home/devices/light1/state/set,home/devices/light2/state/set,home/devices/light3/state/set,home/devices/light4/state/set,home/devices/light5/state/set

## Execute command

	mosquitto_pub -d -t home/devices/light1/state/set -m "on"

## dependencies

* [mqtt.js](http://github.com/adamvr/MQTT.js)
* [optimist](http://github.com/substack/node-optimist)

