import React, { Component } from 'react';
import io from 'socket.io-client';
import { ListGroup, Button, Form,Row,Col } from 'react-bootstrap';
import '../app.css';

export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textmsg: '',
      userid: this.props.userid,
      msgHistory: [],
      socket: io.connect(
        'http://localhost:8080/lobby'
        // +this.props.url
      )
    };
    this.handleChange = this.handleChange.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  componentDidMount = () => {
    this.getMessage(this.receiveMessage);
  };

  sendMessage(message) {
    this.state.socket.emit('subscribeToChat', message);
  }

  getMessage(receieveMessage) {
    this.state.socket.on('message', receieveMessage);
  }

  receiveMessage(data) {
    this.setState((state) => {
      const msgHistory = state.msgHistory.concat({
        title: data.title,
        description: data.msg,
        userid: data.userid
      });
      return {
        msgHistory,
        textmsg: ''
      };
    });
  }

  handleSubmit = () => {
    this.sendMessage({ msg: this.state.textmsg, title: this.state.userid });
  };

  handleChange(event) {
    this.setState({ textmsg: event.target.value });
  }

  render = () => (
    <div className="chat-section">
      <div className="chat-history">
        <ListGroup
          itemLayout="horizontal"
          dataSource={this.state.msgHistory}
          renderItem={item => (
            <ListGroup.Item>
              <ListGroup.Item.Meta
                title={item.title}
                description={item.description}
              />
            </ListGroup.Item>
          )}
        />
      </div>
      <div className="text-box">
        <Form>
          <Row className="justify-content-left">
          <Col md="10">
            <textarea
              value={this.state.textmsg}
              onChange={this.handleChange}
              className="text-area"
              id="textboxsize"
              width="auto"
              rows="2"
              placeholder="Type your message here..."
            />
           
           
          </Col>
          <Col md = "1" >
            <Button
                rounded
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
