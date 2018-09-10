import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { assignKey } from '../actions/auth';

class ApiKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      clicked: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  onInputChange(field, value) {
    this.setState({ [field]: value })
  }
  handleSubmit(event) {
    event.preventDefault();
    const user = {
      user_id: this.props.auth.user.id,
      key: this.state.key
    }
    this.props.assignKey(user);
    this.setState({ clicked: false });
  }
  openForm() {
    const { api_key } = this.props.auth.user;
    this.setState({ 
      clicked: true, 
      key: api_key 
    });
  }

  renderForm() {
    return(
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
              Save
          </button>
          </div>
        </div>
      </form>
    );
  }

  renderKey() {
    return(
      <div className="container">
        <h2>
          {this.props.auth.user.api_key + "  "}
          <button 
            className="btn btn-warning"
            onClick={this.openForm}
          >
            edit
          </button>
        </h2>
      </div>
    );
  }
  render() {
    console.log(this.props.auth);
    const { api_key } = this.props.auth.user;
    return(
      <div>
        <h1>API Key</h1>
        {!api_key && this.renderForm()}
        {api_key && !this.state.clicked && this.renderKey()}
        {this.state.clicked && this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { assignKey })(withRouter(ApiKey));