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
      <body>
        <div className="homePage">
         <Header userid={this.state.userid} />
        </div>
          <div className="lobby">
           <center><h3>Game Rooms Active</h3></center>
           
            <br/>
              <p>Active Game Rooms:</p>
               <ListRooms url="http://localhost:4000/game/allgames" />
              <Chatbox userid={this.state.userid} />
          </div>
      </body>
    );
  }
}
