import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Homepage from './pages/homepage'
import ServerAwaitingPlayers from './pages/server-awaiting-players'
import './App.css';

const App = props => (
  <div>
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/waiting' component={ServerAwaitingPlayers} />
    </Switch>
  </div>
)

export default App;
