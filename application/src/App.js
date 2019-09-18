import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const backButton = {
  background: "white",
  color: "#1b1b1e",
  border: "none",
  cursor: "pointer",
  fontSize: "12px",
  textDecoration: 'none'
}

class App extends React.Component {
  render() {
    return(
      <body>
        <h1>
          <center>
            Cards Against Society
          </center>
        </h1>
        <h4>
          <center>
          CSC648-04 / Fall 2019 / Team 203
          </center>
        </h4>
        <Link style={backButton} to="About">to About</Link>
        <p>
        </p>
      </body>
    )}
} export default App;