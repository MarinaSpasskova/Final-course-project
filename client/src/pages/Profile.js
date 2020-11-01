import React from "react";
import {NavLink} from "react-router-dom";


export const Profile = () => {
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
                                <label htmlFor="Username">Username</label>
                                <input
                                    placeholder="About me"
                                    id="About-me"
                                    type="text"
                                    name="About-me"
                                />
                                <label htmlFor="About me">Email</label>
                            </div>
                            <button
                                className="btnSignI"
                                style={{ marginRight: 5 }}
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