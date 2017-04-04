import React, { Component } from 'react';
import Login from './Login';
import AdminPanel from './AdminPanel';
import base from '../base';

class App extends Component {
  constructor() {
    super();

    this.addFormValues = this.addFormValues.bind(this);
    // getinitialstate
    this.state = {
      formValues: {},
      isLoggedIn: false
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
      <div id="container">
        <div className="container-fluid" id="main">
          <Login />
          <AdminPanel addFormValues={this.addFormValues} formValues={this.state.formValues} />
        </div>
      </div>

    )
  }
}
export default App;
