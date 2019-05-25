import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from "../components/Navbar.js"
import Post from "../components/Post/Post.js"
import { Posts } from "../../api/posts.js"
import { withTracker } from 'meteor/react-meteor-data';
import ArticleUpdateModal from "../components/Post/PostEditModal";
import ArticleCreateModal from "../components/Post/PostCreateModal";
import $ from 'jquery'

class Blog extends Component{

    constructor(props){
        super(props)

        this.showCreateModal = this.showCreateModal.bind(this)
        this.showEditPostModal = this.showEditPostModal.bind(this)
    }

    handleSubmit(event, title, description){
        event.preventDefault()
        Meteor.call('posts.insert', title, description)
    }

    showCreateModal(){
        $("#createPostModal").modal('show')
    }


    showEditPostModal(article){
        this.refs.updatePostModal.setPostProps(article)
        $("#editPostModal").modal('show')
    }

    deletePostHandler(post){
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this post',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                Meteor.call('posts.delete', post._id)
            }
        })
    }

    renderPosts(){
        let {posts} = this.props
        const isAdmin = Roles.userIsInRole(this.props.currentUser._id, 'admin')
        return posts.map(post => {
            return (
                <div key={post._id} className={"col-sm-6 col-md-4 mt-3"}>
                    <Post post={post} showEditAndDelete={isAdmin} updateHandler={this.showEditPostModal} deleteHandler={this.deletePostHandler}/>
                </div>
            )
        })
    }

    renderBlog(){
        const isAdmin = Roles.userIsInRole(this.props.currentUser._id, 'admin')
        return (
            <div>
                <ArticleCreateModal/>
                <ArticleUpdateModal ref={"updatePostModal"}/>
                <Navbar history={this.props.history}/>
                <h2 className={"mt-5"}>List of Posts</h2>

                <div className={"row mt-4"}>
                    {this.renderPosts()}
                </div>

                {isAdmin ? (this.renderCreateButton()) : ('')}

            </div>
        )
    }

    renderCreateButton(){
        return (
            <div className={"row mt-5"}>
                <div className={"col-12"}>
                    <button className={"btn btn-success float-right"} onClick={this.showCreateModal}>New Post</button>
                </div>
            </div>
        )
    }

    render() {
        return this.props.currentUser ? (this.renderBlog()) : (<Redirect to={'/login'}/>)
    }
}

export default withTracker(() => {
    Meteor.subscribe('posts')
    return {
        currentUser: Meteor.user(),
        posts: Posts.find({}).fetch()
    }

})(Blog)