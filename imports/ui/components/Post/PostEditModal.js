import React, {Component} from 'react'
import PostForm from "./PostForm.js";
import $ from 'jquery'

class PostEditModal extends Component{

    constructor(props){
        super(props)

        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    }


    handleSubmitUpdate(event, article_id, title, description){
        event.preventDefault()
        Meteor.call('posts.update', article_id, title, description)
        $("#editPostModal").modal('hide')
    }

    setPostProps(article){
        this.refs.updateForm.setPostProps(article)
    }

    render(){
        return (
            <div className="modal fade" id="editPostModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <PostForm ref={"updateForm"} buttonText={"Update post"} handleSubmit={this.handleSubmitUpdate}/>
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

export default PostEditModal