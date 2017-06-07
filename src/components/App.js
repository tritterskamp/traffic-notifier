import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';

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
        <Header isLoggedIn={this.state.isLoggedIn} />
        <Main isLoggedIn={this.state.isLoggedIn} />
      </div>
    )
  }
}
export default App;
