import React, { Component } from 'react';

class Login extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div id="user-signed-in" className="hidden">
            <div id="user-info" className="clearfix">
              <div id="photo-container">
                <img id="photo" alt="" />
              </div>
              <div id="name"></div>
              <div id="email"></div>
            </div>
            <p>
              <button className="btn btn-default" id="sign-out">Sign Out</button>
              <button className="btn btn-default" id="delete-account">Delete account</button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;
