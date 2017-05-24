import React, { Component } from 'react';
import Login from './Login';
//import AdminPanel from './AdminPanel';

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
