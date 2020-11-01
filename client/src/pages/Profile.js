import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {useHttp} from "../hooks/http.hooks";


export const Profile = () => {
    const [form, setForm] = useState(
        { username: "", about_me: "" });
    const {loading, request, error, clearError} = useHttp()

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const loginHandler = async () => {
        try {
            const data = await request("/api/edit_profile", "POST", { ...form });
            console.log("logged in")
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
                                className="Submit"
                                style={{ marginRight: 5 }}
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}