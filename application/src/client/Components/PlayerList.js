import React, { Component } from 'react';
import io from 'socket.io-client';
import { ListGroup, Button, Form,Row,Col, Container, Card, Table } from 'react-bootstrap';
import '../app.css';

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  componentDidMount = () => {
    
  };

  sendMessage(message) {
    
  }

  getMessage(receieveMessage) {
    
  }

  receiveMessage(data) {
    
  }

  handleSubmit = () => {
   
  };

  handleChange(event) {
    
  }

  render = () => (
    <Table striped bordered hover variant="dark" size="sm" className="player-list">
    <thead>
        <th>Players</th>
        <th>Score</th>
    </thead>
    <tbody>
        <tr>
            <td>Player1</td>
            <td>0</td>
        </tr>
        <tr>
            <td>Player2</td>
            <td>0</td>
        </tr>
        <tr>
            <td>Player3</td>
            <td>0</td>
        </tr>
    </tbody>

  </Table>
  );
}
