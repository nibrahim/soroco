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

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def get_all_links():
    links = []
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append(url)
    return links


@auth_provider.verify_password
def verify_password(username_or_token, password):
    if auth.verify_auth_token(app, username_or_token):
        return True
    user = model.db.session.query(model.User).filter(model.User.name  == username_or_token).first()
    if not user:
        return False
    if user.verify_password(password):
        g.user = user
        return True
    else:
        return False

@app.route('/api/token')
@auth_provider.login_required
def get_auth_token():
    token = auth.generate_auth_token(app, g.user.id)
    return resp('logged in', { 'token': token.decode('ascii') })

@app.route('/api/user', methods=['POST'])
def register():
    username = request.json and request.json.get('username')
    password = request.json and request.json.get('password')
    if username is None:
        return resp("username is not provided"), 400
    if password is None:
        return resp("password is not provided"), 400
    try:
        uid = bookclub.add_new_user(username, password)
        return resp("registered", dict(username = username)), 201, {'Location': url_for('user', id_ = uid)}
    except exceptions.UserAlreadyExists:
        return resp(status="username {} is already exists".format(username)), 400
    

@app.route('/api/user/<int:id_>', methods=['GET'])
@auth_provider.login_required
def user(id_):
    user = model.db.session.query(model.User).filter(model.User.id == id_).first()
    if user:
        return resp("user retrieved", dict(id = user.id,
                                           username = user.name))
    else:
        return resp("user not found"), 404

@app.route('/api/user/<int:uid>/shelf', methods=['GET'])
@auth_provider.login_required
def user_shelves(uid):
    user = model.db.session.query(model.User).filter(model.User.id == uid).first()
    shelves = model.db.session.query(model.Shelf).filter(model.Shelf.user == user).all()
    return resp('shelves', dict(shelves = [dict(id = s.id, name = s.name) for s in shelves]))

@app.route('/api/user/<int:uid>/shelf', methods=['POST'])
@auth_provider.login_required
def add_shelf(uid):
    user = model.db.session.query(model.User).filter(model.User.id == uid).first()
    if user:
        name = request.values.get('name')
        shelf = model.Shelf(user = user, name = name)
        model.db.session.add(shelf)
    model.db.session.commit()
    return resp("shelf created", dict(name = name)), 201, {'Location': url_for('user_shelf', uid = user.id, shelf_id = shelf.id)}


@app.route('/api/user/<int:uid>/shelf/<int:shelf_id>', methods=['GET'])
@auth_provider.login_required
def user_shelf(uid, shelf_id):
    user = model.db.session.query(model.User).filter(model.User.id == uid).first()
    print (shelf_id)
    shelf = model.db.session.query(model.Shelf).filter(model.Shelf.user == user, model.Shelf.id == shelf_id).first()
    if shelf:
        return resp('shelves', dict(shelf = dict(id = shelf.id, name = shelf.name)))
    else:
        return resp('no shelf with id {}'.format(shelf_id)), 404

@app.route('/api/book/<string:slug>', methods=['GET'])
@auth_provider.login_required
def book(slug):
    book = model.db.session.query(model.Book).filter(model.Book.slug == slug).first()
    if book:
        return resp("book retrieved", dict(slug = book.slug,
                                           name = book.name,
                                           author = book.author,
                                           brief = book.brief))
    else:
        return resp("book not found"), 404


@app.route('/api/book/', methods=['POST'])
@auth_provider.login_required
def add_book():
    name = request.values.get('name')
    author = request.values.get('author')
    brief = request.values.get('brief','')
    if name is None:
        return resp("name is not provided"), 400    
    if author is None:
        return resp("author is not provided"), 400    
    book = model.Book(name = name,
                      author = author,
                      brief = brief)
    book.create_slug()
    model.db.session.add(book)
    model.db.session.commit()
    ret = dict(slug = book.slug, name = book.name)
    return resp("book created", ret), 201, {'Location': url_for('book', slug = book.slug)}


    
    
    

@app.route("/", methods=['GET'])
def index():
    return resp('available urls', dict(links = get_all_links()))

