import React from "react";
import {useState, useCallback, useEffect, useContext} from "react";
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {PostList} from "../components/PostList";
import {PaginationBar} from "../components/PaginationBar";
import {useParams} from "react-router-dom";

export const Home = () => {

    const {loading, request} = useHttp()
    const {token, username, userId} = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const [form, setForm] = useState({body: ""});
    const post_page = useParams().page;

    const changeHandler = (event) => {
        console.log("Events", event.target.name, event.target.value)
        setForm({...form, [event.target.name]: event.target.value});
    };

    const submitNewPost = async () => {
        try {
            console.log("Home. Submit new post");
            await request(`api/posts`, "POST", {...form}, {
                Authorization: `Bearer ${token}`,
            })
            form.body = "";
            fetchPosts();
        }catch (e){}
    }

    const fetchPosts = useCallback(async () => {
        try {
            console.log("Home. fetch posts")
            let page = post_page || 1
            const fetched = await request(`/api/users/${userId}/followed_posts?page=${page}`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setPosts(fetched);
        } catch (e) {
        }
    }, [token, request, post_page]);

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request(`/api/users/${userId}`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("User: ", fetched)
            setUser(fetched);
        } catch (e) {
        }
    }, [token, request, userId]);

    useEffect(() => {
        fetchPosts();
        fetchUser();
    }, [fetchPosts, fetchUser]);

    if (loading) {
        return <Loader/>;
    }
    console.log("home.page is loading:", loading)
    return (
        <div>
            <ul className="collection">
                {!loading && user._links && <li className="collection-item avatar">
                    <img src={user._links.avatar} alt="avatar" className="circle"/>
                    <span className="Username">Hi, {username}!</span>
                </li>}
                <p className="par">It`s your home page! You can see only your own posts and followed posts here.</p>
                <div>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                    <textarea id="icon_prefix2" className="materialize-textarea" maxLength="140"
                                              name="body"
                                              value={form.body}
                                              onChange={changeHandler}>
                                    </textarea>
                                    <label htmlFor="icon_prefix2">Write something</label>
                                    <button
                                        className="Submit btn waves-effect waves-light deep-purple accent-2"
                                        disabled={loading}
                                        onClick={submitNewPost}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row">
                        <>{!loading && <PostList posts={posts}/>}</>
                        <>{!loading &&
                        <PaginationBar page={post_page || 1} total_pages={posts._meta ? posts._meta.total_pages : 0}
                                       link_to={"/home"}/>}</>
                    </div>
                </div>
            </ul>
        </div>
    )
}

