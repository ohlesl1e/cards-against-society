<<<<<<< HEAD
import React, { Component } from 'react';
import Header from './Components/Header';
import { retrieveCookie } from './Components/Cookies';
import './app.css';
import Chatbox from './Components/Chatbox';
import GameForm from './Components/GameForm';
import ListRooms from './Components/ListRooms';
import UserList from './Components/UserList';
import { Container, Row, Col } from 'react-bootstrap';
=======
import React, { Component } from "react";
import Header from "./Components/Header";
import { retrieveCookie } from "./Components/Cookies";
import "./app.css";
import Chatbox from "./Components/Chatbox";
import GameForm from "./Components/GameForm";
import ListRooms from "./Components/ListRooms";
import { Container, Row, Col } from "react-bootstrap";
>>>>>>> bdb20a398819a61386719b45f2930904a6666e6e

export default class Lobby extends Component {
  state = {
    userid: retrieveCookie("userid")
  };

  componentDidMount() {
    if (!retrieveCookie("userid")) {
      alert("please log in!");
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
                <ListRooms url="/games/allgames" />
              </Col>
<<<<<<< HEAD
             
                <Col md="4">
=======
              <Col md="6" className="lobby-chat">
>>>>>>> bdb20a398819a61386719b45f2930904a6666e6e
                <Chatbox userid={this.state.userid} url="lobby" />
              </Col>

            </Row>
          </Container>

          </div>
      </body>
      
    );
  }
}