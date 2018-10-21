import React, { Component } from 'react';
import axios from 'axios';
import { logoutUser } from '../actions/auth';

class HomePage extends Component {
  state = { user: {} };

  componentDidMount() {
    axios.get('http://localhost:3001/api/users/me')
      .then((res) => this.setState({ user: res.data }))
      .catch((error) => {
        if (error.response) {
          logoutUser([]);
          window.location.href = '/login';
        }
      });
  }
  render_info() {
    return (
      <div>
        <div className="container-fluid">
          <h1>Your id: {this.state.user.id}</h1>
          <h1>Your email: {this.state.user.email}</h1>
        </div>
      </div>
    );
  }
  render() {
    return(
      <div>
        {this.state.user.id ? this.render_info() : "Checking login"}
      </div>
    );
  }
}

export default HomePage;