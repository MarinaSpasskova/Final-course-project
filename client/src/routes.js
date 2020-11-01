import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import { Profile } from "./pages/Profile";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/user" exact>
                    <User />
                </Route>
                <Route path="/profile" exact>
                    <Profile />
                </Route>
                <Redirect to="/home" />
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};