/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import '../app.css';
import { deleteCookie } from "./cookies";

export default class Header extends Component {
   logout() {
     deleteCookie();
   }

  render() {
    return (
      <header>
        <Navbar className="navbar" expand="lg">
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
            <Link to="/Help">
              <Nav.Item className="navselection">Help</Nav.Item>
            </Link>
            <Navbar.Collapse className="justify-content-end">
              <NavDropdown id="basic-nav-dropdown">
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
