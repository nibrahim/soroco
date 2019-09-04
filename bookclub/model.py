# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker, relationship
from flask_sqlalchemy import SQLAlchemy

from .app import app

db = SQLAlchemy(app)

class BookClubBase:
    def __repr__(self):
        name = self.name if hasattr(self, "name") else self.id
        return "<{}(name='{}'...)>".format(self.__class__.__name__, name)

class User(db.Model):
    __tablename__ = "bookclub_user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    pwhash = db.Column(db.String(256))




    
