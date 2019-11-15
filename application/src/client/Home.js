import React, { Component } from 'react';
import Header from './Components/Header';
import { Link } from "react-router-dom";
import "./app.css";

export default class Home extends Component {
  render() {
    return (
      
      <body>
        <Header />
        <h1>
          <center>Cards Against Society</center>
        </h1>
        <h4>
          <center>CSC648-04 / Fall 2019 / Team 203</center>
        </h4>
      
      
        <div class="row">
          <div class= "column">
          <p>Active Game Rooms:</p>
          <h3>Game Rooms Active</h3>
          <p></p>
          </div>
          <div class ="column">
            <h3>About The Game</h3>
            <p>
              Cards Against Society is a party game based on Cards Against Humanity in which players complete 
              fill-in-the-blank statements using words or phrases typically deemed as offensive, risqué or politically, incorrect printed on playing cards. 
              It has been compared to the 1999 card game Apples to Apples and originated from a Kickstarter campaign in 2011.
              </p>
          </div>
          </div>
      </body>
    );
  }

}
