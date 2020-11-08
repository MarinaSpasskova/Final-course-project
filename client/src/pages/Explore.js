import React from "react";
import {useState, useCallback, useEffect, useContext} from "react";
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {PostList} from "../components/PostList";
import {useParams} from "react-router-dom";
import {PaginationBar} from "../components/PaginationBar";

export const Explore = () => {

    const [posts, setPosts] = useState([])
    const {loading, request} = useHttp()
    const {token, username} = useContext(AuthContext)
    const post_page = useParams().page;

    const fetchPosts = useCallback(async () => {
        try {
            console.log("Explore. post_page: ", post_page)
            let page = post_page || 1
            const fetched = await request(`/api/posts?page=${page}`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setPosts(fetched);
        } catch (e) {
        }
    }, [token, request, post_page]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    if (loading) {
        return <Loader/>;
    }
    console.log("Explore. posts: ", posts)

    return (
        <div>
            <h3>Hi, {username}!</h3>
            <p className="par">You can see all posts here.</p>
            <>{!loading && <PostList posts={posts}/>}</>
            <>{!loading && <PaginationBar page={post_page || 1} total_pages={posts._meta?posts._meta.total_pages:0} link_to={"/explore"}/>}</>
        </div>
    )
}