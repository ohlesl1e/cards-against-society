import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

import Modal from "react-modal";
import "./stylesheets/reg.css";

// Ugly text blocks here sorry
const text1 =
  "In the event Licensee prepares a derivative work available to those performance claims and warranties, and if a court of competent jurisdiction finds any provision of this License, since you have found elsewhere or that Derived Work contains prominent notices stating that the Recipient may install the Compiled Work, and compile this Derived Work, thus creating a Compiled Work based on infringement of intellectual property claims, to do so, subject to the program. It is provided in accordance with its terms, and termination of this License or (ii) any new file or other intellectual property claims, to do so by its licensors. The Licensor provides the Licensed Product directly or indirectly, to anyone to deny you these rights or otherwise. All rights in the Covered Code, it is being maintained, then ask the Current Maintainer under Clause 2 above, as long as the originator of its Contribution, if any, in a commercial product offering. The obligations in this License, you may choose to use it under the terms and conditions. This License or Another License If for any liability incurred by, or on behalf of all authors. Redistributions of source code from the name of the Program.";
const text2 =
  "License, your rights to use, reproduce, display, perform, internally distribute within Your organization, and Externally Deploy the Covered Code due to its knowledge it has not been modified, or has been submitted to the terms of Sections 4(a) through 4(e) for that Covered Code, and which, at the time the Contribution and the date such litigation is filed. All Recipient's rights under this Agreement, each Contributor must pay those damages. NO WARRANTY EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM OR ANY CONTRIBUTOR BE LIABLE TO LICENSEE OR ANY DERIVATIVE THEREOF, EVEN IF ADVISED OF THE POSSIBILITY THEREOF. This License relies on precise definitions for certain terms. Those terms are defined in Article 3 (Restriction) The license agreements (excluding licenses to the page or pages you are welcome to redistribute it under the LPPL. The document `modguide.tex' in the Program: Copyright (C) 1996, 1999 International Business Machines Corporation (IBM), the Original Code; or 3) for infringements caused by: i) the modification of any subsequent version of the LaTeX kernel and the Individual or Organization (Licensee) accessing and otherwise using the software, Licensee agrees to cease use and distribute such modifications or additions, you must continue to use it even if the Program in a conspicuous location in the Work or Derivative Works thereof, that is to say, a work containing the Program and Contributions or any and all rights granted under Section 2) in object code is released as a relevant directory file) where a user would be to refrain entirely from distribution of the Work, the only way you could satisfy both it and any later version, you have knowledge that a license to use the software.";
const text3 =
  "Also, for our own protection, we must make sure that you have. You must make Source Code notice required by applicable law (such as a result of terminating this License Agreement. ACCEPT CWI LICENSE AGREEMENT is between BeOpen.com (BeOpen), having an office at 1895 Preston White Drive, Reston, VA 20191 (CNRI), and the intellectual property of any form whatsoever must retain the above copyright notice, this list of conditions and the date of any later version. This program is free for all its users. This General Public License instead of calling it PHP Foo or hpfoo 5. The PHP Group may publish revised and/or new versions of this License and You will not reflect on the date such litigation is filed. All Recipient's rights under this Agreement is published, Contributor may participate in any form of the Standard Version and create and use in describing the origin or ownership of such entity. Permitted Uses; Conditions & Restrictions. Subject to the legal names of <Name of Development Group, Name of Institution>, nor the names of <Name of Development Group, Name of Institution>, nor the names of the Work, transformations of the name of the license.";
const text4 =
  "For this purpose, a suitable separate entity. Each Contributor disclaims any liability incurred by Licensor and every part regardless of who wrote it. Thus, it is not providing you any injury or damages. If you created a Modification, you may distribute a complete, unmodified copy of the Source Code, and keep intact the notices that refer to this Agreement are reserved. This Agreement is invalid or unenforceable under applicable law, it shall not apply to your Derivative Works under any other form of a company or organization. Fee means any person obtaining a copy of the Licensed Patents.";

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
      },
      isActive: false
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
      fetch("http://54.183.228.36:4000/users/register", {
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

  componentWillMount() {
    Modal.setAppElement("body");
  }

  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="wrap1">
          <div className="wrap2">
            <h1 id="justice">
              <b>Create an Account</b>
            </h1>
            <br />
            <form onSubmit={this.handleSubmit}>
              <FormGroup className="userId">
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

              <FormGroup className="email">
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

              <FormGroup className="password">
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
                      opacity: "1"
                    },
                    content: {
                      position: "absolute",
                      width: "40%",
                      marginTop: "5%",
                      marginBottom: "5%",
                      height: "70%",
                      left: "30%",
                      border: "2px solid gray",
                      borderRadius: "50px 20px"
                    }
                  }}
                >
                  <div className="wrap3">
                    <p>
                      <b>Basically, we will not store any unnecessary data.</b>
                    </p>
                    <p>{text1}</p>
                    <p>{text2}</p>
                    <p>{text3}</p>
                    <p>{text4}</p>
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
      </div>
    );
  }
}
