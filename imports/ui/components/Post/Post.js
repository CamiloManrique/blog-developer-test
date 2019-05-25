import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'

class Post extends Component{

    componentDidMount() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    }

    updateHandler(){
        this.props.updateHandler(this.props.post)
    }

    deleteHandler(){
        this.props.deleteHandler(this.props.post)
    }

    renderEditAndDelete(){
        return (
            <div className={"post-options"}>
                <i onClick={this.updateHandler.bind(this)} className={"fa fa-edit"} data-toggle="tooltip" data-placement="bottom" title="Edit Post"/>
                <i onClick={this.deleteHandler.bind(this)} className={"fa fa-times"} data-toggle="tooltip" data-placement="bottom" title="Delete Post"/>
            </div>
        )
    }

    render() {
        const { showEditAndDelete } = this.props
        return (
            <div className="card">
                <div className={"card-header"}>
                    <h5 className="card-title">{this.props.post.title}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text overflow-ellipsis">{this.props.post.description}</p>
                    <div className={"d-flex mt-3"}>
                        <Link to={"/blog/"+this.props.post._id} className="btn btn-link">Read More</Link>
                        {showEditAndDelete ? (this.renderEditAndDelete()) : ('')}
                    </div>


                </div>
            </div>
        )
    }

}

export default Post