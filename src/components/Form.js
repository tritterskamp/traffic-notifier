import React, { Component } from 'react';

class Form extends Component {
  submitMessage(event) {
    event.preventDefault();
    const formValues = {
      startAddress: this.startAddress.value,
      endAddress: this.endAddress.value
    }
    this.props.addFormValues(formValues);
    this.addressForm.reset();
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-12">
            <form ref={(input) => this.addressForm = input} id="address-form" onSubmit={(e) => this.submitMessage(e)}>
              <div className="form-group">
                <input ref={(input) => this.startAddress = input} className="form-control" id="start-address" placeholder="Start address" />
              </div>
              <div className="form-group">
                <input ref={(input) => this.endAddress = input} className="form-control" id="end-address" placeholder="End address" />
              </div>
              <button type="submit" className="btn btn-default">
                Submit
              </button>
            </form>
          </div>
        </div>
    )
  }
}
export default Form;
