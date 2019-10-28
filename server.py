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
import desal
import numpy as np

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
    print(state) #TODO log state properly here
    
    designs = []

    if state["type"] == "#optimum":
        res = desal.optimum(state["weights"]["Environmental Risk"],
                            state["weights"]["Capacity"],
                            state["weights"]["Cost"])
        designs.append({"Size":res["size"], 
                        "Inlet Size":res["inlet_hole_size"], 
                        "Environmental Risk":res["danger"], 
                        "Capacity":res["capacity"], 
                        "Cost":res["cost"]})                    
    elif state["type"] == "#pareto":
        ranges = [[],[],[]]
        ranges[int(state["paretoSelected"])] = [state["pareto"][int(state["paretoSelected"])]]
        ress = desal.pareto(ranges[0], ranges[1], ranges[2])
        for res in ress:
            designs.append({"Size":res["size"], 
                        "Inlet Size":res["inlet_hole_size"], 
                        "Environmental Risk":res["danger"], 
                        "Capacity":res["capacity"], 
                        "Cost":res["cost"]})
    elif state["type"] == "#igrid":
        sizes = np.linspace(state["grid"]["Size"]["value"][0], state["grid"]["Size"]["value"][1], state["grid"]["Size"]["points"])
        inlet_sizes = np.linspace(state["grid"]["Inlet Size"]["value"][0], state["grid"]["Inlet Size"]["value"][1], state["grid"]["Inlet Size"]["points"])
        ress = desal.grid(inlet_sizes, sizes)
        print(ress)
        for res in ress:
            designs.append({"Size":res["size"], 
                        "Inlet Size":res["inlet_hole_size"], 
                        "Environmental Risk":res["danger"], 
                        "Capacity":res["capacity"], 
                        "Cost":res["cost"]})  
    elif state["type"] == "#direct":
        res = desal.direct(state["direct"]["Inlet Size"], state["direct"]["Size"])
        designs.append({"Size":res["size"], 
                        "Inlet Size":res["inlet_hole_size"], 
                        "Environmental Risk":res["danger"], 
                        "Capacity":res["capacity"], 
                        "Cost":res["cost"]})  
    
    #n_designs = 5
    #designs = []
    #for i in range(0, n_designs):
    #    designs.append({"Width":random.random(), 
    #                    "Height":random.random(), 
    #                    "Operating Cost":random.random(), 
    #                    "Throughput":random.random(), 
    #                    "Capital Cost":random.random()})
    print(designs)
    return json.dumps(designs)