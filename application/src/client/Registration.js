import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./stylesheets/reg.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
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
      userid: ' ',
      formErrors: {
        email: '',
        password: '',
        confirmPassword: '',
        userid: ''
      }
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'invalid email address';
        break;
      case 'password':
        formErrors.password = value.length < 8 ? 'minimum 8 characaters required' : '';
        break;

      case 'confirmPassword':
        formErrors.confirmPassword = value === this.state.password ? '' : "Password don't match!";
        break;
      case 'userid':
        formErrors.userid = value.length < 40 ? '' : 'maximum 40 characaters';
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(JSON.stringify(this.state)));
  };

  handleSubmit = (e) => {
    console.log('submitted');
    e.preventDefault();
    if (formValid(this.state)) {
      // this.handleRouteChange();
      fetch('/users/register', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status === 200) {
            // cookie.save(userid);
            // this.handleRouteChange();
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
          alert('unable to register account');
        });
    } else {
      alert('You have to fill in all the fields with the correct information!');
    }
  };

  handleRouteChange() {
    this.props.history.push('/');
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrap1">
        <h1><b>Create Account</b></h1>
        <br />
        <div className="wrap2">
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="userId">
<<<<<<< HEAD
              <center><label htmlFor="userid">Username</label></center>
=======
              <label htmlFor="userid">Username</label>
              <br />
>>>>>>> b0a53e41538b8413eb8219f1194c1c3842581661
              <input
                class="booty"
                className={formErrors.userid.length > 0 ? 'error' : null}
                placeholder="User Name"
                type="text"
                name="userid"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.userid.length > 0 && (
                <span className="errorMessage">{formErrors.userid}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <br />
              <input
                class="booty"
                className={formErrors.email.length > 0 ? 'error' : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <br />
              <input
                class="booty"
                className={formErrors.password.length > 0 ? 'error' : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="confirmPassword">
              <label htmlFor="password">Confirm Password</label>
              <br />
              <input
                class="booty"
                className={
                  formErrors.confirmPassword.length > 0 ? 'error' : null
                }
                placeholder="Confirm Password"
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
            </div>
            <div class="a">
              By clicking Sign Up, you have read and agreed to our&nbsp;
                  <a href="https://www.youtube.com/watch?v=5TcT1zqZofA" target="_blank">Terms of Service</a>.
                </div>
            <div className="createAccount">
              <button class="account" type="submit">Create Account</button>
              <br />
              <Link className="bongola" to="/">Already Have an Account?</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
