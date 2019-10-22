import React from 'react';
// import Remarkable from 'remarkable';
// import RemarkableReactRenderer from 'remarkable-react';

export default class ChatItem extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.resend = this.resend.bind(this);
    }

    onClick(e) {
        this.props.onDelete(this.props.id);
    }

    getRawMarkUp() {
        // const md = new Remarkable();
        // md.renderer = new RemarkableReactRenderer();
        // return {__html : md.render(this.props.name)};
    }

    resend() {
        this.props.resendMethod(this.props.id,this.props.name,this.props.text);
    }

    render() {
        return (
            <div class="media msg">
                <div class="pull-left" onClick={this.onClick}>
                    <img class="media-object" data-src="holder.js/64x64" alt="64x64" style={{width: "32px", height:"32px"}} src="red-minus-sign.png" />
                </div>
                <div class="media-body">
                    <h5 class="media-heading" /*dangerouslySetInnerHTML={this.getRawMarkUp()}*/>{this.props.name}</h5>
                    <small class="col-lg-12">{this.props.text}</small>
                </div>
                {this.props.isResend ? <button class="col-lg-12" onClick={this.resend}>Resend</button>  : ''}

            </div>
        );
    }
}
