import React, { Component } from 'react';
import io from 'socket.io-client';
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
} from 'react-bootstrap';
import PlayerList from './PlayerList';
import '../app.css';
import { retrieveCookie } from './Cookies';

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
      socket: io.connect(
        'http://52.53.156.79:8080/lobby'
        // +this.props.url
      ),
      data: '',
      hand: [],
      blackCard: '',
      HostUserid: ''
    };
    this.getInfo = this.getInfo.bind(this);
    this.handBuilder = this.handBuilder.bind(this);
    this.resetCards = this.resetCards.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    fetch(`http://localhost:4000/games/${this.props.gameid}`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ userid: retrieveCookie() }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((res) => {
        this.setState(
          {
            data: res,
            hand: res[0],
            blackCard: res[1]
          },
          () => console.log()
        );
      });
  }

  handBuilder() {
    const children = [];
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
              ? 'white-card-selected white-card'
              : 'white-card'
          }
        >
          {this.state.hand[i]}
        </Card>
      );
    }
    return <Row className="justify-content-center">{children}</Row>;
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
              <PlayerList />
            </div>
          </Col>
          <Col md="9" className="game-container">
            <div className="game-display">
              <Row>
                <Card className="white-card">
                  Player 1
                  <Card.Body>
                    <Spinner animation="border" variant="dark" size="sm" />
                  </Card.Body>
                </Card>
                <Card className="white-card">
                  Player 2
                  <Card.Body>
                    <Spinner animation="border" variant="dark" size="sm" />
                  </Card.Body>
                </Card>
                <Card className="white-card">
                  Player 3
                  <Card.Body>
                    <Spinner animation="border" variant="dark" size="sm" />
                  </Card.Body>
                </Card>
                <Card className="white-card">
                  Player 4
                  <Card.Body>
                    <Spinner animation="grow" variant="dark" size="sm" />
                  </Card.Body>
                </Card>
                <Card className="white-card">
                  Player 5
                  <Card.Body>
                    <Spinner animation="border" variant="dark" size="sm" />
                  </Card.Body>
                </Card>
              </Row>
            </div>
            <Row className="justify-content-end">
              <ButtonGroup vertical size="lg">
                <Button variant="dark">Submit</Button>
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
