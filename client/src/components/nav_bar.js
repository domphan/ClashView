import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends Component {
  render() {
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Clash Clan Tracker</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullLeft>
          <LinkContainer to="/clan">
            <NavItem eventKey={1}>
              Clan
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/players">
            <NavItem eventKey={2}>
              Players
            </NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={3} title="Login" id="basic-nav-dropdown">
            <LinkContainer to="/account/api_key">
              <MenuItem eventKey={3.1}>View API key</MenuItem>
            </LinkContainer>
            <LinkContainer to="/account">
              <MenuItem eventKey={3.2}>View Account Info</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
