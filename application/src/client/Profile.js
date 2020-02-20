import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import Header from "./Components/Header";
import { retrieveCookie } from './Components/Cookies';
import './app.css';
import {Redirect} from 'react-router-dom';

export default class Profile extends Component {
  state = {
    userid: retrieveCookie('userid'),
    notloggedin: false
  };

  notLoggedInRedirect = () => {
    if (this.state.notloggedin) {
      return <Redirect to={'./'} />;
    }
  };

  componentDidMount() {
    if (!retrieveCookie('userid')) {
      this.setState({notloggedin: true})
      alert('please log in!');
    }
  }

  render() {
    return (
      <body>
        {this.notLoggedInRedirect()}
          <Header userid={this.state.userid} />
          <div className="profile-page">
              <Form>
                  <center>
                    <h5>
                      <FormLabel>Profile</FormLabel>
                    </h5>
                  </center>

              
                  <FormGroup controlId="formGroupEmail">
                  <FormLabel>First Name</FormLabel>
                  <FormControl
                    type="firstname"
                    value="User's first name"
                    class="field left"
                    readonly
                  />
                </FormGroup>

                <FormGroup controlId="formGroupEmail">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl
                    type="lastname"
                    value="User's last name"
                    class="field left"
                    readonly
                  />
                </FormGroup>

              <FormGroup controlId="formGroupEmail">
                  <FormLabel>Username</FormLabel>
                  <FormControl
                    type="username"
                    value="Username"
                    class="field left"
                    readonly
                  />
                </FormGroup>
  
                <FormGroup controlId="formGroupPassword">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    type="email"
                    value="Email"
                    class="field left"
                    readonly
                  />
                </FormGroup>

                <FormGroup controlId="exampleForm.ControlInput">
                  <FormLabel>Bio</FormLabel>
                  <FormControl as="textarea" rows="10"
                    value="Enter personal message"
                    class="field left"
                    readonly
                  />
                </FormGroup>

              </Form>
              
            </div>
        
      </body>
    );
  }
}
