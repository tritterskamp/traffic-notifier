import React, { Component } from 'react';
import base from '../base';
import Form from './Form';
import Results from './Results';

class AdminPanel extends Component {
  constructor() {
    super();

    this.addFormValues = this.addFormValues.bind(this);
    // getinitialstate
    this.state = {
      formValues: {}
    };
  }

  componentWillMount() {
    //this.ref = base.syncState(`${this.props.params.storeIf}/fishes`, {
    this.ref = base.syncState(`form`, {
      context: this,
      state: 'formValues'
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addFormValues(formValue) {
    // update our state
    const formValues = {...this.state.formValues};
    // add in new formValue
    const timestamp = Date.now();
    formValues[`formValue-${timestamp}`] = formValue;
    // set state
    this.setState({formValues: formValues})
  }

  render() {
    return (
      <div className="row">
        <div id="admin-panel" className="hidden">
          <button className="btn btn-default">Create a New Route</button>
          <button className="btn btn-default">View My Saved Routes</button>
          <Form addFormValues={this.addFormValues} />
          <Results formValues={this.formValues} />
        </div>
      </div>
    )
  }
}
export default AdminPanel;
