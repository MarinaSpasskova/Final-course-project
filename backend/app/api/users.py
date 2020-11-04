from flask import request, url_for, jsonify, current_app
from app import db
from app.api import bp
from app.api.errors import bad_request
from app.models import User, Post
from app.auth.email import send_password_reset_email


@bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    return User.query.get_or_404(id).to_dict()


@bp.route('/users', methods=['GET'])
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = User.to_collection_dict(User.query, page, per_page, 'api.get_users')
    return data


@bp.route('/users/<int:id>/followers', methods=['GET'])
def get_followers(id):
    user = User.query.get_or_404(id)
    print(f"Get followers for user {id}")
    page = request.args.get('page', 1, type=int)
    print(f"Get followers for user {id} page : {page}")
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    print(f"Get followers for user {id} page : {page} per page: {per_page}")
    data = User.to_collection_dict(user.followers, page, per_page,
                                   'api.get_followers', id=id)
    return data


@bp.route('/users/<int:id>/followed', methods=['GET'])
def get_followed(id):
    user = User.query.get_or_404(id)
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = User.to_collection_dict(user.followed, page, per_page,
                                   'api.get_followed', id=id)
    return data


@bp.route('/users/<int:id>/posts', methods=['GET'])
def get_user_posts(id):
    user = User.query.get_or_404(id)
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)

    data = Post.to_collection_dict(user.posts.order_by(Post.timestamp.desc()), page, per_page,
                                   'api.get_user_posts', id=id)
    return data


@bp.route('/users/<int:id>/followed_posts', methods=['GET'])
def get_user_followed_posts(id):
    user = User.query.get_or_404(id)
    print(user)
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', current_app.config['POST_PER_PAGE'], type=int), 100)

    data = Post.to_collection_dict(user.followed_posts(), page, per_page, 'api.get_user_followed_posts',
                                   id=id)
    return data


@bp.route('/users', methods=['POST'])
@bp.route('/auth/register', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return bad_request('must include username, email and password fields')
    if User.query.filter_by(username=data['username']).first():
        return bad_request('please use a different username')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('please use a different email address')
    user = User()
    user.from_dict(data, new_user=True)
    db.session.add(user)
    db.session.commit()
    response = jsonify(user.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('api.get_user', id=user.id)
    return response


@bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json() or {}
    if 'username' in data and data['username'] != user.username and \
            User.query.filter_by(username=data['username']).first():
        return bad_request('please use a different username')
    if 'email' in data and data['email'] != user.email and \
            User.query.filter_by(email=data['email']).first():
        return bad_request('please use a different email address')
    user.from_dict(data, new_user=False)
    db.session.commit()
    return user.to_dict()


@bp.route('/auth/reset_password', methods=['POST'])
def reset_password():
    data = request.get_json() or {}
    if 'email' in data:
        user = User.query.filter_by(email=data['email']).first()
        if user:
            send_password_reset_email(user)
    return {}
