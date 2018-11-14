import React, { Component } from 'react';
import { Form, Text } from 'informed';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addClan } from '../actions';

class ClanForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFormApi = this.setFormApi.bind(this);
  }
  setFormApi(formApi) {
    this.formApi = formApi;
  }

  handleSubmit() {
    const { api_key } = this.props.auth.user;
    this.props.addClan(this.formApi.getState().values.tag, api_key);

  }
  
  render() {
    return(
      <Form className="form-inline" id="add-clan-form" onSubmit={this.handleSubmit} getApi={this.setFormApi}>
        <Text
          className="form-control"
          field="tag" id="clan-tag"
          validate={validate}
          placeholder="clan tag (ex:2LQC8UC2)"
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </Form>
    );
  }
}

const validate = value => {
  return !value || value.length < 5 ? 'Field must be at least four characters' : null;
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    clan: state.clan
  };
}


export default connect(mapStateToProps,  { addClan })(withRouter(ClanForm));