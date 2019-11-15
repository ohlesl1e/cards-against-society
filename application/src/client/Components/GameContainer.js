import React, { Component } from 'react';
import io from 'socket.io-client';
import {
  ListGroup,
  Button,
  Form,
  Row,
  Col,
  Container,
  Card
} from 'react-bootstrap';
import PlayerList from './PlayerList';
import '../app.css';

export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect(
        'http://localhost:8080/lobby'
        // +this.props.url
      ),
      data: '',
      blackCard: '',
      HostUserid: ''
    };
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    fetch('http://localhost:4000/game/' + this.props.gameid)
      .then(response => response.json())
      .then((res) => {
        this.setState(
          {
            data: res,
            blackCard: res[1]
          },
          () => console.log()
        );
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
              <PlayerList />
            </div>
          </Col>
          <Col md="9" className="game-container">
            <Row>
              <Card className="white-card">white card</Card>
              <Card className="white-card">white card</Card>
              <Card className="white-card">white card</Card>
              <Card className="white-card">white card</Card>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
