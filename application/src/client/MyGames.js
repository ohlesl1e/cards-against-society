import React, { Component } from "react";
import Header from "./Components/Header";
import './app.css'
import {Container, Row, Col} from 'react-bootstrap'
import ListRooms from "./Components/ListRooms";
import { retrieveCookie } from "./Components/Cookies";

export default class MyGames extends Component {
  state = {
    userid: retrieveCookie("userid")
  };

  componentDidMount() {
    if (!retrieveCookie("userid")) {
      alert("please log in!");
    }
  }

  render() {
    return (
      <div>
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
