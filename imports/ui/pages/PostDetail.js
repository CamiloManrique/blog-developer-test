import React, { Component } from 'react'
import { Posts } from "../../api/posts";
import { withTracker } from 'meteor/react-meteor-data';
import {Link, Redirect} from 'react-router-dom'
import Navbar from "../components/Navbar";

class PostDetail extends Component{

    getPost(){
        const { post } = this.props.match.params
        return Posts.findOne({_id: post})
    }

    renderPost(){
        const post = this.getPost()
        return (
            <div className={"row mt-5"}>
                <div className={"col-12"}>
                    <h2>{post.title}</h2>
                </div>

                <div className={"col-12 mt-5"}>
                    <p className={"text-justify"}>{post.description}</p>
                </div>
            </div>
        )
    }

    renderPostDetail(){
        const post = this.getPost()
        return (
            <div>
                <Navbar/>
                <div className={"row mt-5"}>
                    <div className={"col-12"}>
                        <Link to={'/blog'}>Go back</Link>
                    </div>
                </div>
                {post ? (this.renderPost()): ('')}
            </div>
        )
    }

    render() {
        return this.props.currentUser ? this.renderPostDetail() : (<Redirect to={'/login'}/>)
    }

}

export default withTracker(() => {
    Meteor.subscribe('posts')
    return{
        currentUser: Meteor.user(),
        posts: Posts.find({}).fetch()
    }
})(PostDetail);