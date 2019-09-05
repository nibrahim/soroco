from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, 
                          BadSignature, SignatureExpired)

def generate_auth_token(app, user, expiration = 600):
    s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
    return s.dumps({ 'id': user })

def verify_auth_token(app, token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except SignatureExpired:
        return None # valid token, but expired
    except BadSignature:
        return None # invalid token
    user = data['id']
    return user
