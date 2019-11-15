import React, { Component } from 'react'
import Header from './Components/Header'
import { retrieveCookie } from "./Components/cookies"
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

export default class Custom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userid: retrieveCookie("userid"),
            calledDeck: "",
            redirectTo: "",
            redirect: false,
            render: false,
            decklist: [{ name: "Deck1", cards: ["big black cock", "an ar15 assault rifle"] }],
        }
        console.log(this.state.decklist);

    }

    setRender = () =>{
        this.setState({
            render: true
        })
    }

    renderDeck = () => {
        if (this.state.render) {
            {this.state.decklist[this.state.calledDeck].cards.map(c => {
                return (
                    <div>{c}</div>
                )
            })}
        }
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
        for (let i = 0; i < this.state.decklist.length; i++) {
            if (this.state.decklist[i].name == event.target.value) {
                this.setState({ calledDeck : i })
                break
            }
        }
        this.setRender()
        console.log(this.state.calledDeck);
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Header />
                <div className="BodyWrapper">
                    <div className="DeckList">
                        {this.state.decklist.map(d => {
                            return (
                                <div>
                                    <button className="Deck" value={d.name} onClick={this.handleClick}>
                                        {d.name}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="ShowDeck">
                        {this.renderDeck}
                    </div>
                </div>
            </div>
        )
    }
}
