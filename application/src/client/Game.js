import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Components/Header';
import { retrieveCookie } from './Components/cookies';
import Chatbox from './Components/Chatbox';

export default class Game extends Component {
  state = {
    userid: retrieveCookie('userid')
  };

  render() {
    return (
      <div>
        <Header userid={this.state.userid} />
        <Container>
          <br />
          <Row>
            <Col md="3">
              <div className="text-center">
                <Chatbox userid={this.state.userid} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
