from flask import Flask, jsonify
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
app.config.from_object('config')

auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(username, password):
    if username == 'noufal' and password == 'secret':
        return True
    else:
        return False

@app.route('/')
@auth.login_required
def index():
    return jsonify(dict(status='all good', data={}))
