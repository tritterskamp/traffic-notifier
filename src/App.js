import React, { Component } from 'react';
import Login from './Login';
import AdminPanel from './AdminPanel';

class App extends Component {
  constructor() {
    super();

    this.addFormValues = this.addFormValues.bind(this);
    // getinitialstate
    this.state = {
      formValues: {}
    };
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
      <div className="container-fluid" id="container">
        <h3>Welcome!</h3>
        <div id="loading">Loading...</div>
        <div id="loaded" className="hidden">
          <div id="main">
            <Login />
            <AdminPanel addFormValues={this.addFormValues} />
          </div>
        </div>
      </div>

    )
  }
}
export default App;
