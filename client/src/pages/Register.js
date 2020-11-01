import React from "react";
import {NavLink} from "react-router-dom";


export const Register = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Register</h1>
                <div className="white">
                    <div className="card-panel">
                        <span className="card-title">Sign in</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Username"
                                    id="Username"
                                    type="text"
                                    name="Username"
                                />
                            </div>
                            <div>
                                <label htmlFor="Username">Username</label>
                                <input
                                    placeholder="Email"
                                    id="Email"
                                    type="email"
                                    name="Email"
                                    />
                                    <label htmlFor="Email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="white"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div>
                                <input
                                    placeholder="Repeat password"
                                    id="repeat password"
                                    type="password"
                                    name="password"
                                    className="white"
                                />
                                <label htmlFor="password">Repeat password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btnSignI"
                            style={{ marginRight: 5 }}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
