import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Root from './App';
import About from './About';
import BrianLe from './AboutMembers/BrianLe';
import JoseCastanon from './AboutMembers/JoseCastanon';
import ShotaEbikawa from './AboutMembers/ShotaEbikawa';
import LeslieZhou from './AboutMembers/LeslieZhou';
import DarylOrtiz from './AboutMembers/DarylOrtiz';

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
          render={props => <Root {...props} component={Root} />}
        />

        <Route component={About} path="/About" />
        <Route component={BrianLe} path="/BrianLe" />
        <Route component={JoseCastanon} path="/JoseCastanon" />
        <Route component={ShotaEbikawa} path="/ShotaEbikawa" />
        <Route component={LeslieZhou} path="/LeslieZhou" />
        <Route component={DarylOrtiz} path="/DarylOrtiz" />
      </BrowserRouter>
    );
  }
}
