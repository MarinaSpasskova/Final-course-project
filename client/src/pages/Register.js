import React, {useEffect, useState} from "react";
import {NavLink, Redirect, Switch, useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hooks";
import {useMessage} from "../hooks/message.hook";


export const Register = () => {
    const history = useHistory();
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        username: "", email: "", password: "", repeatPassword: ""
    });

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request("api/auth/register", "POST", {...form});
            message(data.message);
            history.push("/");
        } catch (e) {
        }
    }

    useEffect(() => {
        return  <Redirect to="/" />
    }, [changeHandler]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);



    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Register</h1>
                <div className="white">
                    <div className="card-panel">
                        <span className="card-title">Register</span>
                        <div>
                            <div className="input-field">
                                <label htmlFor="Username">Username</label>
                                <input
                                    placeholder="Username"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div>
                                <label htmlFor="Email">Email</label>
                                <input
                                    placeholder="Email"
                                    id="Email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                    />
                                <label htmlFor="password">Password</label>
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
                            </div>
                                <label htmlFor="repeat password">Repeat password</label>
                            <div>
                                <input
                                    placeholder="Repeat password"
                                    id="repeat password"
                                    type="password"
                                    name="repeatPassword"
                                    value={form.repeatPassword}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="Submit"
                            style={{ marginRight: 5 }}
                            disabled={loading}
                            onClick={registerHandler}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
