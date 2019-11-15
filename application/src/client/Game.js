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
      data: null,
      userid: retrieveCookie('userid')
    };
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    fetch('/game/' + this.props.gamesessionid)
      .then(response => response.json())
      .then((res) => {});
  }

  render() {
    return (
      <div className="game-page">
        <Header userid={this.state.userid} />
        <GameContainer />
        <Container>
          <br />
          <Row />
          <Row>
            <Col md="9">
              <div className="text-center chatbox">
                <Chatbox userid={this.state.userid} />
              </div>
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
    );
  }
}
