import React, { Component } from 'react';
import {
 Container, Row, Col, ButtonGroup, Button 
} from 'react-bootstrap';
import { retrieveCookie } from './Cookies';

export default class GameButtons extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      userid: retrieveCookie('userid'),
      url: '',
      data: null
    };
    this.leaveRoom = this.leaveRoom.bind(this);
    this.buttonBuilder = this.buttonBuilder.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      url: this.props.gameid
    });

    fetch(`http://localhost:4000/games/${this.props.gameid}`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ userid: retrieveCookie() }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((res) => {
        if (this._isMounted) {
          this.setState(
            {
              data: res[9]
            },
            () => console.log()
          );
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  leaveRoom = async () => {
    await fetch(
      `http://localhost:4000/games/leaveroom/${this.props.gameid}`,
      {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({ userid: retrieveCookie() }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    await alert('you have left the game.');
    await window.close();
  };

  deleteRoom = async () => {
    await fetch(
      `http://localhost:4000/games/deleteroom/${this.props.gameid}`,
      {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({ userid: retrieveCookie() }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    await alert('Game has been deleted.');
    await window.close();
  };

  buttonBuilder() {
    if (this.state.data === this.state.userid) {
      return (
        <ButtonGroup vertical size="lg">
          <Button variant="outline-dark">Edit Game Rules</Button>
          <Button variant="outline-dark">Invite Friends</Button>
          <Button variant="outline-dark">Kick Player</Button>
          <Button onClick={this.deleteRoom} variant="outline-dark">
            Delete Room
          </Button>
        </ButtonGroup>
      );
    }
    return (
      <ButtonGroup vertical size="lg">
        <Button variant="outline-dark">Invite Friends</Button>
        <Button onClick={this.leaveRoom} variant="outline-dark">
          Leave Room
        </Button>
      </ButtonGroup>
    );
  }

  render() {
    return this.buttonBuilder();
  }
}
