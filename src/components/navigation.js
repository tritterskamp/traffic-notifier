import React, { Component } from 'react';

class Navigation extends Component {
    render () {
        return (
          <nav className="navbar navbar-inverse">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">Traffic Notifier</a>
              </div>
              {/* We'll add this back in later when we have routing set up: <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              */}
            </div>
          </nav>
        )
    }
}

export default Navigation;
