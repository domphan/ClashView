import React, { Component } from 'react';
import axios from 'axios';

class HomePage extends Component {
  state = { user: {} };

  componentDidMount() {
    axios.get('http://localhost:3001/api/users/me')
      .then((res) => this.setState({ user: res.data }));
  }
  render() {
    return(
      <div>
        <div className="container-fluid">
          <h1>Your id: {this.state.user.id}</h1>
          <h1>Your email: {this.state.user.email}</h1>
        </div>
      </div>
    );
  }
}

export default HomePage;