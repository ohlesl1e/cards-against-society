import React, { Component } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import Header from "./Components/Header";
import { retrieveCookie } from "./Components/Cookies";
import Chatbox from "./Components/Chatbox";
import GameContainer from "./Components/GameContainer";
import ChatContainer from "./Components/ChatContainer";
import {Redirect} from "react-router-dom"

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      userid: retrieveCookie("userid"),
      notloggedin: false
    };
  }

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
      <div>
        {this.notLoggedInRedirect()}
        <Header userid={this.state.userid} />
        <div className="game-page">
          <GameContainer gameid={this.props.match.params.gameid} />
          <Container>
            <br />
            <Row className="justify-content-center">
              <Col md="9" className="justify-content-center game-row">
                <ChatContainer
                  className="chat-container"
                  userid={this.state.userid}
                  url={"games/" + this.props.match.params.gameid}
                />
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
