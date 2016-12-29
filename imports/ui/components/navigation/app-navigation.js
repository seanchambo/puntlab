import React from 'react';
import { Navbar, Nav, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import { PublicNavigation } from './public-navigation';
import { AuthenticatedNavigation } from './authenticated-navigation';

export class AppNavigation extends React.Component {
  renderNavigation(hasUser) {
    return hasUser ? 
      <AuthenticatedNavigation 
        toggleDrawer={ this.props.toggleDrawer }
        logout={ this.props.logout }
        push={ this.props.push } /> : 
      <PublicNavigation />;
  }

  render() {
    return <Navbar fluid>
      { this.renderNavigation(this.props.hasUser) }
    </Navbar>;
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
  toggleDrawer: React.PropTypes.func,
  logout: React.PropTypes.func,
  push: React.PropTypes.func,
};
