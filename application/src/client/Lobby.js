import React, { Component } from 'react';
import Header from './Components/Header';
import { retrieveCookie } from './Components/cookies';
import './app.css';
import Chatbox from './Components/Chatbox';
import ListRooms from './Components/ListRooms';

export default class Lobby extends Component {
  state = {
    userid: retrieveCookie('userid')
  };

  componentDidMount() {
    if (!retrieveCookie('userid')) {
      alert('please log in!');
    }
  }

  render() {
    return (
      <div className="homePage">
        <Header userid={this.state.userid} />

        <body>
          <h1>
            <center>Cards Against Society</center>
          </h1>

          <div className="row">
            <div className="column2">
              <p>Active Game Rooms</p>
              <ListRooms url="http://localhost:4000/game/allgames" />
              <p />
            </div>
            <div className="column">
              <h3>About The Game</h3>
              <p>
                Cards Against Society is a party game based on Cards Against
                Humanity in which players complete fill-in-the-blank statements
                using words or phrases typically deemed as offensive, risqué or
                politically, incorrect printed on playing cards. It has been
                compared to the 1999 card game Apples to Apples and originated
                from a Kickstarter campaign in 2011.
              </p>

              <div className="text-center chatbox">
                <Chatbox userid={this.state.userid} url="lobby" />
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}
