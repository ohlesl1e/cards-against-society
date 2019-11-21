import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, ButtonToolbar, Col, Row, Container } from "react-bootstrap";
import Header from "./Components/Header";
import { retrieveCookie } from "./Components/Cookies";
import ShowDeck from './ShowDeck';
import AddDeck from './AddDeck';

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
            { type: 'black', content: 'an ar15 assault rifle' }
          ]
        },
        { name: 'Deck2', cards: [{ type: 'black', content: 'jews' }] }
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
      padding: '10px'
    };
    return (
      <div>
        {this.renderRedirect()}
        <Header />
        <div className="BodyWrapper">
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
                  <Col>
                    <ButtonToolbar>
                      <Button
                        variant="primary"
                        value={d.name}
                        onClick={this.handleClick}
                      >
                        {d.name}
                      </Button>
                      <ShowDeck
                        show={this.state.deckShow}
                        onHide={deckClose}
                        decklist={this.state.decklist}
                        deck={this.state.decklist[this.state.calledDeck]}
                      />
                    </ButtonToolbar>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
