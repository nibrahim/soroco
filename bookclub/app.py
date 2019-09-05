from flask import Flask, jsonify, g
from flask_httpauth import HTTPBasicAuth

from . import auth

app = Flask(__name__)
app.config.from_object('config')
auth_provider = HTTPBasicAuth()

@auth_provider.verify_password
def verify_password(username_or_token, password):
    if auth.verify_auth_token(app, username_or_token):
        # token approval
        g.user = 'noufal'
        return True
    if username_or_token == 'noufal' and password == 'secret':
        # Try username/password
        g.user = 'noufal'
        return True
    return False

@app.route('/api/token')
@auth_provider.login_required
def get_auth_token():
    token = auth.generate_auth_token(app, g.user)
    return jsonify({ 'token': token.decode('ascii') })


@app.route('/')
@auth_provider.login_required
def index():
    return jsonify(dict(status='all good', data=dict(user=g.user)))
