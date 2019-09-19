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

const container = {
    width: '30rem',
    height:'auto',
    display: 'inline-flex',
    marginLeft: '28%',
    marginTop: '3rem',
    borderStyle: 'solid',
    borderWidth: '0.05rem',
    borderRadius: '0.2rem',
    borderColor: 'black',
    padding: '0.1rem 1rem',

}

const headerDiv = {
    textAlign: 'center'
}
const bodyStyle = {
    
}
class ShotaEbikawa extends React.Component {
    render() {
        return ( 
            <body style={bodyStyle}>
              <Link style={backButton} to="About">to About</Link>
              <div style={{marginLeft: "10vh"}}>
                <div style={headerDiv}>
                    <h1>
                        Shota Ebikawa
                    </h1>
                </div>
                <div style = {container}>
                    <p>Hi my name is Shota Ebikawa and I am currently a Senior. This will be my final semester, and I am looking forward to work with this team.</p>
                </div>
              </div>
            </body>
        );
    }
} export default ShotaEbikawa;