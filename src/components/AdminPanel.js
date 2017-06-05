import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminPanel extends Component {
  render() {
    return (
      <div className="row">
        <div id="admin-panel" className="hidden">
          <Link to="/new" className="btn btn-default">Create a New Route</Link>
          <Link to="/saved" className="btn btn-default">View My Saved Routes</Link>
        </div>
      </div>
    )
  }
}
export default AdminPanel;
