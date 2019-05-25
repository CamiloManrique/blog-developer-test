import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import Navbar from "../components/Navbar";
import { Redirect } from "react-router";

class Users extends Component{

    isAuthorized(){
        if(this.props.currentUser.roles){
            return Roles.userIsInRole(this.props.currentUser._id, 'admin')
        }
        else{
            return true
        }
    }

    renderUsersRows(){
        const { users } = this.props
        return users.map(user => {
            return (
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.profile.name}</td>
                    <td>{user.emails ? user.emails[0].address : "No email found"}</td>
                    <td>{this.getRole(user)}</td>
                </tr>
            )
        })

    }

    getRole(user){
        if(user.roles){
            return Roles.userIsInRole(user._id, 'admin') ? 'Administrator' : 'Guest'
        }
        else{
            return ''
        }
    }

    renderUnauthorized(){
        swal({
            title: 'Unauthorized',
            text: 'You must be logged as an administrator to see the users',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: "Go back to blog",
            confirmButtonText: "Logout",
        }).then((result) => {
            if(result.value){
                Meteor.logout()
            }
            else{
                this.props.history.push("/blog")
            }
        })
        return ('')
    }

    renderUsers(){
        return (
            <div>
                <Navbar/>
                <div className={"row mt-5"}>
                    <div className={"col-12"}>
                        <h2>Users List</h2>
                    </div>
                </div>

                <div className={"row mt-5"}>
                    <div className={"col-12"}>
                        <table className={"table table-stripped"}>
                            <thead className={"thead-dark"}>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderUsersRows()}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }

    render() {
        return (
            this.props.currentUser ? (this.isAuthorized() ? (this.renderUsers()) : (this.renderUnauthorized())) : (<Redirect to={"/login"}/>)
        )
    }

}

export default withTracker(() => {
    Meteor.subscribe('users');
    return {
        currentUser: Meteor.user(),
        users: Meteor.users.find().fetch()
    }

})(Users)