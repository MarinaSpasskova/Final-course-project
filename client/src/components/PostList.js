import React, {useContext} from "react";
import { Post } from "../pages/Post";
import { User } from "../pages/User";
import {AuthContext} from "../context/AuthContext";
import Moment from 'moment'


export const PostList = ( { posts } ) => {
    console.log("postList 1")
    console.log(posts.items);
    console.log(posts);
    console.log(typeof(posts))

    if (!posts.items) {
        return <p>Sorry, there is no posts yet!</p>;
    }
    console.log("postList 2")
    return (
        <ul className="collection">
            {posts.items.map((post, index) => {
                return (
                    <li className="collection-item avatar">
                        <img src="https://www.gravatar.com/avatar/b85953170a930ef7511b8d7de3de58ef?d=identicon&amp;s=100" alt="" className="circle"></img>
                        <span>
                            User with id
                            <a  href="/user"> {post.user_id} </a>
                                at  {Moment(post.timestamp).format('DD MMMM YYYY, h:mm')}
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