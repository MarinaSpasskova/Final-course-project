import React, {useEffect, useState} from "react";
import {NavLink, Redirect, useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hooks";
import {useMessage} from "../hooks/message.hook";


export const ResetPassword = () => {
    const history = useHistory();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({email: ""});
    const message = useMessage();

    const resetPasswordHandler = async() => {
        try {
            const data = await request("api/auth/reset_password", "POST", {...form})
            message(data.message)
            history.push("/");
        } catch (e) {}
    };

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value} )
    }


    useEffect(() => {
        window.M.updateTextFields();
    }, []);


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
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="Email">Email</label>
                            </div>
                            <div className="card-action">
                                <button
                                className="Submit"
                                style={{ marginRight: 5 }}
                                disabled={loading}
                                onClick={resetPasswordHandler}
                                >
                                Request password reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}