# models/__init__.py
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

# Import models so they're registered with SQLAlchemy
from .patient import Patient
from .user import User
from .consultation import Consultation