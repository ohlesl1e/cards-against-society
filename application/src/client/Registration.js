import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
 Button, FormGroup, FormControl, FormLabel 
} from 'react-bootstrap';

import Modal from 'react-modal';
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
      confirmPassword: null,
      userid: '',
      formErrors: {
        email: '',
        password: '',
        confirmPassword: '',
        userid: ''
      },
      isActive: false
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
          : 'Invalid email address';
        break;
      case 'password':
        formErrors.password =          value.length < 8 ? 'Minimum of 8 characaters required' : '';
        break;

      case 'confirmPassword':
        formErrors.confirmPassword =          value === this.state.password ? '' : "Password don't match!";
        break;
      case 'userid':
        formErrors.userid =          value.length < 40 ? '' : 'Maximum of 40 characaters';
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
      this.handleRouteChange();
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
            alert('account created');
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

  componentWillMount() {
    Modal.setAppElement('body');
  }

  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

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
            <FormGroup className="userId">
              <FormLabel htmlFor="userid">Username</FormLabel>
              <FormControl
                type="userid"
                className={formErrors.userid.length > 0 ? 'error' : null}
                type="text"
                name="userid"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.userid.length > 0 && (
                <span className="errorMessage">{formErrors.userid}</span>
              )}
            </FormGroup>

            <FormGroup className="email">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl
                className={formErrors.email.length > 0 ? 'error' : null}
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </FormGroup>

            <FormGroup className="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl
                className={formErrors.password.length > 0 ? 'error' : null}
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
                  formErrors.confirmPassword.length > 0 ? 'error' : null
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
              By creating an Account, you have read and agreed to our&nbsp;
              <button
                type="button"
                className="modalbutton"
                onClick={this.toggleModal}
              >
                Terms of Service
              </button>
              <Modal
                isOpen={this.state.isActive}
                onRequestClose={this.toggleModal}
                style={{
                  overlay: {
                    opacity: '1'
                  },
                  content: {
                    position: 'absolute',
                    width: '25%',
                    marginTop: '5%',
                    marginBottom: '5%',
                    height: '65%',
                    left: '37.5%',
                    border: '2px solid gray',
                    borderRadius: '50px 20px'
                  }
                }}
              >
                <div className="wrap3">
                  <p>
                    <b>Basically, we will not store any unnecessary data.</b>
                  </p>

                  <p>
                    Grant of License From Licensor. Licensor hereby grants You a
                    perpetual, worldwide, non-exclusive, no-charge,
                    royalty-free, irrevocable copyright license to reproduce,
                    analyze, test, perform and/or display publicly, prepare
                    derivative works of, publicly display, publicly perform,
                    distribute and Externally Deploy Covered Code of computer
                    program containing, or used to control compilation and
                    installation of an Internet or similar search. If this is
                    what you want or need to make reasonable conjectures as to
                    which you contribute, and which provides that the Source
                    form of the Standard Version, under the GNU Free
                    Documentation License (unversioned, with no invariant
                    sections, front-cover texts, or back-cover texts). Re-users
                    can choose the license(s) they wish to avoid the danger that
                    redistributors of a program name, font name or file name of
                    Stichting Mathematisch Centrum Amsterdam, The Netherlands.
                    All rights in its Contribution, if any, specified by the
                    Recipient, this Agreement are reserved. This Agreement may
                    be rejected if the requirements of this license. The legal
                    effect of this License automatically terminate.
                  </p>
                  <p>
                    You may distribute a complete, unmodified copy of this
                    License. Apple may, at its sole discretion. Additional
                    Terms. 7. Versions of This License. Version. The Motosoto
                    Open Source License is held to be able to understand it.
                    Application of License.
                  </p>
                  <p>
                    The application of the files and the like. The name Zope
                    Corporation (tm) must not be used to render or display
                    fonts. Program" shall mean a computer system. This
                    processing may include an additional document offering the
                    additional rights described in Section 4(d), and must be
                    sufficiently detailed for a particular purpose; effectively
                    excludes on behalf of the Work or out of the provisions set
                    forth herein, no assurances are provided by any means.
                    Nothing in this License is a LaTeX work, this could be done,
                    for example, why distributing LaTeX under the terms of the
                    Work includes a "NOTICE" text file as part of the Work when
                    that component itself accompanies the executable.
                  </p>
                  <p>
                    However, as a whole, an original file associated with its
                    exercise of the possibility of such Contributor, and only if
                    You fail to comply with the preceding Article, the following
                    disclaimer. Redistributions in binary form must reproduce
                    the above copyright notice, this list of authors may be
                    published from time to time. Each version will be useful,
                    but WITHOUT ANY EXPRESS OR IMPLIED, INCLUDING BUT NOT
                    LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE OR THAT THE USE OR OTHER
                    DEALINGS IN THE SOFTWARE. Preamble The licenses for most
                    software companies keep you at the end of the Work.
                  </p>
                  <p>
                    It is wise never to modify Cards Against Society, or
                    otherwise compete with, Modifications, Larger Works,
                    technology or products that You may modify Covered Code in
                    any form under the new version. No one other than such
                    Participant's Contributor Version, directly or indirectly
                    infringes any patent Licensable by Initial Developer and
                    Contributors to distribute or publish, that in whole or in
                    the documentation and/or other materials provided with the
                    Wikimedia Foundation Licensing Policy. Please view the media
                    description page for attribution of single-licensed content
                    that is based on infringement of intellectual property
                    rights needed, if any.
                  </p>
                </div>
              </Modal>
            </div>
            <Button block type="submit" onClick={this.onSubmit}>
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
