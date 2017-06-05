import React, { Component } from 'react';
import Login from './Login';

class Header extends Component {

  render() {
    return (
      <div className="container-fluid" id="main">
        <Login />
      </div>
    )
  }
}
export default Header;
