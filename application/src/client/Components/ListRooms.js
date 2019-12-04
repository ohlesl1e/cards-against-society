import React, { Component } from 'react';
import '../app.css';
import { Table, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import { retrieveCookie } from './Cookies';

export default class ListRooms extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      socket: io.connect('http://localhost:8080/lobby', {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10
      })
    };
    this.getLobbies = this.getLobbies.bind(this);
  }

  componentDidMount() {
    this.getLobbies();
    this.state.socket.on('roomUpdate', () => this.getLobbies());
  }

  getLobbies() {
    fetch('http://localhost:4000' + this.props.url)
      .then(response => response.json())
      .then((res) => {
        this.setState(
          {
            data: res
          },
          () => console.log()
        );
      });
  }

  // Create a table function
  createTable = () => {
    const table = []; // Sets empty table
    const children = [];
    if (this.state.data !== null) {
      if (this.state.data.length === 0) {
        children.push(<div>No games available... please create one.</div>);
      } else {
        children.push(
          <Table>
            <tr className="lobby_Games">
              <th>Room Name</th>
              <th scope="col">Host:</th>
              <th>Join</th>
            </tr>
          </Table>
        );

        for (let i = 0; i < this.state.data.length; i++) {
          children.push(
            <Table>
              <tr>
                <td>{this.state.data[i].roomName}</td>
                <td>{this.state.data[i].HostUserid}</td>

                <td>
                  <Button
                    size="sm"
                    onClick={() => this.handleRouteChange(this.state.data[i])}
                  >
                    Join
                  </Button>
                </td>
              </tr>
            </Table>
          );
        }
      }
      // Creates the parent and adds the children
      table.push(<td>{children}</td>);
    }
    return table;
  };

  handleRouteChange(link) {
    fetch(`http://localhost:4000/games/join/${link.gameid}`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ userid: retrieveCookie() }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((res) => {
        window.open('/Game/' + link.gameid);
      });
  }

  render() {
    return (

      <div className="wrapper_room">
      <Table scrollY maxHeight="70vh" striped boredered centered small>
        {this.createTable()}
      </Table>
      </div>
    );
  }
}
