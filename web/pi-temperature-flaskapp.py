#!/bin/python


from flask import Flask, render_template
import sqlite3
import time


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def make_json():
    connection = sqlite3.connect("temperature_grabber.sqlite3")
    connection.row_factory = dict_factory
    cursor = connection.cursor()

    cursor.execute("select * from temperature")
    results  = cursor.fetchall()
    return results

app = Flask(__name__)

@app.route('/js/<path>', methods=['GET'])
def js(path):
    print path
    return(render_template("js/%s" % (path)))

@app.route('/', methods=['GET'])    
def index():
    return(render_template("temperature.html"));    


#@app.route('/get_time_data', methods=['POST'])
#def get_time_data():
