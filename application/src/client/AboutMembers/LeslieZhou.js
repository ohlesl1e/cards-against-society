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

class LeslieZhou extends React.Component {
    render() {
        return ( 
            <body>
              <Link style={backButton} to="About">to About</Link>
              <div style={{marginLeft: "10vh"}}>
                <h1>
                    Leslie Zhou
                </h1>
            <p>
            Leslie is a Computer Science undergraduate student at San Francisco
            State University.
          </p>
              </div>
            </body>
        );
    }
} export default LeslieZhou;
