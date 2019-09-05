# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy

from passlib.apps import custom_app_context as pwd_context

from .app import app

db = SQLAlchemy(app)

class BookClubBase:
    def __repr__(self):
        name = self.name if hasattr(self, "name") else self.id
        return "<{}(name='{}'...)>".format(self.__class__.__name__, name)

class User(db.Model, BookClubBase):
    __tablename__ = "bookclub_user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    pwhash = db.Column(db.String(256))
    shelves = relationship('Shelf', backref='user')
    reviews = relationship('Review', backref='user')

    def hash_password(self, password):
        self.pwhash = pwd_context.encrypt(password)
    
    def verify_password(self, password):
        return pwd_context.verify(password, self.pwhash)

class Shelf(db.Model, BookClubBase):
    __tablename__ = "bookclub_shelf"
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('bookclub_user.id'))
    name = db.Column(db.String(50))
    books = relationship('Book', backref='shelf')

class Book(db.Model, BookClubBase):
    __tablename__ = "bookclub_book"
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(20), unique=True)
    shelf_id = db.Column(db.Integer, db.ForeignKey('bookclub_shelf.id'))
    name = db.Column(db.String(50))
    author = db.Column(db.String(70))
    brief = db.Column(db.String(300))
    
class Review(db.Model, BookClubBase):
    __tablename__ = "bookclub_review"
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.Date())
    user_id = db.Column(db.Integer, db.ForeignKey('bookclub_user.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('bookclub_book.id'))
    __table_args__ = (db.UniqueConstraint('user_id', 'book_id', name = '_user_book'),)
    
