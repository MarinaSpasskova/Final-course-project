import React from "react";
import Moment from 'moment'

export const Post = () => {
    return (
        <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    <div className="col s2">
                        <img src="images/yuna.jpg" alt=""
                             className="circle responsive-img" />
                    </div>
                    <div className="col s10">
                        <span className="black-text">
                        User said:
                        </span>
                        <span className="black-text">
                        Something
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}