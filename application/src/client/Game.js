import React, { Component } from 'react';
import {
 Container, Row, Col, ButtonGroup, Button 
} from 'react-bootstrap';
import Header from './Components/Header';
import { retrieveCookie } from './Components/cookies';
import Chatbox from './Components/Chatbox';
import GameContainer from './Components/GameContainer';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      userid: retrieveCookie('userid')
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Header userid={this.state.userid} />
        <div className="game-page">
          <GameContainer gameid={this.props.match.params.gameid} />
          <Container>
            <br />
            <Row className="justify-content-center">
              <Col md="9">
                <Chatbox userid={this.state.userid} url="lobby" />
              </Col>
              <Col md="3">
                <ButtonGroup vertical size="lg">
                  <Button variant="outline-dark">Edit Game Rules</Button>
                  <Button variant="outline-dark">Invite Friends</Button>
                  <Button variant="outline-dark">Kick Player</Button>
                  <Button variant="outline-dark">Leave Room</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
