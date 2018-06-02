#!/bin/bash

if [ -z ${DB} ] ; then
    echo -e "No database path specified !\nPlease set DB env variable to point to the sqlite file\nThis file must be aside the flask backend"
    exit 255
fi

GRAB_DELAY=10

# Create DB if it doesn't exist
[ ! -e "${DB}" ] && sqlite3 ${DB} "create table temperature (ts DATETIME, t1 INT, t2 INT);"

# Fill it
while ((1)) ; do
        declare -a temp
        i=0
        for file in /sys/bus/w1/devices/28-*/w1_slave ; do
                temp[i]=$(($(cat ${file}|grep 't='|cut -f2 -d'=')))
                i=$((i+1))
        done;
        sqlite3 ${DB} "INSERT INTO temperature values(strftime(\"%s\",\"now\"),\"${temp[0]}\",\"${temp[1]}\")"
        sleep ${GRAB_DELAY}
done

