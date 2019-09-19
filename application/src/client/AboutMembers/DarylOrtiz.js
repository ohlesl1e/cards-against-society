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

class DarylOrtiz extends React.Component {
    render() {
        return ( 
            <body>
              <Link style={backButton} to="About">to About</Link>
              <div style={{marginLeft: "10vh"}}>
                <h1>
                    Daryl Ortiz
                </h1>
                <p>
                    I am a Senior graduating this semester. My major is computer science with a focus on web development. I am from San Diego looking for the many opportunities that San Francisco has to offer.
                </p>
              </div>
            </body>
        );
    }
} export default DarylOrtiz;