# Limitations

**/!\ This is a quick and dirty project which only purpose is to get measurement for my personal use. It's probably dirty, full of bugs and vulnerabilities. Feel free to fix ! /!\**

Currently:

* No launch script
* Frontend code is harcoded to 2 sensors.
* Labels of graph hardcoded to t1 and t2.
* Probably some security hole around the timestamp passed from the webapp to the flask app ...


# Requirements

To run this, you need:
* python / python-flask / python-sqlite3
* Fully configured temperature sensors over Dallas 1-wire bus. This sensors are usually accessed over /sys/bus/w1/devices/28-<device id> 

# Installation

As previously said it's a quick&dirty project... There's no installation process.

Simply:

1. git clone http://github.com/geceo/raspi-temperature.git <your install dir>
2. cd <your install dir>
3. (optionnal step) Launch _screen_ utils so that the daemon isn't killed if you disconnect.
4. export DB=<your install dir>/web/temperature_grabber.sqlite3
5. Launch the database feeder: ./daemon/pi-temperature-daemon.sh
6. Launch the Flas backend: FLASK_APP=pi-temperature-flaskapp.py python -m flask run --ip 0.0.0.0 --port:8000
