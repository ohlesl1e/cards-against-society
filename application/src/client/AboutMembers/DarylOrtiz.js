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
              </div>
            </body>
        );
    }
} export default DarylOrtiz;