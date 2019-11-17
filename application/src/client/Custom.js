import React, { Component } from 'react'
import Header from './Components/Header'
import { retrieveCookie } from "./Components/cookies"
import { Redirect } from 'react-router-dom'
import { Button, ButtonToolbar } from 'react-bootstrap'
import ShowDeck from './ShowDeck'

export default class Custom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userid: retrieveCookie("userid"),
            deckShow: false,
            calledDeck: 0,
            redirectTo: "",
            redirect: false,
            decklist: [{ name: "Deck1", cards: ["big black cock", "an ar15 assault rifle"] }],
        }
        console.log(this.state.decklist);

    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={redirectTo} />
        }
    }

    componentDidMount() {
        /*if (!retrieveCookie("userid")) {
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

    handleClick = event => {
        /*for (let i = 0; i < this.state.decklist.length; i++) {
            if (this.state.decklist[i].name == event.target.value) {
                this.setState({ calledDeck: i })
                break
            }
        }
        */
        this.setState({ deckShow: true })
        console.log(this.state.calledDeck);
    }

    render() {
        let deckClose = () => this.setState({ deckShow: false })
        return (
            <div>
                {this.renderRedirect()}
                <Header />
                <div className="BodyWrapper">
                    <div className="DeckList">
                        {this.state.decklist.map(d => {
                            return (
                                <div>
                                    <ButtonToolbar>
                                        <Button varian='primary' value={d.name} onClick={this.handleClick}>
                                            {d.name}
                                        </Button>
                                        <ShowDeck
                                                show={this.state.deckShow}
                                                onHide={deckClose}
                                        />
                                    </ButtonToolbar>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
