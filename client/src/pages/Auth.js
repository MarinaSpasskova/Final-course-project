import React, {useContext, useEffect} from "react";
import {useHttp} from "../hooks/http.hooks";
import { useState, useCallback } from "react";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import { Register } from "./Register";
import { ResetPassword } from "./ResetPassword";

export const Auth = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState(
        { username: "", password: "" });

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        console.log("AuthPage error:");
        message(error);
        clearError();
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    /*const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", { ...form });
            message(data.message);
        } catch (e) {}
    };*/

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", { ...form });
            auth.login(data.token, data.userId, data.username);
            console.log(auth.username)
            console.log("logged in")
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card-panel">Please log in to access this page.</div>
                <h1>News and moods</h1>
                <div className="white">
                    <div className="card-panel">
                        <span className="card-title">Sign in</span>
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
                                <label htmlFor="username">Username</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="Submit"
                            style={{ marginRight: 5 }}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sign in
                        </button>
                        <p className="par">
                            Are you a new user? <a  href="/register">Click here!</a>
                        </p>
                        <p className="par">
                            Have you forgotten a password? <a  href="/resetPassword">Click here!</a>
                        </p>
                        <label>
                            <input type="checkbox" />
                            <span  className="Remember-me">Remember me</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}