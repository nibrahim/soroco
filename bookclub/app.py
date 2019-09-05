from flask import Flask, jsonify, g, request, abort, redirect, url_for
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
app.config.from_object('config')
auth_provider = HTTPBasicAuth()

from . import auth
from . import bookclub
from . import exceptions
from . import model

def resp(status, data=None):
    return jsonify(dict(status = status,
                        data = data if data else {}))

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
    return resp('logged in', { 'token': token.decode('ascii') })

@app.route('/api/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None:
        return resp("username is not provided"), 400
    if password is None:
        return resp("password is not provided"), 400
    try:
        uid = bookclub.add_new_user(username, password)
        return resp("registered", dict(username = username)), 201, {'Location': url_for('user', id_ = uid)}
    except exceptions.UserAlreadyExists:
        return resp(status="username {} is already exists".format(username)), 400
    
@app.route('/api/user/<int:id_>')
def user(id_):
    user = model.db.session.query(model.User).filter(model.User.id == id_).first()
    if user:
        return resp("user retrieved", dict(id = user.id,
                                           username = user.name))
    else:
        return resp("user not found"), 404
        
        

@app.route('/')
@auth_provider.login_required
def index():
    return jsonify(dict(status='all good', data=dict(user=g.user)))
