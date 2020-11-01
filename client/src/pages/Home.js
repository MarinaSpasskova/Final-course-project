import React from "react";

export const Home = () => {
    return (
        <div className="row">
            <h1>Hi user!</h1>
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">mode_edit</i>
                        <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                        <label htmlFor="icon_prefix2">Write something</label>
                        <button
                            className="btnSignIn"
                            style={{ marginRight: 5 }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

