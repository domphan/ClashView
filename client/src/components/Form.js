import React, { Component } from 'react';

// Trying to refactor a general purpose form.

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      clicked: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <div className="col-md-4">
            <input
              name="key"
              required
              type="text"
              className="form-control"
              id="key"
              autoComplete="off"
              value={this.state.key}
              onChange={event => this.onInputChange("key", event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button
              type="submit"
              className="btn btn-primary"
            >
              {this.props.btnText}
          </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;