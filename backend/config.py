# backend/config.py

import os

class Config:
    SECRET_KEY = "secret-key"  # 🔒 Change in prod
    SQLALCHEMY_DATABASE_URI = "sqlite:///app.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "super-secret-jwt-key"
