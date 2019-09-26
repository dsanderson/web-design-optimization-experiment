import os
import subprocess

os.environ["LC_ALL"] = "C.UTF-8"
os.environ["LANG"] = "C.UTF-8"
os.environ["FLASK_APP"] = "server.py"

p = subprocess.call(["python3", "-m", "flask", "run", "--port", "5001", "--host", "0.0.0.0"])