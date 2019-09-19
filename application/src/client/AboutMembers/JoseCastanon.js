import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const backButton = {
  background: 'white',
  color: '#1b1b1e',
  border: 'none',
  cursor: 'pointer',
  fontSize: '12px',
  textDecoration: 'none'
};

class JoseCastanon extends React.Component {
  render() {
    return (
      <body>
        <Link style={backButton} to="About">
          to About
        </Link>
        <div style={{ marginLeft: '10vh' }}>
          <h1>Jose Castanon</h1>
          <p>
            Jose is a senior Computer Science undergraduate at San Francisco
            State University.
          </p>
        </div>
      </body>
    );
  }
}
export default JoseCastanon;
