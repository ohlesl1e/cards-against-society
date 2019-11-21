import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

import "./stylesheets/reg.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      confirmPassword: null,
      userid: "",
      formErrors: {
        email: "",
        password: "",
        confirmPassword: "",
        userid: ""
      }
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 8 ? "Minimum of 8 characaters required" : "";
        break;

      case "confirmPassword":
        formErrors.confirmPassword =
          value === this.state.password ? "" : "Password don't match!";
        break;
      case "userid":
        formErrors.userid =
          value.length < 40 ? "" : "Maximum of 40 characaters";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log(JSON.stringify(this.state))
    );
  };

  handleSubmit = e => {
    console.log("submitted");
    e.preventDefault();
    if (formValid(this.state)) {
      this.handleRouteChange();
      fetch("/users/register", {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status === 200) {
            alert("account created");
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert("unable to register account");
        });
    } else {
      alert("You have to fill in all the fields with the correct information!");
    }
  };

  handleRouteChange() {
    this.props.history.push("/");
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrap1">
        <div className="wrap2">
          <h2 className="center">
            <b>Create Account</b>
          </h2>
          <br />
          <form onSubmit={this.handleSubmit}>
            <FormGroup className="userId" controlId="userid" bsSize="large">
              <FormLabel htmlFor="userid">Username</FormLabel>
              <FormControl
                type="userid"
                className={formErrors.userid.length > 0 ? "error" : null}
                type="text"
                name="userid"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.userid.length > 0 && (
                <span className="errorMessage">{formErrors.userid}</span>
              )}
            </FormGroup>

            <FormGroup controlId="" className="email">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl
                className={formErrors.email.length > 0 ? "error" : null}
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </FormGroup>

            <FormGroup controlId="password" className="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl
                className={formErrors.password.length > 0 ? "error" : null}
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </FormGroup>

            <FormGroup className="confirmPassword">
              <FormLabel htmlFor="password">Confirm Password</FormLabel>
              <br />
              <FormControl
                className="booty"
                className={
                  formErrors.confirmPassword.length > 0 ? "error" : null
                }
                type="password"
                name="confirmPassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confirmPassword > 0 && (
                <span className="errorMessage">
                  {formErrors.confirmPassword}
                </span>
              )}
            </FormGroup>
            <div className="a">
              By clicking Sign Up, you have read and agreed to our&nbsp;
              <a
                href="https://www.youtube.com/watch?v=5TcT1zqZofA"
                target="_blank"
              >
                Terms of Service
              </a>
            </div>
            <Button block bsSize="large" type="submit" onClick={this.onSubmit}>
              Create Account
            </Button>
            <Link className="bongola" to="/">
              Already Have an Account?
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
