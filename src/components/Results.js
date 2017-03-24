import React, { Component } from 'react';

class Results extends Component {
  constructor() {
    super();
    this.renderFormValues = this.renderFormValues.bind(this);
  }
  renderFormValues(key) {
    const route = this.props.formValues[key]
    return(
      <div className="route" key={key}>
        <p><strong>Start Address:</strong> {route.startAddress}</p>
        <p><strong>End Address:</strong> {route.endAddress}</p>
      </div>
    )
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12" id="results">
          <h3>Your Saved Routes</h3>
          {Object
            .keys(this.props.formValues)
            .map(this.renderFormValues)
          }
        </div>
      </div>
    )
  }
}
export default Results;
