import React from "react";
import { Post } from "../pages/Post";


export const PostList = ( { posts } ) => {
    console.log("postList 1")
    console.log(posts.items);
    console.log(posts);
    console.log(typeof(posts))

    if (!posts.items) {
        return <p>Sorry, there is no posts yet.!</p>;
    }
    console.log("postList 2")
    return (
        <ul className="collection">
            {posts.items.map((post, index) => {
                return (
                    <li className="collection-item avatar">
                        <img src="https://www.gravatar.com/avatar/b85953170a930ef7511b8d7de3de58ef?d=identicon&amp;s=100" alt="" className="circle"></img>
                        <span>
                            {post.username} {post.timestamp}
                        </span>
                    <p>{post.body}
                    </p>
                    </li>
                );
            })}
        </ul>
    );
}