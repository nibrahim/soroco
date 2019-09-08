from . import model
from . import exceptions


def add_new_user(username, password):
    if model.db.session.query(model.User).filter(model.User.name  == username).first():
        raise exceptions.UserAlreadyExists(username)

    user = model.User(name = username)
    user.hash_password(password)
    model.db.session.add(user)
    model.db.session.commit()
    return user.id

    
    
    
    
    
