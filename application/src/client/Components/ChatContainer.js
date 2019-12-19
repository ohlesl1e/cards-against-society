import React, { Component } from 'react';
import io from 'socket.io-client';
import { Tabs, Tab } from 'react-bootstrap';
import '../app.css';
import Chatbox from './Chatbox';

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render = () => (
    <Tabs defaultActiveKey="private">
      <Tab
        eventKey="public"
        title="Public"
        className="justify-content-center game-row"
      >
        <Chatbox userid={this.props.userid} url="lobby" />
      </Tab>
      <Tab
        eventKey="private"
        title="Private"
        className="justify-content-center game-row"
      >
        <Chatbox userid={this.props.userid} url={this.props.url} />
      </Tab>
    </Tabs>
  );
}
