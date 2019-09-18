import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

import Root from './App';
import About from './About';
import BrianLe from './AboutMembers/BrianLe';
import JoseCastanon from './AboutMembers/JoseCastanon';
import ShotaEbikawa from './AboutMembers/ShotaEbikawa';
import LeslieZhou from './AboutMembers/LeslieZhou';
import DarylOrtiz from './AboutMembers/DarylOrtiz';

import {BrowserRouter, Switch, Route} from 'react-router-dom'

//For now root path
//If error for react-router-dom, install "npm install react-router-dom"
//This allows us to manage switching between pages!

/*Switch root to about later
    - Do we need router <history>?
*/
ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <Route component={Root} exact path="/"/>

        <Route component={About} path="/About"/>
        <Route component={BrianLe} path="/BrianLe"/>
        <Route component={JoseCastanon} path="/JoseCastanon"/>
        <Route component={ShotaEbikawa} path="/ShotaEbikawa"/>
        <Route component={LeslieZhou} path="/LeslieZhou"/>
        <Route component={DarylOrtiz} path="/DarylOrtiz"/>


    </Switch>
  </BrowserRouter>, document.getElementById('root')
  );
  serviceWorker.unregister();