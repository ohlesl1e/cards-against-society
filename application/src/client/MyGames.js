import React, { Component } from "react";
import Header from "./Components/Header";
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
        <Header userid={this.state.userid} />
        <ListRooms url="/game/allgames" />
      </div>
    );
  }
}
