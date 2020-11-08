from flask import request, current_app
from app import db
from app.api import bp
from app.api.errors import bad_request
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
