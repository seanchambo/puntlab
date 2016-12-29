import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { browserHistory } from 'react-router';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import AppNavigation from '../containers/app-navigation';
import AppSidebar from '../containers/app-sidebar';
import { Loading } from '../components/loading';

export const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },
  render() {
    return (
      <div>
        <AppSidebar />
        <div className="content">
          <AppNavigation />
          <Grid fluid>
            { this.props.children }
          </Grid>
        </div>
      </div>
    );
  },
});

const onPropsChange = (props, onData) => {
    const user = Meteor.user();
    const loggingIn = Meteor.loggingIn();
    
    if(!user && !loggingIn)
      browserHistory.push('/login');
      
    if(!loggingIn)
      onData(null, {});
};

export default composeWithTracker(onPropsChange, Loading)(App);