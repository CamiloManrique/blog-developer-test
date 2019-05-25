import React, {Component} from 'react'

class PostForm extends Component{

    constructor(props){
        super(props)

        this.state = {
            post_id: null,
            title: '',
            description: ''
        }

        this.formSubmit = this.formSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    formSubmit(event){
        event.preventDefault()
        this.props.handleSubmit(event, this.state.post_id, this.state.title, this.state.description)
    }

    setPostProps(post){
        this.setState({
            post_id: post._id,
            title: post.title || '',
            description: post.description || ''
        })
    }

    clearArticleProps(){
        this.setState({
            post_id: null,
            title: '',
            description: ''
        })
    }

    render(){
        return (
            <form onSubmit={this.formSubmit}>
                <div className={"form-group"}>
                    <label>Title</label>
                    <input type="text" ref={"title"} value={this.state.title} name={"title"} onChange={this.handleInputChange} className="form-control"/>
                </div>

                <div className={"form-group"}>
                    <label>Description</label>
                    <textarea value={this.state.description} name={"description"} onChange={this.handleInputChange} className={"form-control"}/>
                </div>

                <button type="submit" className="btn btn-primary">{this.props.buttonText}</button>

            </form>
        )
    }
}

export default PostForm