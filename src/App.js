import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Stats from './frontend/components/stats/stats'
import AppBody from './frontend/components/AppBody/AppBody'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={AppBody} />
        <Route exact path='/stats' component={Stats} />
      </Switch>
    </Router>

  );
}

export default App;
