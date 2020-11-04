import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hooks";
import {Loader} from "../components/Loader";

export const User = () => {
    const [users, setUsers] = useState([])
    const {token, username, userId} = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [value, setButton] = useState(
        { value: "" });


    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request(`/api/users`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setUsers(fetched);
        } catch (e) {
        }
    }, [token, request]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (loading) {
        return <Loader/>;
    }

    const followHandler = async () => {
        try {
            const data = await request(`/api/users/${userId}`, "PUT", value);
            console.log(value)
        } catch (e) {}
    };

    console.log("User.page")
    return (
        <ul className="collection">
            <li className="collection-item avatar">
                <img src="https://www.gravatar.com/avatar/0612aef53fa25771052a026fc174cd5a?d=identicon&amp;s=256" alt="" className="circle"/>
                    <span className="Username">{username}</span>
                            <p>About me{users[userId]}</p>
                            <p>Last seen on</p>
                            <p>followers,following.</p>
                            <button
                                className="Submit"
                                style={{ marginRight: 5 }}
                                value={"Follow"}
                                disabled={loading}
                                onClick={followHandler}
                            >
                                Follow
                            </button>
                            <button
                                className="Submit"
                                style={{ marginRight: 5 }}
                                value={"Unfollow"}
                                disabled={loading}
                                onClick={followHandler}
                            >
                                Unfollow
                            </button>
            </li>
            <p>
                Would you like to edit your profile? <a  href="/profile">Edit</a>
            </p>
        </ul>
    )
}