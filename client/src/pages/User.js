import React from "react";
import {NavLink} from "react-router-dom";

export const User = () => {
    return (
        <ul className="collection">
            <li className="collection-item avatar">
                <img src="images/yuna.jpg" alt="" className="circle"/>
                    <span className="Username">Username</span>
                    <p>About me</p>
                    <p>Last seen on</p>
                    <p>followers,following.</p>
                    <button
                        className="btnSignIn"
                        style={{ marginRight: 5 }}
                    >
                        Follow
                    </button>
                    <button
                        className="btnSignIn"
                        style={{ marginRight: 5 }}
                    >
                        Unfollow
                    </button>

                    <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
            </li>
            <li className="collection-item avatar">
                <i className="material-icons circle">folder</i>
                <span className="title">Title</span>
                <p>First Line
                </p>
                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
            </li>
            <li className="collection-item avatar">
                <i className="material-icons circle green">insert_chart</i>
                <span className="title">Title</span>
                <p>First Line
                </p>
                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
            </li>
            <li className="collection-item avatar">
                <i className="material-icons circle red">play_arrow</i>
                <span className="title">Title</span>
                <p>First Line</p>
                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
            </li>
            <p>
                Would you like to edit profile <a  href="/reset">Edit</a>
            </p>
        </ul>
    )
}