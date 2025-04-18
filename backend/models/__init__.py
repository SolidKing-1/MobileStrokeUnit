from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Single shared instances
db = SQLAlchemy()
bcrypt = Bcrypt()