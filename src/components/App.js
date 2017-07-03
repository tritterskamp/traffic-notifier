import React, { Component } from 'react';
import Login from './Login';

class App extends Component {
  constructor() {
      super();
      this.state = {
        isLoggedIn: false
      }
  }

  render() {
    return (
      <div id="container">
        <Login />
      </div>
    )
  }
}
export default App;
