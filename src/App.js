import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Homepage from './pages/homepage'
import './App.css';

const App = props => (
  <div>
    <Switch>
      <Route exact path='/' component={Homepage} />
    </Switch>
  </div>
)

export default App;
