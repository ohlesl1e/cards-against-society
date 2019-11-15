import React, { Component } from 'react';
import Header from './Components/Header';
import {
    Button, Form, FormGroup, FormControl, FormLabel 
   } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { retrieveCookie } from "./Components/cookies";



export default class Profile extends Component {
    state = {
        userid: retrieveCookie("userid")
    }

    componentDidMount(){
        if(!retrieveCookie("userid")){
            alert("please log in!");
        }
    }

    render() {
        return (
            <body>
        <Header />
        <div class="row">
          <div class= "column">
        <Form>
         <Form.Group controlId="formGroupEmail">
         <center><Form.Label>Profile</Form.Label></center>
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="" />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="" />
            </Form.Group>
      </Form>
      </div>
      </div>
      </body>
        );
  }
}
