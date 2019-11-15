import React, { Component } from 'react';
import PlayerList from './PlayerList';
import io from 'socket.io-client';
import { ListGroup, Button, Form,Row,Col, Container, Card } from 'react-bootstrap';
import '../app.css';

export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect(
        'http://localhost:8080/lobby'
        // +this.props.url
      )
    };

  }

  componentDidMount = () => {
    
  };


  render = () => (
    <Container>
      <Row>
        <Col md="3">
        <div>
        <Card bg="dark" text="white" className='black-card'>
          <Card.Body>
            <Card.Text>
              You know what they say, the __________ doesn't fall far from the tree
            </Card.Text>
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
