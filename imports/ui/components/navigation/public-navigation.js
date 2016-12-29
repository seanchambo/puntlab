import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

export const PublicNavigation = () => (
  <div>
    <Navbar.Header>
        <Navbar.Brand>
          <img src="/logo.png" />
          <a href="#">PuntLab</a>
        </Navbar.Brand>
      </Navbar.Header>
    <Nav pullRight>
      <LinkContainer to="signup">
        <NavItem eventKey={ 1 } href="/signup">Sign Up</NavItem>
      </LinkContainer>
      <LinkContainer to="login">
        <NavItem eventKey={ 2 } href="/login">Log In</NavItem>
      </LinkContainer>
    </Nav>
  </div>
);
