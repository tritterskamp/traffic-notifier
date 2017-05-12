import React, { Component } from 'react';
import Login from './Login';

class App extends Component {

  render() {
    return (
      <div id="container">
        <div className="container-fluid" id="main">
          <Login />
        </div>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>

    )
  }
}
export default App;
