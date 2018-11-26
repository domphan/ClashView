import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { logoutUser } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const brand = require('../assets/three_crowns.png')

const imgStyle = {
  height: '150%',
}

class NavBar extends Component {
  onLogout(event) {
    event.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { authenticated, user } = this.props.auth;
    const authenticatedElements = (
      <div>
        <Nav>
          <LinkContainer to="/clan">
            <NavItem eventKey={1}>
              Your Clan
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/favorites">
            <NavItem eventKey={2}>
              Favorited Players
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/players">
            <NavItem eventKey={3}>
              Player Lookup
            </NavItem>
          </LinkContainer>

        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={4} title={user.email ? user.email : ''} id="basic-nav-dropdown">
            <LinkContainer to="/account/api_key">
              <MenuItem eventKey={4.1}>View API key</MenuItem>
            </LinkContainer>
            <LinkContainer to="/account/info">
              <MenuItem eventKey={4.2}>View Account Info</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/logout">
              <MenuItem eventKey={4.4} onClick={this.onLogout.bind(this)}>Logout</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </div>
    );

    const notAuthenticated = (
      <div>
        <Nav pullRight>
          <LinkContainer to="/login">
            <NavItem eventKey={5}>
              Login
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/signup">
            <NavItem eventKey={6}>
              Sign Up
            </NavItem>
          </LinkContainer>
        </Nav>
      </div>
    );

    return(
      <Navbar collapseOnSelect inverse>
        <Navbar.Header className="navbar-custom">
          <Navbar.Brand>
            <Link to="/">
              <img src={brand} alt="brand" style={imgStyle} />
              Clash Clan Manager
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {authenticated ? authenticatedElements : notAuthenticated}
        </Navbar.Collapse>

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
