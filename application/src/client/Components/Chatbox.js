import React, { Component } from "react";
import io from "socket.io-client";
import { ListGroup, Button, Form, Row, Col, Card } from "react-bootstrap";
import "../app.css";

export default class ChatBox extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      textmsg: "",
      userid: this.props.userid,
      msgHistory: [],
      socket: io.connect(`http://54.183.228.36:8080/${this.props.url}`, {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10
      })
    };
    this.handleChange = this.handleChange.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
  
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.state.socket.on("message", this.receieveMessage);
  };

  componentDidUpdate() {
    const { chat } = this.refs;
    chat.scrollTop = chat.scrollHeight;
  }

  getMessage(receieveMessage) {
    this.state.socket.on("message", receieveMessage);
  }

  handleSubmit = () => {
    this.sendMessage({ msg: this.state.textmsg, title: this.state.userid });
  };

  receiveMessage(data) {
    if(this._isMounted){
    this.setState(state => {
      const msgHistory = state.msgHistory.concat({
        title: data.title,
        description: data.msg,
        userid: data.userid
      });
      return {
        msgHistory,
        textmsg: ""
      };
    });
  }
  }

  sendMessage(message) {
    this.state.socket.emit("subscribeToChat", message);
  }

  handleChange(event) {
    this.setState({ textmsg: event.target.value });
  }

  createHistory() {
    const messages = [];

    for (let i = 0; i < this.state.msgHistory.length; i++) {
      messages.push(
        <ListGroup.Item className="chat-message">
          <h6>{this.state.msgHistory[i].title}</h6>
          <p>{this.state.msgHistory[i].description}</p>
        </ListGroup.Item>
      );
    }
    return messages;
  }

  render = () => (
    <div className="chat-section">
      <div className="chat-history" ref="chat">
        <ListGroup itemLayout="horizontal">{this.createHistory()}</ListGroup>
      </div>
      <div className="text-box">
        <Form>
          <Row className="justify-content-left">
            <Col md="8">
              <textarea
                value={this.state.textmsg}
                onChange={this.handleChange}
                className="text-area"
                id="textboxsize"
                rows="2"
                placeholder="Type your message here..."
              />
            </Col>
            <Col md="3">
              <Button
                rounded="true"
                variant="dark"
                size="lg"
                className="mt-4"
                onClick={() => {
                  this.handleSubmit();
                }}
              >
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
