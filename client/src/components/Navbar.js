import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        //to main page
        history.push("/");
    };

    return (
        <nav>
            <div className="nav-wrapper deep-purple accent-2">
                <a href="/" className="brand-logo">
                    News and moods
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/explore">Explore</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                        <form>
                            <div className="search-wrapper">
                                <input id="search" placeholder="search"/>
                                    <i className="label-icon">search</i>
                            </div>
                        </form>
                    </li>
                    <li>
                        <a href="/" onClick={logoutHandler}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};