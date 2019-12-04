import React, { Component } from 'react';
import Header from './Components/Header';
import { retrieveCookie } from './Components/Cookies';
import './app.css';
import Chatbox from './Components/Chatbox';
import GameForm from './Components/GameForm';
import ListRooms from './Components/ListRooms';
import UserList from './Components/UserList';
import { Container, Row, Col } from 'react-bootstrap';

export default class Lobby extends Component {
  state = {
    userid: retrieveCookie('userid')
  };

  componentDidMount() {
    if (!retrieveCookie('userid')) {
      alert('please log in!');
    }
  }

  render() {
    return (
      
      <body>
        
        <div className="homePage">
          <Header userid={this.state.userid} />
        </div>


        <div className="lobby">
          <Container>
            <Row>

            <Col mid="2">
                  <center><h3>Registered Users</h3></center>
                  <UserList userid=""/>
            </Col>

              <Col md="6">
                <div>
                  <GameForm />
                </div>
                <br />
                <center>
                  <h3>Game Rooms Active</h3>
                </center>
                <ListRooms url="/games/allgames" />
              </Col>
             
                <Col md="4">
                <Chatbox userid={this.state.userid} url="lobby" />
              </Col>

            </Row>
          </Container>

          </div>
      </body>
      
    );
  }
}