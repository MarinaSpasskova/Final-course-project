import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";


export const Profile = () => {
    const {token, userId} = useContext(AuthContext)
    const [form, setForm] = useState(
        { username: "", about_me: "" });
    const {loading, request, error, clearError} = useHttp();
    const history = useHistory();

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const fetchProfileData = useCallback(async () => {
        try {
            const fetched = await request(`/api/users/${userId}`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setForm(fetched);
        } catch (e) {
        }
    }, [token, request, userId]);

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    const editProfileHandler = async () => {
        try {
            const data = await request(`/api/users/${userId}`, "PUT", { ...form }, {
                Authorization: `Bearer ${token}`,
            });
            console.log("User profile was edited")
            history.push("/home");
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Edit profile</h1>
                <div className="white">
                    <div className="card-panel">
                        <span className="card-title">You can change information about your here</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Username"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={changeHandler}
                                />
                                <div>
                                <input
                                    placeholder="About me"
                                    id="about_me"
                                    type="text"
                                    name="about_me"
                                    value={form.about_me}
                                    onChange={changeHandler}
                                />
                                </div>
                            </div>
                            <button
                                className="Submit btn waves-effect waves-light deep-purple accent-2"
                                disabled={loading}
                                onClick={editProfileHandler}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}