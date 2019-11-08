import React, { Component } from "react";
import Button from 'react-bootstrap';
import io from "socket.io-client";
import List from 'react-bootstrap';


export default class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      textmsg: "",
      //userid: this.props.userid,
      msgHistory: [],
      //socket: io.connect("http://localhost:8080/lobby")
    };
    this.handleChange = this.handleChange.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  componentDidMount = () => {
    this.getMessage(this.receiveMessage);
  };

  sendMessage(message) {
    this.state.socket.emit("subscribeToChat", message);
  }

  getMessage(receieveMessage) {
    this.state.socket.on("message", receieveMessage);
  }

  receiveMessage(data) {
    this.setState(state => {
      const msgHistory = state.msgHistory.concat({
        title: data.title,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description: data.msg,
        userid: data.userid
      });
      return {
        msgHistory,
        textmsg: ""
      };
    });
  }

  handleSubmit = () => {
    this.sendMessage({ msg: this.state.textmsg, title: this.state.userid });
  };

  handleChange(event) {
    this.setState({ textmsg: event.target.value });
  }

  render = () => {
    return (
      <div className="view-box">
        <div className="chat-history">
          <List
            itemLayout="horizontal"
            dataSource={this.state.msgHistory}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="text-box">
          <textarea
            value={this.state.textmsg}
            onChange={this.handleChange}
            className="textarea"
            id="textboxsize"
            width="2000"
            rows="2"
            placeholder="Type your message here..."
          />
          <Button
            rounded
            size="sm"
            className="float-right mt-4"
            onClick={() => {
              this.handleSubmit();
            }}
          >
            Send
          </Button>
        </div>
      </div>
    );
  };
}
