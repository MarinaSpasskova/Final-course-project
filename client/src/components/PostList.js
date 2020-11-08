import React from "react";
import {Link} from 'react-router-dom'
import Moment from 'moment'


export const PostList = ({posts, author = null, avatar = null}) => {
    if (!posts.items) {
        return <p>Sorry, there is no posts yet!</p>;
    }
    return (
        <ul className="collection">
            {posts.items.map((post, index) => {
                let post_author = author || post.author
                let post_avatar = avatar || post_author.avatar
                return (
                    <li className="collection-item avatar" key={post.id}>
                        <img src={post_avatar} alt="avatar" className="circle"></img>
                        <span>
                            <Link to={`/user/${post_author.id}`}> {post_author.username} </Link>
                                at {Moment(post.timestamp).format('DD MMMM YYYY, H:mm')}
                        </span>
                        <p> said: {post.body}
                        </p>
                        <p> {post.userId}</p>
                    </li>
                );
            })}
        </ul>
    );
}