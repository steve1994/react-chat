import React from 'react';
import ChatList from './ChatList';
import FormChat from './FormChat';

export default class OneWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chats:[]};
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onSave(id, name, message) {
        this.setState({chats:[...this.state.chats,{id,name,message}]})
    }

    onDelete(id) {
        this.setState((state) => ({chats:state.chats.filter(item => {return item.id !== id})}))
    }

    render() {
        return (
          <div className="container">

              <div className="row">

                  <div className="message-wrap col-lg-12">
                      <div className="msg-wrap">
                          <ChatList datas={this.state.chats} onDelete={this.onDelete} />
                      </div>

                      <FormChat onSave={this.onSave} />
                  </div>
              </div>
            </div>
        );
    }
}
