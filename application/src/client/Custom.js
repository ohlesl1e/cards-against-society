import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button, ButtonToolbar, Col, Row, Container
} from 'react-bootstrap';
import Header from './Components/Header';
import { retrieveCookie } from './Components/Cookies';
import ShowDeck from './ShowDeck';
import AddDeck from './AddDeck';
import './CustomCard.css';

export default class Custom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: retrieveCookie('userid'),
      deckShow: false,
      newFormShow: false,
      calledDeck: 0,
      redirectTo: '',
      redirect: false,
      decklist: [
        {
          name: 'Deck1',
          cards: [
            { type: 'white', content: 'a big black duck' },
            { type: 'white', content: 'an ar15 assault rifle' },
            { type: 'black', content: 'the class trip was ruined by________' }
          ]
        },
        {
          name: 'Deck2', cards: [
            { type: 'black', content: 'what\'s wrong with the jews?' },
            { type: 'white', content: 'hitler\'s mustache' },
            { type: 'white', content: 'drinking alone' },
            { type: 'white', content: 'the entire internet' },
            { type: 'black', content: 'I drink to forget________' },
            { type: 'black', content: 'daddy, why is mommy crying?' },
            { type: 'white', content: 'the glass ceiling' },
            { type: 'black', content: 'hey baby, come back to my place and I\'ll show you' },
            { type: 'white', content: 'pulling out' },
            { type: 'white', content: 'men' },
            { type: 'black', content: 'lifetime presents________, the story of________' },
          ]
        },
        {
          name: "Jozo's Reader",
          cards: [
            { type: 'white', content: 'prolog' },
            { type: 'white', content: 'c++ has bad taste' },
            { type: 'black', content: 'ruby is better because_________' },
            { type: 'white', content: 'Cyber boolean' },
            { type: 'white', content: 'not enough cache' },
            { type: 'black', content: 'why didn\'t the client tip the server?' },
            { type: 'white', content: 'insert jozo lecture.mp4' },
          ]
        },
        {
          name: 'Harry Potter Erotica',
          cards: [
            { type: 'white', content: 'explosions' },
            { type: 'white', content: 'all my dead sisters' },
            {
              type: 'black',
              content: 'america is hungry. america wants________'
            },
            { type: 'white', content: 'a lifetime of sadness' },
            { type: 'white', content: 'health minister of belgium' },
            { type: 'white', content: "trump's hair" },
            {
              type: 'black',
              content: "say it loud! I'm__________ and I'm proud!"
            }
          ]
        },
        {
          name: 'Religions',
          cards: [
            { type: 'black', content: 'the academy award goes to________' },
            { type: 'white', content: 'asian jesus' },
            { type: 'black', content: 'Iraq' },
            { type: 'white', content: 'cheat on your husband then start a religion to cover it up' },
            { type: 'white', content: 'grandma' },
          ]
        }
      ]
    };
    console.log(this.state.decklist);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={redirectTo} />;
    }
  };

  componentDidMount() {
    /* if (!retrieveCookie("userid")) {
            alert("please log in!");
        }
        Axios({
            method: "POST",
            url: "/api/getalldecks",
            data: {
                userid: this.state.userid
            }
        })
            .then((res) => {
                console.log(res.data);
                const decklist = res.data;
                console.log({ decklist });
                this.setState({ decklist })
            }).catch((e) => {
                console.log(e);
            })
            */
  }

  handleClick = (event) => {
    console.log("event value" + event.target.value);
    console.log("event id" + event.target.id);

    for (let i = 0; i < this.state.decklist.length; i++) {
      if (this.state.decklist[i].name == event.target.value) {
        this.setState({ calledDeck: i });
        break;
      }
    }
    this.setState({ deckShow: true });
    console.log(this.state.calledDeck);
  };

  newDeckForm = () => {
    this.setState({ newFormShow: true });
  };

  render() {
    const deckClose = () => this.setState({ deckShow: false });
    const newFormClose = () => this.setState({ newFormShow: false });
    const border = {
      border: 'solid 1px black',
      borderRadius: '5px',
      padding: '10px',
      alignSelf: 'auto',
    };
    return (
      <div>
        {this.renderRedirect()}
        <Header />
          <div className="DeckList">
            <Container>
              <Row>
                <Col>
                  <h2>Custom Decks</h2>
                </Col>
                <Col sm="2">
                  <ButtonToolbar>
                    <Button onClick={this.newDeckForm}>Add Deck</Button>
                    <AddDeck
                      show={this.state.newFormShow}
                      onHide={newFormClose}
                      decklist={this.state.decklist}
                    />
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row style={border}>
                  {this.state.decklist.map(d => (
                    <Col md="4">
                      <ButtonToolbar>
                        <Button
                          className="CustomDeck"
                          variant="dark"
                          size="lg"
                          value={d.name}
                          onClick={this.handleClick}
                        >
                          <h3>{d.name}</h3>
                        </Button>
                        <ShowDeck
                          show={this.state.deckShow}
                          onHide={deckClose}
                          decklist={this.state.decklist}
                          deck={this.state.decklist[this.state.calledDeck]}
                          index={this.state.calledDeck}
                        />
                      </ButtonToolbar>
                    </Col>
                  ))}
              </Row>
            </Container>
          </div>
          <div className="footer"></div>
        </div>
    );
  }
}
