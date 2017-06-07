import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import base from '../base';
import AdminPanel from './AdminPanel';
import Form from './Form';
import Results from './Results';

class Main extends Component {
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
    const renderForm = <Form addFormValues={this.addFormValues} />
    const renderResults = <Results formValues={this.state.formValues} />

    return (
      <div className="container-fluid">
        <AdminPanel />
        <Switch>
          <Route path="/new" render={() => renderForm} />
          <Route path="/saved" render={() => renderResults} />
        </Switch>
      </div>
      )
    }
}
export default Main;
