# mqtt-exec

A simple MQTT agent based on node.js that subscribes to a given list of MQTT topics
on the specified broker and executes a given shell script/command whenever
a message arrives. It can also be used in combination with an Home Automation Framework like [Home.Pi](https://github.com/denschu/home.pi)

## Setup

	npm install --production

## Start Broker

	mosquitto
	
## Create Configuration "config.json"

	{
	  "/home/devices/wohnzimmer/stehlampe_wand/value/set":  { "true"  : "sudo /home/pi/rcswitch-pi/sendRev B 1 1", 
	                                                          "false" : "sudo /home/pi/rcswitch-pi/sendRev B 1 0" },
	  "/home/devices/wohnzimmer/lampe_gruen/value/set":     { "true"  : "sudo /home/pi/rcswitch-pi/sendRev B 3 1", 
	                                                          "false" : "sudo /home/pi/rcswitch-pi/sendRev B 3 0"}                     
	}
	
##Start Binding with Topics to subscribe

	node mqtt-exec -t home/devices/light1/state/set,home/devices/light2/state/set,home/devices/light3/state/set,home/devices/light4/state/set,home/devices/light5/state/set

or

	nohup node mqtt-exec -t home/devices/light1/state/set,home/devices/light2/state/set,home/devices/light3/state/set,home/devices/light4/state/set,home/devices/light5/state/set > /home/pi/logs/mqtt-exec.log &

or

	/opt/node/bin/forever start /home/pi/mqtt-exec/mqtt-exec.js -t home/devices/light1/state/set,home/devices/light2/state/set,home/devices/light3/state/set,home/devices/light4/state/set,home/devices/light5/state/set

## Execute command

	mosquitto_pub -d -t home/devices/light1/state/set -m "on"

## dependencies

* [mqtt.js](http://github.com/adamvr/MQTT.js)
* [optimist](http://github.com/substack/node-optimist)


