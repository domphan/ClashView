import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { logoutUser } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavBar extends Component {
  onLogout(event) {
    event.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { authenticated, user } = this.props.auth;
    const authenticatedElements = (
      <div>
        <Nav pullLeft>
          <LinkContainer to="/clan">
            <NavItem eventKey={1}>
              Your Clan
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/players">
            <NavItem eventKey={2}>
              Player Lookup
            </NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={3} title={user.email ? user.email : ''} id="basic-nav-dropdown">
            <LinkContainer to="/account/api_key">
              <MenuItem eventKey={3.1}>View API key</MenuItem>
            </LinkContainer>
            <LinkContainer to="/account">
              <MenuItem eventKey={3.2}>View Account Info</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/logout">
              <MenuItem eventKey={3.4} onClick={this.onLogout.bind(this)}>Logout</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </div>
    );

    const notAuthenticated = (
      <div>
        <Nav pullRight>
          <LinkContainer to="/login">
            <NavItem eventKey={4}>
              Login
            </NavItem>
          </LinkContainer>
        </Nav>
      </div>
    );

    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Clash Clan Tracker</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {authenticated ? authenticatedElements : notAuthenticated}
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser }, null, {
  pure:false,
})(withRouter(NavBar));
