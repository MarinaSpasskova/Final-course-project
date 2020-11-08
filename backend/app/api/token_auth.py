from datetime import datetime
from flask import g
from flask_httpauth import HTTPTokenAuth
from app import db
from app.models import User
from app.api.errors import error_response

token_auth = HTTPTokenAuth()


@token_auth.verify_token
def verify_token(token):
    current_user = User.verify_auth_token(token) if token else None
    verified = False
    if current_user is not None:
        current_user.last_seen = datetime.utcnow()
        g.current_user = current_user
        db.session.commit()
        verified = True
    return verified


@token_auth.error_handler
def token_auth_error():
    return error_response(401)
