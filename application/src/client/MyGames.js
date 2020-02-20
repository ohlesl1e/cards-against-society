import React, { Component } from "react";
import Header from "./Components/Header";
import './app.css'
import {Container, Row, Col} from 'react-bootstrap'
import ListRooms from "./Components/ListRooms";
import { retrieveCookie } from "./Components/Cookies";
import {Redirect} from 'react-router-dom'

export default class MyGames extends Component {
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
      <div>
        {this.notLoggedInRedirect()}
        <Header userid={this.state.userid}/>
          <Container className='my-games'>
            <Row>
              <Col>
                <ListRooms
                      url={"/games/mygames/" + this.state.userid}
                      mygames={true}
                />
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}
