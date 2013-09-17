#! /bin/sh

#Publish configuration topics
mosquitto_pub -d -r -t home/devices/light1/config/name -m "Lamp 1"
mosquitto_pub -d -r -t home/devices/light1/config/type -m "on_off"
mosquitto_pub -d -r -t home/devices/light1/config/command/on  -m "sudo /home/pi/rcswitch-pi/sendRev B 1 1"
mosquitto_pub -d -r -t home/devices/light1/config/command/off  -m "sudo /home/pi/rcswitch-pi/sendRev B 1 0"

mosquitto_pub -d -r -t home/devices/light2/config/name -m "Lamp 2"
mosquitto_pub -d -r -t home/devices/light2/config/type -m "on_off"
mosquitto_pub -d -r -t home/devices/light2/config/command/on  -m "sudo /home/pi/rcswitch-pi/sendRev B 2 1"
mosquitto_pub -d -r -t home/devices/light2/config/command/off  -m "sudo /home/pi/rcswitch-pi/sendRev B 2 0"

mosquitto_pub -d -r -t home/devices/light3/config/name -m "Lamp 3"
mosquitto_pub -d -r -t home/devices/light3/config/type -m "on_off"
mosquitto_pub -d -r -t home/devices/light3/config/command/on  -m "sudo /home/pi/rcswitch-pi/sendRev B 3 1"
mosquitto_pub -d -r -t home/devices/light3/config/command/off  -m "sudo /home/pi/rcswitch-pi/sendRev B 3 0"

mosquitto_pub -d -r -t home/devices/light4/config/name -m "Lamp 4"
mosquitto_pub -d -r -t home/devices/light4/config/type -m "on_off"
mosquitto_pub -d -r -t home/devices/light4/config/command/on  -m "sudo /home/pi/rcswitch-pi/send 01110 1 1"
mosquitto_pub -d -r -t home/devices/light4/config/command/off  -m "sudo /home/pi/rcswitch-pi/send 01110 1 0"

mosquitto_pub -d -r -t home/devices/light5/config/name -m "Lamp 5"
mosquitto_pub -d -r -t home/devices/light5/config/type -m "on_off"
mosquitto_pub -d -r -t home/devices/light5/config/command/on  -m "sudo /home/pi/rcswitch-pi/send 01110 2 1"
mosquitto_pub -d -r -t home/devices/light5/config/command/off  -m "sudo /home/pi/rcswitch-pi/send 01110 2 0"