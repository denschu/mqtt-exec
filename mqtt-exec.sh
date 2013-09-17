#! /bin/sh
# /etc/init.d/homepi

### BEGIN INIT INFO
# Provides:          homepi
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Starts homepi at boot
# Description:       A script which will start / stop homepi at boot / shutdown.
### END INIT INFO

# If you want a command to always run, put it here

# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting mqtt-exec"
    # run application you want to start
    NODE_JS_HOME="/opt/node"
    PATH="$PATH:$NODE_JS_HOME/bin"
    export PATH
    /opt/node/bin/forever start /home/pi/mqtt-exec/mqtt-exec.js -t home/devices/light1/state/set,home/devices/light2/state/set,home/devices/light3/state/set,home/devices/light4/state/set,home/devices/light5/state/set
    ;;
  stop)
    echo "Stopping homepi"
    # kill application you want to stop
    NODE_JS_HOME="/opt/node"
    PATH="$PATH:$NODE_JS_HOME/bin"
    export PATH
    /opt/node/bin/forever stop mqtt-exec.js
    ;;
  *)
    echo "Usage: /etc/init.d/homepi {start|stop}"
    exit 1
    ;;
esac

exit 0
