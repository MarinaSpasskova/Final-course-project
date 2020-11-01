import React from "react";
import {NavLink} from "react-router-dom";


export const ResetPassword = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Reset password</h1>
                <div className="white">
                    <div className="card-panel">
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Email"
                                    id="Email"
                                    type="email"
                                    name="Email"
                                />
                                <label htmlFor="Email">Email</label>
                            </div>
                            <div className="card-action">
                                <button
                                className="Submit"
                                style={{ marginRight: 5 }}
                                >
                                Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}