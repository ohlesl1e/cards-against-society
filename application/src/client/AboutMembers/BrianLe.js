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

class BrianLe extends React.Component {
    render() {
        return ( 
            <body>
              <Link style={backButton} to="About">to About</Link>
              <div style={{marginLeft: "10vh"}}>
                <h1>
                    Brian T. Le
                </h1>
                <p>
                    Brian is a senior Compuer Science undergraduate at San Francisco State University with expectancy to graduate this Spring 2020.
                </p>
                He is currently taking:  CSC300GW, CSC600, CSC648, CSC651, and CSC675 this Fall 2019.
              </div>
            </body>
        );
    }
} export default BrianLe;