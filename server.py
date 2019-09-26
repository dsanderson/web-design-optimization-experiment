from flask import Flask
from flask import request, redirect, url_for
from flask import render_template
from flask import send_from_directory
from flask import session
import os
import time
import json
import copy
import sys
import random

app = Flask(__name__, static_folder='build/static/js')
app.secret_key = b'THIS IS A BAD KEY'

@app.route('/')
def get_index():
    return send_from_directory('build', 'index.html')

#@app.route('/static/<path:path>')
#def send_static(path):
#    return send_from_directory('static', path)

@app.route('/static/js/<path:path>')
def send_js(path):
    print(app.static_folder)
    print(path)
    print(os.listdir(app.static_folder))
    return send_from_directory(app.static_folder, path)

@app.route('/designs', methods=['PUT'])
def get_designs():
    state = request.get_json()
    print(state)
    n_designs = 5
    designs = []
    for i in range(0, n_designs):
        designs.append({"Width":random.random(), 
                        "Height":random.random(), 
                        "Operating Cost":random.random(), 
                        "Throughput":random.random(), 
                        "Capital Cost":random.random()})
    return json.dumps(designs)