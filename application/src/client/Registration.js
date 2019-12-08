import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

import Modal from "react-modal";
import "./stylesheets/reg.css";

//Ugly text blocks here sorry
const text1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur felis diam, imperdiet vel viverra et, dictum eu ex. Nullam tincidunt accumsan lectus, non porta ante venenatis tristique. Sed ultricies, odio pretium pulvinar tempus, urna risus sagittis risus, ac rhoncus nisi odio vel metus. Sed nec dapibus erat. Mauris consectetur semper lorem sit amet placerat. Aenean id consectetur orci. Pellentesque molestie arcu a tellus volutpat, cursus egestas felis pulvinar. Curabitur nec dui erat. Nam eget odio ut mauris eleifend ultrices. Praesent malesuada mollis tristique. Ut gravida congue dui. Sed egestas at neque ac mollis.";
const text2 =
  "In at erat consequat, commodo justo ut, sollicitudin urna. Ut metus nisi, commodo eget consectetur at, maximus et sapien. Praesent convallis quam vel ex pulvinar, facilisis hendrerit elit ullamcorper. Donec justo est, scelerisque sed hendrerit at, porta et ex. In congue placerat ornare. Curabitur tempus eros et augue eleifend gravida. Duis vestibulum nisi id sollicitudin viverra. Sed eros lorem, sollicitudin imperdiet efficitur non, viverra pulvinar ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam rhoncus cursus massa vitae rutrum. Fusce maximus, sem sit amet imperdiet placerat, mi augue suscipit nisl, at luctus nisi ligula id urna. Mauris pellentesque eu elit nec tincidunt. Phasellus nec nisl at mi tristique ultricies. Etiam imperdiet, nisl eu dapibus fringilla, elit lectus luctus turpis, et eleifend erat nisi at mi. Fusce tempus rhoncus velit quis consequat.";
const text3 =
  "Sed eleifend sapien ac enim scelerisque volutpat. Morbi a convallis leo. Nullam a consectetur quam. Nunc purus quam, feugiat ut nisi molestie, commodo dignissim mauris. Mauris eget elit sit amet nulla consectetur interdum non ac mi. Morbi tristique turpis eget maximus aliquam. Sed blandit ullamcorper ligula nec imperdiet. Curabitur sed pulvinar felis. In at massa imperdiet, tempus est a, efficitur neque. Suspendisse a leo vel mauris iaculis sodales. Pellentesque id tellus nec urna lobortis hendrerit ut efficitur urna. Suspendisse pharetra risus dui, vitae ultricies massa condimentum eget.";
const text4 =
  "Suspendisse potenti. In hac habitasse platea dictumst. Ut id vulputate risus, in suscipit leo. Vivamus vel commodo nisi. In finibus quam ligula, sed fermentum ligula aliquet et. Nullam dolor nisi, blandit sed placerat id, pretium non purus. Vivamus vitae augue blandit, accumsan turpis at, molestie turpis. Sed non dictum turpis. Quisque facilisis nisi urna, et pellentesque massa consequat sit amet. Vestibulum sem nunc, aliquam sit amet dapibus at, sagittis vitae mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et leo fringilla, posuere diam vel, elementum orci. Maecenas eget urna at velit bibendum semper at non sem. Nulla blandit tincidunt pellentesque. Aenean sagittis iaculis scelerisque.";

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
