import React, {Component} from 'react'
import PostForm from "./PostForm.js";
import $ from 'jquery'

class PostCreateModal extends Component{

    constructor(props){
        super(props)

        this.handleSubmitCreate = this.handleSubmitCreate.bind(this)
    }


    handleSubmitCreate(event, article_id, title, description){
        event.preventDefault()
        Meteor.call('posts.insert', title, description)
        $("#createPostModal").modal('hide')
        this.refs.createForm.clearArticleProps()
    }


    render(){
        return (
            <div className="modal fade" id="createPostModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <PostForm ref={"createForm"} buttonText={"Create post"} handleSubmit={this.handleSubmitCreate}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostCreateModal