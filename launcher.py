import os
import subprocess
import desal

desal.optimum(10.0,10.0,20.0) #finish GPKIT installation, and keep errors from cluttering server log

os.environ["LC_ALL"] = "C.UTF-8"
os.environ["LANG"] = "C.UTF-8"
os.environ["FLASK_APP"] = "server.py"

p = subprocess.call(["python3", "-m", "flask", "run", "--port", "5001", "--host", "0.0.0.0"])