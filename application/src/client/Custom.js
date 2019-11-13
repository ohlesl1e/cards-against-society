import React, { Component } from 'react';
import Header from './Components/Header';
import { retrieveCookie } from "./Components/cookies";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Custom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: retrieveCookie("userid"),
            customCard: null,
            whiteCard: false,
            redirect: false,
            formErrors: {
                userid: '',
                customCard: '',
                whiteCard: ''
            }
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/Lobby' />
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(event.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            url: "/api/addcustomcard",
            data: {
                userid: this.state.userid,
                customCard: this.state.customCard,
                whiteCard: this.state.whiteCard,
            }
        }).then(res => {
            console.log(this.state);
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })
    }

    componentDidMount() {
        if (!retrieveCookie("userid")) {
            alert("please log in!");
        }
    }

    render() {
        return (
            <div className="Custom">
                {this.renderRedirect()}
                <Header />
                <form onSubmit={this.handleSubmit}>
                    <input type="radio" name="whiteCard" value="true" onInput={this.handleChange} /> White Card<br />
                    <input type="radio" name="whiteCard" value="false" onInput={this.handleChange} /> Black Card<br />
                    <div className="">
                        <label htmlFor="customCard">Card Content: </label><br />
                        <input
                            placeholder="Biggest blackest cock"
                            type="text"
                            name="customCard"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div><br />
                    <div>
                        <button onClick={this.handleSubmit}>Submit</button>
                        <button onClick={this.setRedirect}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}
