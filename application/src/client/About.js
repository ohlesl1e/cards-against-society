import React, { Component } from 'react';
import './About.css';
import Header from './Components/Header';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap';

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

const aboutBody = {
  padding: '200px'
}

export default class About extends Component {
  render() {
    return (

      
      <body>
        <Header />
        <Container>
        <div className="title">
          <center><h5>About The Game</h5></center>
          </div>

          <div className="aboutBody">
          
              Cards Against Society is a party game based on Cards Against Humanity in which players complete 
              fill-in-the-blank statements using words or phrases typically deemed as offensive, risqué or politically, incorrect printed on playing cards. 
              It has been compared to the 1999 card game Apples to Apples and originated from a Kickstarter campaign in 2011.
              <br /><br />
              The application was created with knowledge of basic software endineering methods and practices.
              <br /><br />
            
         <center><h5>About The Team</h5></center>
            <br/>
               The motives for this web application is to be able to simulate how a team functions in the industry. 
                The team is composed of 5 members down below each with different skill sets and levels of software engineering ranging from front-end, back-end and full-stack.
          </div>

          
            <br/>
            <center><h7>Click member's name to learn about them!</h7></center>
      <div className="aboutTeam">
          <Link style={teamAboutButton} to="JoseCastanon">
            Jose Castanon
          </Link>
        
          <Link style={teamAboutButton} to="LeslieZhou">
            Leslie Zhou
          </Link>
        
          <Link style={teamAboutButton} to="ShotaEbikawa">
            Shota Ebikawa
          </Link>
        
          <Link style={teamAboutButton} to="DarylOrtiz">
            Daryl Ortiz
          </Link>
       
          <Link style={teamAboutButton} to="BrianLe">
            Brian Le
          </Link>
          </div>
          </Container>
      </body>
    );
  }
}
