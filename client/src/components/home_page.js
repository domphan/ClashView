import React, { Component } from 'react';


class HomePage extends Component {
  state = { users: [] };

  componentDidMount() {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  render() {
    return(
      <div>
        <div className="container-fluid">
          <ul>
            {this.state.users.map(user => 
               <li key={user.id}>{user.username}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default HomePage;