import React, { Component } from 'react';
import Form from './Form';
import Results from './Results';

class AdminPanel extends Component {

  render() {
    return (
      <div className="row">
        <div id="admin-panel" className="hidden">
          <div className="row">
            <div className="col-md-12">
              <h4>Look at you!</h4>
              <p>Soon to quite soon... some React stuff will happen here!<br /> But for now were just going to store some stuff in the database.</p>
            </div>
          </div>
          <Form addFormValues={this.props.addFormValues} />
          <Results formValues={this.props.formValues} />
        </div>
      </div>
    )
  }
}
export default AdminPanel;
