import React, { Component } from 'react';
import Header from './Components/Header';
import { retrieveCookie } from './Components/Cookies';
import './app.css';
import ListRooms from './Components/ListRooms';
import UserSearch from './Components/UserSearch';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class Admin extends Component {
  state = {
    userid: retrieveCookie('userid')
  };

  render() {
    return (
      <body>
        <div className="homePage">
          <Header userid={this.state.userid} />
        </div>

        <Container>
        <div className="sidebarContainer">
          <div className="sidebarAdmin">Admin Control</div>

          <div className="sidebarNav">
            <li>
              <a href="/Lobby">Lobby</a>
            </li>
          </div>

          <div className="sidebarNav">
            <li>
              <a href="/About">About</a>
            </li>
          </div>

          <div className="sidebarNav">
            <li>
              <a href="/Profile">Profile</a>
            </li>
          </div>

          <div className="sidebarNav">
            <li>
              <a href="/Custom">Custom Cards</a>
            </li>
          </div>

          <div className="sidebarNav">
            <li>
              <a href="/Registration">Registration</a>
            </li>
          </div>

          <div className="sidebarNav">
            <li>
              <a href="/FAQ">FAQ</a>
            </li>
          </div>
        </div>

        <Row>
        
          <Col md="6">
          <h2>Active Game Rooms</h2>
          <ListRooms url="games/allgames" />
          <button type="button" class="btn btn-dark"> Delete Room </button>
          </Col>

        
          <Col md="6">
        <div className="admin_usercol">
          <h2>Users</h2>
          <UserSearch userid="" />
          <button type="button" class="btn btn-dark"> Delete User </button>
          </div>
          </Col>
        </Row>
        </Container>
      </body>
      
    );
  }
}
