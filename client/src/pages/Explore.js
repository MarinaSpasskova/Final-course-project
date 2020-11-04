import React from "react";
import {useState, useCallback, useEffect, useContext} from "react";
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {PostList} from "../components/PostList";

export const Explore = () => {

    const [posts, setPosts] = useState([])
    const {loading, request} = useHttp()
    const {token, username} = useContext(AuthContext)

    const fetchPosts = useCallback(async () => {
        try {
            const fetched = await request(`/api/posts`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setPosts(fetched);
        } catch (e) {
        }
    }, [token, request]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <div>
            <h3>Hi, {username}!</h3>
            <p className="par">There are you can see all posts</p>
            <>{!loading && <PostList posts={posts}/>}</>
        </div>
    )
}