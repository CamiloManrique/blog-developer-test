import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ReactDOM from "react-dom";
import {NonEmptyString} from "../../api/validators";
import { check } from 'meteor/check';
import { withTracker } from 'meteor/react-meteor-data';

class Login extends Component{

    handleSubmit(event){
        event.preventDefault()
        const user = {
            email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
            password: ReactDOM.findDOMNode(this.refs.password).value.trim(),
        }
        
        try {
            check(user.email, NonEmptyString)
            check(user.password, NonEmptyString)

            Meteor.loginWithPassword(user.email, user.password, (err, res) => {
                if(err){
                    swal({
                        type: 'error',
                        title: 'Invalid email or password',
                        text: 'Please check your credentials and try again',
                    })
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

    renderLogin(){
        return (
            <div className="row mt-5">
                <div className="col-12 col-sm-8 offset-sm-2">
                    <h2>Login into your account</h2>
                    <form className={"mt-5"} onSubmit={this.handleSubmit.bind(this)}>
                        <div className={"form-group"}>
                            <label>Email</label>
                            <input type="text" ref="email" className="form-control"/>
                        </div>

                        <div className={"form-group"}>
                            <label>Password</label>
                            <input type="password" ref="password" className="form-control"/>
                        </div>
                        <div className={"form-group"}>
                            <Link to={"/signup"}>Don't have an account?</Link>
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>

                    </form>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.props.currentUser ? (<Redirect to={'/blog'}/>) : (this.renderLogin())
        )
    }
}

export default withTracker(() => {
    return{
        currentUser: Meteor.user()
    }
})(Login);