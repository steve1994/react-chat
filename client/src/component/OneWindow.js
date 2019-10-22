import React from 'react';
import ChatList from './ChatList';
import FormChat from './FormChat';

const axios = require('axios');
const apiUrl = "http://localhost:3002/api/chat/"
const socket = require('socket.io-client')('http://localhost:3002');

export default class OneWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chats:[],counterFail:0};
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.loadChatsMessage = this.loadChatsMessage.bind(this);
        this.resendMessage = this.resendMessage.bind(this);
    }

    componentDidMount() {
        socket.on('newChat',(msg) => {
            this.loadChatsMessage();
        })
        socket.on('deleteChat',(msg) => {
            this.loadChatsMessage();
        })
        this.loadChatsMessage();
    }

    loadChatsMessage() {
        axios.get(apiUrl)
        .then((response) => {
            this.setState({chats:response.data.map((item) => {return {id:item._id,name:item.name,message:item.chat}})})
        })
        .catch((error) => {
            alert(error);
        });
    }

    resendMessage(id,name,message) {
        this.setState((state) => ({chats:state.chats.filter(item => {return item.id !== id})}))
        this.onSave(name, message);
    }

    onSave(name, message) {
        axios.post(apiUrl, {
            name: name,
            chat: message
        })
        .then(response => {
            this.setState({chats:[...this.state.chats,{id:response.data.data._id,name,message}]})
            socket.emit('addNewChat',{id:response.data.data._id,name,message});
        })
        .catch(error => {
            this.setState({chats:[...this.state.chats,{id:this.state.counterFail+1,name,message,resend:true}],counterFail:this.state.counterFail+1})
        })
    }

    onDelete(id) {
        this.setState((state) => ({chats:state.chats.filter(item => {return item.id !== id})}))
        axios.delete(apiUrl+id)
        .then(response => {
            socket.emit('deleteNewChat',response.data);
        })
        .catch(error => {
            alert(error);
        })
    }

    render() {
        return (
          <div className="container">

              <div className="row">

                  <div className="message-wrap col-lg-12">
                      <div className="msg-wrap">
                          <ChatList datas={this.state.chats} onDelete={this.onDelete} onResend={this.resendMessage} />
                      </div>

                      <FormChat onSave={this.onSave} />
                  </div>
              </div>
            </div>
        );
    }
}
