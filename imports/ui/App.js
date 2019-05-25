import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { Route } from "react-router-dom"
import Login from "./pages/Login.js"
import Signup from "./pages/Signup.js"
import Blog from "./pages/Blog.js"
import Users from "./pages/Users.js"
import PostDetail from "./pages/PostDetail.js";

class App extends Component{

    render() {
        return (
            this.props.isLogging ? ('')
                :
                (
                    <div className={"container"}>
                        <Route path={"/login"} render={(props) => <Login {...props} />} />
                        <Route path={"/signup"} render={(props) => <Signup {...props} />} />
                        <Route path={"/blog"} exact={true} render={(props) => <Blog {...props} />} />
                        <Route path={"/blog/:post"} render={(props) => <PostDetail {...props}/> } />
                        <Route path={"/admin/users"} render={(props) => <Users {...props}/>} />
                    </div>
                )
        )
    }
}

export default withTracker(() => {
    return{
        isLogging: Meteor.loggingIn(),
        currentUser: Meteor.user()
    }
})(App);