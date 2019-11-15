import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './stylesheets/reg.css';

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
        formErrors.password =          value.length < 8 ? 'minimum 8 characaters required' : '';
        break;

      case 'userid':
        formErrors.userid = value.length < 40 ? '' : 'maximum 40 characaters';
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log(JSON.stringify(this.state))
    );
  };

  handleSubmit = (e) => {
    console.log('submitted');
    e.preventDefault();
    if (formValid(this.state)) {
      // this.handleRouteChange();
      fetch('http://localhost:4000/users/register', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status === 200) {
            alert('account created');
            this.handleRouteChange();
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
          alert('unable to register account - Account has been registered');
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
      <div className="regwrap">
        <div className="form-wrapper">
          <h1>
            <b>Create Account</b>
          </h1>
          <br />
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="userId">
              <label htmlFor="userid">Username</label>
              <br />
              <input
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
            <br />
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <br />
              <Link to="/">Already Have an Account?</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
