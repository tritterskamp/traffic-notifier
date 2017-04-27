import React, { Component } from 'react';
import Form from './Form';
import Results from './Results';

class AdminPanel extends Component {

  render() {
    return (
      <div className="row">
        <div id="admin-panel" className="hidden">
          <button className="btn btn-default" id="delete-account">Create a New Route</button>
          <button className="btn btn-default" id="delete-account">View My Saved Routes</button>


          <Form addFormValues={this.props.addFormValues} />
          <Results formValues={this.props.formValues} />
        </div>
      </div>
    )
  }
}
export default AdminPanel;
