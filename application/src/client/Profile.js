import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import Header from "./Components/Header";
import { retrieveCookie } from './Components/Cookies';

export default class Profile extends Component {
  state = {
    userid: retrieveCookie('userid')
  };

  componentDidMount() {
    if (!retrieveCookie('userid')) {
      alert('please log in!');
    }
  }

  render() {
    return (
      <body>
        <div className="homePage">
          <Header userid={this.state.userid} />
          <div className="row">
            <div className="column">
              <Form>
                <Form.Group controlId="formGroupEmail">
                  <center>
                    <h5>
                      <Form.Label>Profile</Form.Label>
                    </h5>
                  </center>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    value="Username"
                    class="field left"
                    readonly
                  />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value="Password"
                    class="field left"
                    readonly
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value="Email"
                    class="field left"
                    readonly
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
