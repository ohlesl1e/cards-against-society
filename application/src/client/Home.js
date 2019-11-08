import React, { Component } from 'react';
import Registration from './Registration';
import UserSearch from './Components/UserSearch';
import { Link } from 'react-router-dom';
import Header from './Components/Header';


const backButton = {
  background: 'white',
  color: '#1b1b1e',
  border: 'none',
  cursor: 'pointer',
  fontSize: '12px',
  textDecoration: 'none'
};

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
        <p />
      </body>
    );
  }
}
