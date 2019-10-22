import React from 'react';

export default class FormChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name : "", message : "", counter : 0};
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChangeName(e) {
        this.setState({name : e.target.value});
    }

    handleChangeMessage(e) {
        this.setState({message: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.state.name || !this.state.message) {
            return;
        }
        this.props.onSave(this.state.counter, this.state.name,this.state.message);
        this.setState({name:'',message:'',counter:this.state.counter+1});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div class="send-wrap">
                    <input type="text" onChange={this.handleChangeName} class="form-control send-message" placeholder="Name" value={this.state.name} />
                    <textarea class="form-control send-message" onChange={this.handleChangeMessage} rows="3" placeholder="Chat Message" value={this.state.message}></textarea>
                </div>
                <div class="btn-panel">
                    <a class="col-lg-4 text-right btn send-message-btn pull-right" role="button"><button><i class="fa fa-plus"></i> Send Message</button></a>
                </div>
            </form>
        );
    }
}
