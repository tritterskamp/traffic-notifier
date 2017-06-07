import React, { Component } from 'react';
import base from '../base';

class Login extends Component {
  constructor() {
    super();
    this.writeUserData = this.writeUserData.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.state = {
      uid: null,
      displayName: null,
      email: null,
      photoURL: null,
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    })
  }

  writeUserData(userId, name, email, imageUrl) {
    base.database().ref(`users/${userId}`).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({
      uid: null,
      isLoggedIn: false
    })
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return;
    }

    // grab info
    const storeRef = base.database().ref(`users`);

    // query the firebase once for store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // write the user info to the database
      if(!data.uid) {
        this.writeUserData(authData.user.uid, authData.user.displayName, authData.user.email, authData.user.photoURL)
      }
      // I think the displayName, email, and photoUrl should be props instead of state maybe?
      this.setState({
        isLoggedIn: true,
        uid: authData.user.uid,
        displayName: authData.user.displayName,
        email: authData.user.email,
        photoURL: authData.user.photoURL,
      });
    });

  }

  renderLogin() {
    return (
      <div id="user-signed-out" className="login">
        <h4>Please sign in.</h4>
        <button className="btn btn-success google" onClick={() => this.authenticate('google')}>Sign in with Google</button>
        <button className="btn btn-primary facebook" onClick={() => this.authenticate('facebook')}>Sign in with Facebook</button>
      </div>
    )
  }

  render() {
    const logout = <button className="btn btn-default" id="sign-out" onClick={this.logout}>Sign Out</button>;

    // check if they are not logged in
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <h3>Welcome!</h3>
          <div id="user-signed-in" className="hidden">
            <div id="user-info" className="clearfix">
              <div id="photo-container">
                <img id="photo" src={this.state.photoURL} alt={this.state.displayName} />
              </div>
              <div id="name">{this.state.displayName}</div>
              <div id="email">{this.state.email}</div>
            </div>
            <p>
              {logout}
              <button className="btn btn-default" id="delete-account">Delete account</button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;
