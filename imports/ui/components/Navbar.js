import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {Meteor} from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';

class Navbar extends Component{

    handleLogout(){
        Meteor.logout()
    }

    showUsers(){
        return this.props.currentUser && this.props.currentUser.roles && Roles.userIsInRole(this.props.currentUser._id, "admin")
    }


    render(){
        return (
            <nav className={"navbar navbar-expand-sm navbar-light bg-light justify-content-between"}>
                <Link to={"/blog"} className={"navbar-brand"}>Dev Blog Test</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbar" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse"} id={"navbar"}>
                    {this.showUsers() ? <Link to={'/admin/users'}>Users</Link> : ''}
                    <button className={"btn btn-link"} onClick={this.handleLogout.bind(this)}>Logout</button>
                </div>
            </nav>
        )
    }

}

export default withTracker(() => {
    Meteor.subscribe('users');
    return {
        currentUser: Meteor.user(),
    }

})(Navbar)