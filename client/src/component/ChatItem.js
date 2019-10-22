import React from 'react';

export default class ChatItem extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.onDelete(this.props.id);
    }

    render() {
        return (
            <div class="media msg">
                <div class="pull-left" onClick={this.onClick}>
                    <img class="media-object" data-src="holder.js/64x64" alt="64x64" style={{width: "32px", height:"32px"}} src="red-minus-sign.png" />
                </div>
                <div class="media-body">
                    <h5 class="media-heading">{this.props.name}</h5>
                    <small class="col-lg-12">{this.props.text}</small>
                </div>
            </div>
        );
    }
}
