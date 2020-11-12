from flask import request, current_app, g
from app import db
from app.api import bp
from app.api.errors import bad_request
from app.api.token_auth import token_auth
from app.models import Post


@bp.route('/posts/<int:id>', methods=['GET'])
def get_post(id):
    return Post.query.get_or_404(id).to_dict()


@bp.route('/posts', methods=['GET'])
def get_posts():
    print("Get Posts")
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', current_app.config['POST_PER_PAGE'], type=int), 50)
    data = Post.to_collection_dict(Post.query.order_by(Post.timestamp.desc()), page, per_page, 'api.get_posts')
    return data


@bp.route('/posts', methods=['POST'])
@token_auth.login_required
def create_post():
    data = request.get_json() or {}
    if 'body' not in data:
        return bad_request("Post doesn't have data field")
    body = str(data['body'])
    if not (1 < len(str(body)) < 140):
        return bad_request("Post should have body length between 1 and 140 symbols")
    post = Post(body=body, author=g.current_user)
    db.session.commit()
    return post.to_dict()
