import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Image,
  Carousel
} from "react-bootstrap";
import "./app.css";
import { Link } from "react-router-dom";
import { saveCookie } from "./Components/Cookies";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.state = {
      userid: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("http://54.183.228.36:4000/users/login", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 401) {
          alert("Sorry please check log-in credentials");
        } else if (res.password === true) {
          saveCookie(res.userid);
          this.handleRouteChange();
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        alert("Error logging in please try again");
        console.error(err);
      });
  };

  handleRouteChange() {
    this.props.history.push("/lobby");
  }

  validateForm() {
    return this.state.userid.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <div className="wrapper">
        <div className="left">
          <div id="slideshow">
            <Carousel>
              <Carousel.Item>
                <Image
                  src={require("./images/Lobby.png")}
                  fluid
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src={require("./images/CustomCard.png")}
                  fluid
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src={require("./images/BlackCardH.png")}
                  fluid
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src={require("./images/GameSet.png")}
                  fluid
                  alt="Fourth slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <div className="right">
          <div className="wrap2">
            <h1 id="justice">
              <b>Cards Against Society</b>
            </h1>
            <h2 className="centertext">A party game for horrible people</h2>
            <br />
            <form onSubmit={this.handleSubmit}>
              <FormGroup className="userId" controlId="userid">
                <FormLabel>Username</FormLabel>
                <FormControl
                  autoFocus
                  type="username"
                  value={this.state.userid}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  data-toggle="password"
                />
              </FormGroup>
              <Button
                block
                disabled={!this.validateForm()}
                type="submit"
                onClick={this.onSubmit}
              >
                Login
              </Button>
              <Link to="/Registration" className="small">
                Don't Have an Account?
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
