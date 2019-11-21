/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../app.css';
import { retrieveCookie, deleteCookie } from './Cookies';

export default class Header extends Component {
  constructor(props) {
    super();
    this.isAdmin = this.isAdmin.bind(this);
  }

  logout() {
    deleteCookie();
  }

  isAdmin() {
    if (retrieveCookie() === 'admin') {
      return (
        <Link to="/Admin">
          <Nav.Item className="navselection">Admin</Nav.Item>
        </Link>
      );
    }
    return <div />;
  }

  render() {
    return (
      <header>
        <Navbar className="navbar" expand="lg" bg="dark" variant="dark">
          <Link to="/Lobby">
            <Navbar.Brand href="#home" className="navselection">
              Cards Against Society
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Link to="/MyGames">
              <Nav.Item className="navselection">My Games</Nav.Item>
            </Link>
            <Link to="/FAQ">
              <Nav.Item className="navselection">Help</Nav.Item>
            </Link>
            {this.isAdmin()}
            <Navbar.Collapse className="justify-content-end">
              <NavDropdown id="basic-nav-dropdown">
                <Link to="/Profile">
                  <NavDropdown.Item href="#profile">
                    Profile
                  </NavDropdown.Item>
                </Link>
                <Link to="/Custom">
                  <NavDropdown.Item href="#custom">
                    Custom Cards
                  </NavDropdown.Item>
                </Link>
                <Link to="/">
                  <NavDropdown.Item href="#login" onClick={() => this.logout()}>
                    Log Out
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
              <Navbar.Text>{this.props.userid}</Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>
        <br />
      </header>
    );
  }
}
