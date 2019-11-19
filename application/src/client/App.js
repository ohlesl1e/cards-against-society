import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import About from './About';
import BrianLe from './AboutMembers/BrianLe';
import JoseCastanon from './AboutMembers/JoseCastanon';
import ShotaEbikawa from './AboutMembers/ShotaEbikawa';
import LeslieZhou from './AboutMembers/LeslieZhou';
import DarylOrtiz from './AboutMembers/DarylOrtiz';
import Registration from './Registration';
import Profile from './Profile';
import Game from './Game';
import Lobby from './Lobby';
import Login from './Login';
import MyGames from './MyGames';
import Custom from './Custom';
import FAQ from './FAQ';
import Admin from './Admin';

// For now root path
// If error for react-router-dom, install "npm install react-router-dom"
// This allows us to manage switching between pages!

/* Switch root to about later
    - Do we need router <history>?
*/

export default class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loggedIn: false
    };
  }

  setUsername = (username) => {
    this.setState({ username });
  };

  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={props => <Login {...props} component={Login} />}
        />

        <Route component={About} path="/About" />
        <Route component={BrianLe} path="/BrianLe" />
        <Route component={JoseCastanon} path="/JoseCastanon" />
        <Route component={ShotaEbikawa} path="/ShotaEbikawa" />
        <Route component={LeslieZhou} path="/LeslieZhou" />
        <Route component={DarylOrtiz} path="/DarylOrtiz" />
        <Route component={Registration} path="/Registration" />
        <Route component={Game} path="/Game/:gameid" />
        <Route component={Profile} path="/Profile" />
        <Route component={Home} path="/Home" />
        <Route component={Lobby} path="/Lobby" />
        <Route component={MyGames} path="/MyGames" />
        <Route component={Custom} path="/Custom" />
        <Route component={FAQ} path="/FAQ" />
<<<<<<< HEAD
        <Route component={Admin} path="/Admin" />
=======
      
>>>>>>> 9c8287d41f5f37b918041ab38b8203cc13b411ac
      </BrowserRouter>
    );
  }
}
