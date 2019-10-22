import React from 'react';
import ChatItem from './ChatItem';

export default class ChatList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let listNode = this.props.datas.map((item) => {
                          return (<ChatItem id={item.id} name={item.name} text={item.message} onDelete={this.props.onDelete} />);
                       });
        return (
            <div>
                {listNode}
            </div>
        )
    }

}
