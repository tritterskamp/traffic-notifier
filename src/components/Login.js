import React, { Component } from 'react';
import firebase from 'firebase';
import base from '../base';
import Main from './Main';

var baseApp = base.initializedApp;

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
    baseApp.auth().onAuthStateChanged(function(user, error) {
      if (user) {
        return this.authHandler({user});
      }
      console.log(error);
    })
  }

  writeUserData(userId, name, email, imageUrl) {
    baseApp.database().ref(`users/${userId}`).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  // authenticate(provider) {
  //   base.authWithOAuthPopup(provider, this.authHandler);
  // }

  authenticate(provider) {
    baseApp.auth().signInWithPopup(provider)
      .then(this.authHandler)
      .catch(function(error){
      console.log(error);
    });
  }

  logout() {
    //base.unauth();
    baseApp.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
	     console.log(error);
    });
    this.setState({
      uid: null,
      isLoggedIn: false
    })
  }

  authHandler(authData) {
    // grab user info
    const storeRef = baseApp.database().ref(`users`);

    // query the firebase once for user data
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
    const google = new firebase.auth.GoogleAuthProvider();
    const facebook = new firebase.auth.FacebookAuthProvider();
    return (
      <div className="container-fluid">
        <div id="user-signed-out" className="login">
          <h4>Please sign in.</h4>
          <button className="btn btn-success google" onClick={() => this.authenticate(google)}>Sign in with Google</button>
          <button className="btn btn-primary facebook" onClick={() => this.authenticate(facebook)}>Sign in with Facebook</button>
        </div>
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
      <div>
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
        <Main uid={this.state.uid} />
      </div>
    )
  }
}
export default Login;
