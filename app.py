from flask import Flask, render_template
from flask_cors import CORS
from flask_sock import Sock

app = Flask(__name__, template_folder="static")
CORS(app)
app.config["SOCK_SERVER_OPTIONS"] = {"ping_interval": 25}
sock = Sock(app)


@app.route("/")
def main_page():
    nodes = [
        {"ip_address": "10.0.0.1", "gpu_memory": "16"},
        {"ip_address": "10.0.0.2", "gpu_memory": "16"},
        {"ip_address": "10.0.0.3", "gpu_memory": "32"},
        ]
    data = {"required": 48, "nodes": nodes}
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)