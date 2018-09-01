import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser, loginUser } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import register from '../registerServiceWorker';
import PropTypes from 'prop-types';

const LOGIN = 'login';
const SIGNUP = 'signup';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirm: "",
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { email, password, password_confirm } = this.state;
    const user = {
      email: email,
      password: password,
      password_confirm: password_confirm
    }
    if (this.props.type === SIGNUP) {
      this.props.signupUser(user, this.props.history);
    } else {
      this.props.loginUser(user);
    }
    
  }

  onInputChange(field, value) {
    this.setState({ [field]: value })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { email, password, password_confirm, errors } = this.state;
    if (this.props.type !== LOGIN && this.props.type !== SIGNUP) {
      console.error("used the incorrect type for AuthForm");
      return <div>ERROR</div>
    }
    return(
      <div className="container-fluid thinForm">
        <h1>{this.props.type.toUpperCase()}</h1>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              name="email"
              required
              type="text"
              className="form-control"
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={event => this.onInputChange("email", event.target.value)}
            />
            {errors.email && (<div className="invalidInput">{errors.email}</div>)}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              required
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              value={password}
              onChange={event => this.onInputChange("password", event.target.value)} />
              {errors.password && (<div className="invalidInput">{errors.password}</div>)}
          </div>
          <div 
            className="form-group"
            hidden={this.props.type === LOGIN}
          >
            <label htmlFor="password_confirm">Confirm password</label>
            <input
              name="password_confirm"
              type="password"
              className="form-control"
              id="password_confirm"
              placeholder="password"
              value={password_confirm}
              onChange={event => this.onInputChange("password_confirm", event.target.value)} />
              {errors.password_confirm && (<div className="invalidInput">{errors.password_confirm}</div>)}
          </div>
          <button
            className="btn btn-primary"
            type="submit"
          >
            {this.props.type}
            </button>
        </form>
      </div>
    );
  }
}

AuthForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { signupUser, loginUser })(withRouter(AuthForm));