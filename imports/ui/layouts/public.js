import React from 'react';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../containers/app-navigation';

export const Public = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },
  render() {
    return (
      <div>
        <div className="content-public">
          <Grid fluid>
            { this.props.children }
          </Grid>
        </div>
      </div>
    );
  },
});
