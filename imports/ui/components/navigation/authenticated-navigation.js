import React from 'react';
import { Nav, NavDropdown, MenuItem, Button, Glyphicon } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

export const AuthenticatedNavigation = ({ toggleDrawer, logout, push }) => (
  <div>
    <Nav>
      <Button onClick={ () => { toggleDrawer(); } } style={ {marginTop: '9px'} }><Glyphicon glyph="menu-hamburger" /></Button>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 3 } title={ userName() } id="user-dropdown">
        <MenuItem eventKey={ 3.1 } onClick={ () => { push('/settings'); } }><Glyphicon glyph='cog' className='puntlab-icon' />Settings</MenuItem>
        <MenuItem eventKey={ 3.2 } onClick={ () => { logout(); } }><Glyphicon glyph='log-out' className='puntlab-icon' />Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  toggleDrawer: React.PropTypes.func,
  logout: React.PropTypes.func,
};
