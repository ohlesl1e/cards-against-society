import React, { Component } from "react";
import io from "socket.io-client";
import {
  ListGroup,
  Button,
  Form,
  ButtonGroup,
  Row,
  Col,
  Container,
  Card,
  Spinner
} from "react-bootstrap";
import PlayerList from "./PlayerList";
import "../app.css";
import { retrieveCookie } from "./Cookies";
import { func } from "prop-types";

export default class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardsSelected: [
        [0, false],
        [1, false],
        [2, false],
        [3, false],
        [4, false]
      ],
      cardlist: [],
      socket: io.connect("http://localhost:8080/games/" + this.props.gameid, {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10
      }),
      data: "",
      hand: null,
      blackCard: "",
      BCH: null,
      pick: null,
      players: null,
      HostUserid: "",
      allPlayersSubmitted: null,
      playerHasSubmitted: null,
      playerSelections: null,
      points: null
    };
    this.getInfo = this.getInfo.bind(this);
    this.handBuilder = this.handBuilder.bind(this);
    this.resetCards = this.resetCards.bind(this);
    this.checkHand = this.checkHand.bind(this);
    this.gameLayout = this.gameLayout.bind(this);
    this.submitSelection = this.submitSelection.bind(this);
    this.receiveState = this.receiveState.bind(this);
    this.updateState = this.updateState.bind(this);
    this.checkBCH = this.checkBCH.bind(this);
  }

  componentDidMount() {
    this.receiveState();
    this.state.socket.emit("subscribeToState");
    this.state.socket.on("state", () => this.receiveState());
  }

  getInfo() {
    // retrieves game info
    fetch(`http://localhost:4000/games/${this.props.gameid}`, {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({ userid: retrieveCookie() }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        this.setState(
          {
            data: res,
            hand: res[0],
            blackCard: res[1],
            players: res[2],
            BCH: res[3],
            pick: res[4],
            allPlayersSubmitted: res[5],
            playerHasSubmitted: res[6],
            playerSelections: res[7],
            points: res[8]
          },
          () => console.log()
        );
      });
  }

  receiveState() {
    console.log("state received");
    this.getInfo();
    this.setState({}, () => console.log());
  }

  updateState() {
    this.state.socket.emit("subscribeToState");
    this.setState({}, () => console.log());
  }

  submitSelection() {
    if (!this.checkBCH()) {
      if (this.state.cardlist.length !== this.state.pick) {
        alert("please pick " + this.state.pick + " card(s)");
        this.resetCards();
      } else {
        const cards = [];
        for (let i = 0; i < 5; i++) {
          if (this.state.cardsSelected[i][1]) {
            cards.push(this.state.hand[i][0]);
          }
        }
        fetch(`http://localhost:4000/games/update/${this.props.gameid}`, {
          method: "POST",
          credentials: "same-origin",
          body: JSON.stringify({
            userid: retrieveCookie(),
            cards
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {if(!response.ok){
            alert('You\\\'ve already picked your cards');
          }
        }
          )
          .then(this.updateState(), this.resetCards());
      }
    } else {
      const index = this.state.cardlist[0];
      const winner = this.state.playerSelections[index].userid;
      fetch(`http://localhost:4000/games/submitWinner/${this.props.gameid}`, {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify({ winner }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(this.updateState(), this.resetCards());
    }
  }

  handBuilder() {
    // renders player's hand
    if (!this.checkBCH()) {
      const children = [];
      console.log(this.state);
      for (let i = 0; i < 5; i++) {
        children.push(
          <Card
            onClick={() => {
              const cards = this.state.cardsSelected;
              cards[i][1] = !cards[i][1];
              this.setState({
                cardsSelected: cards
              });

              if (!this.state.cardlist.includes(i)) {
                this.state.cardlist.push(i);
              } else {
                const cardls = this.state.cardlist;
                const index = cardls.indexOf(i);
                if (index !== -1) {
                  cardls.splice(index, 1);
                  this.setState({ cardlist: cardls });
                }
              }
            }}
            className={
              this.state.cardsSelected[i][1]
                ? "white-card-selected white-card"
                : "white-card"
            }
          >
            {this.checkHand(i)}
          </Card>
        );
      }
      return <Row className="justify-content-center">{children}</Row>;
    }
    return (
      <Row className="justify-content-center" md ='auto'>
        <Card bg="dark" text="white" className="black-card">
          <h2>You are the black card holder</h2>
        </Card>
      </Row>
    );
  }

  checkHand(i) {
    if (this.state.hand !== null) {
      return this.state.hand[i][0];
    }
  }

  checkBCH() {
    if (retrieveCookie() === this.state.BCH) {
      return true;
    }
    return false;
  }

  gameLayout() {
    // displays player's status
    if(this.state.players !== null && this.state.players.length <= 1){
      return (
        <div className={"game-display"}>
          <Col>Waiting for other players to join...
            <br/> 
          <Spinner animation="border" variant="dark" size="sm" />
          </Col>
        </div>
      );
    }
    else if (this.state.playerSelections !== null) {
      if (this.state.cardlist.length > 1) {
        alert("pick one winner. \n one winner i tell ya!!");
        this.resetCards();
      } else {
        const children = [];
        for (let i = 0; i < this.state.playerSelections.length; i++) {
          const cards = [];
          for (
            let j = 0;
            j < this.state.playerSelections[i].cards.length;
            j++
          ) {
            cards.push(
              <Card className="player-submission">
                {this.state.playerSelections[i].cards[j]}
              </Card>
            );
          }
          children.push(
            <Col md = 'auto'
              onClick={() => {
                console.log(this.state);
                const cards = this.state.cardsSelected;
                cards[i][1] = !cards[i][1];
                this.setState({
                  cardsSelected: cards
                });

                if (!this.state.cardlist.includes(i)) {
                  this.state.cardlist.push(i);
                } else {
                  const cardls = this.state.cardlist;
                  const index = cardls.indexOf(i);
                  if (index !== -1) {
                    cardls.splice(index, 1);
                    this.setState({ cardlist: cardls });
                  }
                }
              }}
              className={
                this.state.cardsSelected[i][1]
                  ? "selection-selected selection"
                  : "selection"
              }
            >
              {this.state.playerSelections[i].userid}
              {cards}
            </Col>
          );
        }

        return (
          <div className={this.checkBCH() ? "game-display-submitted" : ""}>
            <Row>{children}</Row>
          </div>
        );
      }
    }
    if (this.state.players !== null) {
      const children = [];
      console.log(this.state);
      for (let i = 0; i < this.state.players.length; i++) {
        let playerStatus;
        if (this.state.players[i] === this.state.BCH) {
        } else {
          playerStatus = (
            <Spinner animation="border" variant="dark" size="sm" />
          );
        }

        children.push(
          <Card className="white-card">
            {this.state.players[i]}
            <Card.Body>{playerStatus}</Card.Body>
          </Card>
        );
      }
      return (
        <div className={this.checkBCH() ? "game-display" : ""}>
          <Row>{children}</Row>
        </div>
      );
    }
  }

  resetCards() {
    this.setState({
      cardsSelected: [
        [0, false],
        [1, false],
        [2, false],
        [3, false],
        [4, false]
      ],
      cardlist: []
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="3">
            <div>
              <Card bg="dark" text="white" className="black-card">
                <Card.Body>
                  <Card.Text>{this.state.blackCard}</Card.Text>
                  <Card.Text>*pick {this.state.pick} card(s)*</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card bg="dark" text="white">
                <Card.Body>
                  <Card.Text>time left in turn: 0:50</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <PlayerList points={this.state.points} />
            </div>
          </Col>
          <Col md="9" className="game-container">
            {this.gameLayout()}
            <Row className="justify-content-end">
              <ButtonGroup vertical size="lg">
                <Button onClick={this.submitSelection} variant="dark">
                  Submit
                </Button>
                <Button onClick={this.resetCards} variant="dark">
                  Reset Selection
                </Button>
              </ButtonGroup>
            </Row>
            {this.handBuilder()}
          </Col>
        </Row>
      </Container>
    );
  }
}
