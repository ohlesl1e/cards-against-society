import React, { Component } from 'react';
import io from 'socket.io-client';
import {
  ListGroup,
  Button,
  Form,
  Row,
  Col,
  Container,
  Card,
  Table
} from 'react-bootstrap';
import '../app.css';

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.loadPlayers = this.loadPlayers.bind(this);
  }

  componentDidMount = () => {};

  sendMessage(message) {}

  getMessage(receieveMessage) {}

  receiveMessage(data) {}

  handleSubmit = () => {};

  handleChange(event) {}

  loadPlayers() {
    const children = [];
    if (this.props.players !== null) {
      for (let i = 0; i < this.props.players.length; i++) {
        children.push(
          <tr>
            <td>{this.props.players[i]}</td>
            <td>0</td>
          </tr>
        );
      }
    }

    return <tbody>{children}</tbody>;
  }

  render = () => (
    <Table
      striped
      bordered
      hover
      variant="dark"
      size="sm"
      className="player-list"
    >
      <thead>
        <th>Players</th>
        <th>Score</th>
      </thead>
      {this.loadPlayers()}
    </Table>
  );
}
