import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hooks";
import {Loader} from "../components/Loader";
import Moment from "moment";
import {PostList} from "../components/PostList";
import {PaginationBar} from "../components/PaginationBar";


export const User = () => {
    const {loading, request} = useHttp();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const pageUserId = useParams().id;
    const {token, userId} = useContext(AuthContext);
    const [isYourPage, setIsYourPage] = useState(false);
    const post_page = useParams().page;

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request(`/api/users/${pageUserId}`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("User: ", fetched)
            setUser(fetched);
            if (userId === parseInt(pageUserId)) {
                setIsYourPage(true);
            }
        } catch (e) {
        }
    }, [token, request, pageUserId, setIsYourPage, setUser, userId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const fetchUserPosts = useCallback(async () => {
        try {
            console.log("USER", post_page)
            let page = post_page || 1
            const fetchedP = await request(`/api/users/${pageUserId}/posts?page=${page}`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("Posts: ", fetchedP)
            setPosts(fetchedP);
        } catch (e) {
        }
    }, [token, request, pageUserId, post_page]);

    useEffect(() => {
        fetchUserPosts();
    }, [fetchUserPosts]);

    if (loading) {
        return <Loader/>;
    }

    const followHandler = async () => {
        try {
            const data = await request(`/api/users/${pageUserId}/follow`, "PUT", {}, {
                Authorization: `Bearer ${token}`,
            });
            fetchUser()
        } catch (e) {
        }
    };

    const unfollowHandler = async () => {
        try {
            const data = await request(`/api/users/${pageUserId}/unfollow`, "PUT", {}, {
                Authorization: `Bearer ${token}`,
            });
            fetchUser()
        } catch (e) {
        }
    };

    console.log("User.page")
    if (!(!loading && user)) {
        return (<p>Requested user wasn't found</p>)
    }
    console.log("isYourPage: ", isYourPage)
    return (
        <div className="white">
            <div className="card-panel">
                <ul className="collection">
                    <li className="collection-item avatar">
                        <img src={user._links.avatar} alt="avatar" className="circle"/>
                        <span className="Username">{user.username}</span>
                        <p className="userPar">About me: {user.about_me}</p>
                        <p className="userPar">Last seen on {Moment(user.last_seen).format('DD MMMM YYYY, H:mm')}</p>
                        <p className="userPar">followers: {user.follower_count}, following: {user.followed_count}</p>
                        {!isYourPage &&
                        <button
                            className="Submit btn waves-effect waves-light deep-purple accent-2"
                            value={user.is_followed ? "Unfollow" : "Follow"}
                            disabled={loading}
                            onClick={user.is_followed ? unfollowHandler : followHandler}
                        >
                            {user.is_followed ? "Unfollow" : "Follow"}
                        </button>
                        }
                    </li>
                </ul>
            </div>
            <>{!loading && <PostList posts={posts} author={user} avatar={user._links.avatar}/>}</>
            <>{!loading && <PaginationBar page={post_page || 1} total_pages={posts._meta?posts._meta.total_pages: 0} link_to={`/user/${pageUserId}`}/>}</>
        </div>
    )
}