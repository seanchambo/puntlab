import moment from 'moment';
import { push } from 'react-router-redux';
import actionTypeBuilder from './actionTypeBuilder';

export const NEW_BET_MODAL = actionTypeBuilder.type('NEW_BET_MODAL');

export function logout() {
  return (dispatch, getState) => {
    Meteor.logout();
    dispatch(push('/login'));
  };
}

export function login(email, password) {
  return (dispatch, getState) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Bert.alert('Logged in!', 'success');
        dispatch(push('/'));
      }
    });
  };
}