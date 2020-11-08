import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import { Profile } from "./pages/Profile";
import { Explore } from "./pages/Explore";


export const useRoutes = (isAuthenticated) => {
    console.log("isAuthenticated is", isAuthenticated)
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/explore" exact>
                    <Explore />
                </Route>
                <Route path="/explore/:page">
                    <Explore />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/home/:page" exact>
                    <Home />
                </Route>
                <Route path="/user/:id" exact>
                    <User />
                </Route>
                <Route path="/user/:id/:page">
                    <User />
                </Route>
                <Route path="/profile" exact>
                    <Profile />
                </Route>
                <Redirect to="/home" />
            </Switch>
        );
    }
    console.log("Redirect to /")
    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Route path="/register" exact>
                <Register />
            </Route>
            <Route path="/resetPassword" exact>
                <ResetPassword />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};