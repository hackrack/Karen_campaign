import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Register} />
        </Switch>
      </div>
    )
  }
}

export default App;
