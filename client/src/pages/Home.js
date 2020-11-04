import React from "react";
import {useState, useCallback, useEffect, useContext} from "react";
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {PostList} from "../components/PostList";

export const Home = () => {

    const {loading, request} = useHttp()
    const {token, username} = useContext(AuthContext)
    const [posts, setPosts] = useState([])

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
    console.log("home.page")
    console.log("loading is ", loading)
    return (
        <div>
        <ul className="collection">
                <li className="collection-item avatar">
                    <img src="https://www.gravatar.com/avatar/0612aef53fa25771052a026fc174cd5a?d=identicon&amp;s=200" alt="" className="circle"/>
                    <span className="Username">Hi, {username}!</span>
                </li>
            <p className="par">It`s your home page! There are you can see only your own posts</p>
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                                <label htmlFor="icon_prefix2">Write something</label>
                                <button
                                    className="Submit"
                                    style={{marginRight: 5}}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <>{!loading && <PostList posts={posts}/>}</>
                </div>
            </div>
        </ul>
        </div>
    )
}

