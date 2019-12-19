import React, { Component } from 'react';
import Header from './Components/Header';
import { retrieveCookie } from './Components/Cookies';
import './app.css';
import Chatbox from './Components/Chatbox';
import GameForm from './Components/GameForm';
import ListRooms from './Components/ListRooms';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default class Lobby extends Component {
  state = {
    userid: retrieveCookie("userid"),
    notloggedin: false
  };

  notLoggedInRedirect = () => {
    if (this.state.notloggedin) {
      return <Redirect to={'./'} />;
    }
  };

  componentDidMount() {
    if (!retrieveCookie("userid")) {
      this.setState({notloggedin: true})
      alert("please log in!");
    }
  }

  render() {
    return (
      
      <body>
        {this.notLoggedInRedirect()}

        <div className="homePage">
          <Header userid={this.state.userid} />
        </div>


        <div className="lobby">
          <Container>
            <Row>

              <Col md="6">
                <div>
                  <GameForm />
                </div>
                <br />
                <ListRooms url="/games/allgames" />
              </Col>
             
              <Col md="6" className="lobby-chat">
                  
              <div className="pchat">
                  <div class="panel panel-default">
                    <div class="panel-heading"><h6>Public Chat</h6></div>
                  </div>
                  </div>

              <div className="rusers"></div>
              
                <Chatbox userid={this.state.userid} url="lobby" />
              </Col>
            </Row>
          </Container>

          </div>
      </body>
      
    );
  }
}