from flask import jsonify, g
from app import db
from app.api import bp
from app.api.auth import basic_auth, token_auth


@bp.route('/auth/login', methods=['POST'])
@basic_auth.login_required
def get_token():
    token = g.current_user.get_token()
    db.session.commit()
    return {'token': token,
            'userId': g.current_user.id,
            'username': g.current_user.username}


@bp.route('/tokens', methods=['DELETE'])
@token_auth.login_required
def revoke_token():
    g.current_user.revoke_token()
    db.session.commit()
    return '', 204