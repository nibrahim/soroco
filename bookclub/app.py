from flask import Flask
from flask import jsonify


app = Flask(__name__)
app.config.from_object('config')


@app.route('/')
def index():
    return jsonify(dict(status='all good', data={}))
