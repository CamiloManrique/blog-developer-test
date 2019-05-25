import React from 'react'
import {BrowserRouter, Route, Link} from "react-router-dom";

import {render} from "react-dom";
import App from "../ui/App";
import Login from "../ui/pages/Login";
import Signup from "../ui/pages/Signup";
import Blog from "../ui/pages/Blog";
import PostDetail from "../ui/pages/PostDetail";
import Users from "../ui/pages/Users";

Meteor.startup(() => {
    render(
        <BrowserRouter>
            <Route path={'/'} component={App}/>

        </BrowserRouter>
        , document.getElementById('render-target'));
});