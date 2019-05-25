import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import {NonEmptyString} from "../../api/validators";
import {check} from 'meteor/check'
import { withTracker } from 'meteor/react-meteor-data';


class Signup extends Component{

    handleSubmit(event){
        event.preventDefault()
        const user = {
            name: ReactDOM.findDOMNode(this.refs.name).value.trim(),
            email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
            password: ReactDOM.findDOMNode(this.refs.password).value.trim(),
            confirm_password: ReactDOM.findDOMNode(this.refs.confirm_password).value.trim(),
            role: ReactDOM.findDOMNode(this.refs.role).value.trim(),
        }

        try{
            check(user.name, NonEmptyString)
            check(user.email, NonEmptyString)
            check(user.password, NonEmptyString)
            check(user.confirm_password, NonEmptyString)

            if(user.password !== user.confirm_password){
                throw new Meteor.Error(422, 'Passwords do not match');
            }

            return Meteor.call('signup', user.email, user.password, user.name, user.role, (err) => {
                if(err){
                    swal({
                        type: 'error',
                        title: 'Signup Error',
                        text: err.reason,
                    })
                }
                else{
                    this.props.history.push("/login")
                }

            })
        }
        catch (e) {
            swal({
                type: 'error',
                title: 'Invalid inputs',
                text: 'Please check all the fields and try again',
            })
        }


    }

    renderSignup(){
        return (
            <div className="row">
                <div className="col-12 col-sm-8 offset-sm-2">
                    <h2>Signup</h2>
                    <form className={"mt-5"} onSubmit={this.handleSubmit.bind(this)}>

                        <div className={"form-group"}>
                            <label>Name</label>
                            <input type="text" ref="name" className="form-control"/>
                        </div>

                        <div className={"form-group"}>
                            <label>Email</label>
                            <input type="text" ref="email" className="form-control"/>
                        </div>

                        <div className={"form-group"}>
                            <label>Password</label>
                            <input type="password" ref="password" className="form-control"/>
                        </div>

                        <div className={"form-group"}>
                            <label>Confirm Password</label>
                            <input type="password" ref="confirm_password" className="form-control"/>
                        </div>

                        <div className={"form-group"}>
                            <label>Role</label>
                            <select ref={"role"} className={"form-control"} defaultValue={"admin"}>
                                <option value="admin">Administrator</option>
                                <option value="guest">Guest</option>
                            </select>
                        </div>

                        <div className={"form-group"}>
                            <Link to={"/login"}>Already have an account?</Link>
                        </div>

                        <button type="submit" className="btn btn-primary">Sign Up</button>

                    </form>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.props.currentUser ? (<Redirect to={"/blog"}/> ) : (this.renderSignup())
        )
    }

}

export default withTracker(() => {
    return{
        currentUser: Meteor.user()
    }
})(Signup);