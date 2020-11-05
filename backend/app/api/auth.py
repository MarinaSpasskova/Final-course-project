from flask import request
from app.api import bp
from app.models import User
from app.api.errors import error_response


@bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    if 'username' not in data or 'password' not in data:
        return error_response(401)
    username = data['username']
    password = data['password']
    if not username or not password:
        return error_response(401)
    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        return error_response(401)
    # Generate token
    token = user.get_auth_token()
    return {'token': token,
            'userId': user.id,
            'username': user.username}
