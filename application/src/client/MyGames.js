import React, { Component } from 'react';
import Header from './Components/Header';
import ListRooms from './Components/ListRooms';
import { retrieveCookie } from './Components/Cookies';
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
        <Header userid={this.state.userid} />
        <div className = 'my-games'>
          <ListRooms url={"/games/mygames/"+this.state.userid} />
        </div>
      </div>
    );
  }
}
