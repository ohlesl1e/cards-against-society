import React, { Component } from 'react';
// import './index.css';
import './About.css';
import { Link } from 'react-router-dom';

const teamAboutButton = {
  background: 'white',
  borderRadius: '5px',
  color: '#1b1b1e',
  padding: '8px 15px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  textDecoration: 'none'
};

export default class About extends Component {
  render() {
    return (
      <body>
        <h1>
          <center>Cards Against Society</center>
        </h1>
        <h4>
          <center>CSC648-04 / Fa19 / Team 203</center>
        </h4>
        <div style={{ marginLeft: '25vh', marginTop: '10vh' }}>
          <Link style={teamAboutButton} to="JoseCastanon">
            Jose Castanon
          </Link>
        </div>
        <div style={{ marginLeft: '25vh', marginTop: '5vh' }}>
          <Link style={teamAboutButton} to="LeslieZhou">
            Leslie Zhou
          </Link>
        </div>
        <div style={{ marginLeft: '25vh', marginTop: '5vh' }}>
          <Link style={teamAboutButton} to="ShotaEbikawa">
            Shota Ebikawa
          </Link>
        </div>
        <div style={{ marginLeft: '25vh', marginTop: '5vh' }}>
          <Link style={teamAboutButton} to="DarylOrtiz">
            Daryl Ortiz
          </Link>
        </div>
        <div style={{ marginLeft: '25vh', marginTop: '5vh' }}>
          <Link style={teamAboutButton} to="BrianLe">
            Brian Le
          </Link>
        </div>
      </body>
    );
  }
}
