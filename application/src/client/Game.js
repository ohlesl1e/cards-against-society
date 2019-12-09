import React, { Component } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import Header from "./Components/Header";
import { retrieveCookie } from "./Components/Cookies";
import Chatbox from "./Components/Chatbox";
import GameContainer from "./Components/GameContainer";
import ChatContainer from "./Components/ChatContainer";
import GameButtons from "./Components/GameButtons";

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      userid: retrieveCookie("userid"),
      url: ""
    };
  }

  componentWillMount = async () => {
    await this.setState({
      url: this.props.match.params.gameid
    });
  };

  render() {
    return (
      <div>
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
                  url={"games/" + this.state.url}
                />
              </Col>
              <Col md="3">
                <GameButtons gameid={this.props.match.params.gameid} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
