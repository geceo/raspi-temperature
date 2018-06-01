#!/bin/python


from flask import Flask, render_template, make_response, request
import sqlite3
import json
from datetime import datetime


def row_factory(cursor, row):
	d = dict()
	for i in range(len(cursor.description)):
		(k,v) = (cursor.description[i][0], row[i])
		d[k] = v
	return d

def make_json(start, end):
    print "make_json: in(%s, %s)" % (start,end)
    connection = sqlite3.connect("temperature_grabber.sqlite3")
    connection.row_factory = row_factory
    cursor = connection.cursor()
    cursor.execute("select * from temperature where ts>\"%s\" and ts<\"%s\"" % (start, end ))
    # XXX: Print summary about result (count, ...)
    results  = cursor.fetchall()
    print "make_json(): results: %d" % (len(results))
    return json.dumps(results)

app = Flask(__name__)

@app.route('/static/<path>', methods=['GET'])
def my_static(path):
    # Initialize response
    f = open("statics/%s" % (path))
    r = make_response(f.read())
    # Check and set mime type
    r.headers['Content-type'] = "text/html"
    if path[-3:] == '.js':
	r.headers['Content-type'] = "application/javascript"
    elif path[-4:] == '.css':
	r.headers['Content-type'] = "text/css"
    return(r)

@app.route('/', methods=['GET'])    
def index():
    return(render_template("temperature.html"));    


@app.route('/get_data', methods=['POST'])
def get_data():
    args = request.get_json(force=True)
    dataset = make_json(args['start'], args['end'])
    r = make_response(str(dataset))
    r.headers['Content-type'] = "application/json"
    return(r)
