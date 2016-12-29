import moment from 'moment';
import { push } from 'react-router-redux';
import lodash from 'lodash';
import actionTypeBuilder from './actionTypeBuilder';
import { Transactions } from '../api/transactions/transactions';

export const SETTINGS_TAB = actionTypeBuilder.type('SETTINGS_TAB');
export const PASSWORD_MODAL = actionTypeBuilder.type('PASSWORD_MODAL');
export const BANKROLL_TAB = actionTypeBuilder.type('BANKROLL_TAB');

export function openChangePasswordModal() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(PASSWORD_MODAL),
      data: true,
    });
  };
}

export function closeChangePasswordModal() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(PASSWORD_MODAL),
      data: false,
    });
  };
}

export function changeSettingsTab(tab) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(SETTINGS_TAB),
      data: tab,
    });
  };
}

export function changePassword(current, newPassword, confirmNewPassword) {
  return (dispatch, getState) => {
    if (newPassword !==  confirmNewPassword) {
      return Bert.alert('Your new passwords do not match', 'danger');
    }
    
    Accounts.changePassword(current, newPassword, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        dispatch(closeChangePasswordModal());
        Bert.alert('Your password has been changed.', 'success');
      }
    });
  };
}

export function saveGeneralSettings(first, last, email, username) {
  return (dispatch, getState) => {
    if (first === '' || last === '' || username === '' || email === '') {
      return Bert.alert('Please fill out all fields.', 'danger');
    }
    
    const fields = {
      first,
      last,
      email,
      username
    };
    
    Meteor.call('updateGeneralSettings', fields, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Bert.alert('Your settings have been updated.', 'success');
      }
    });
  };
}

export function saveBankrollSettings(name, initialBalance) {
  return (dispatch, getState) => {
    
    const bankrollDate = getState().settings.bankrollDate;
    
    if (initialBalance === '' || name === '' || bankrollDate === null) {
      return Bert.alert('Please fill out all fields.', 'danger');
    }
    
    let fields = {};
    
    fields.initialBalance = lodash.parseInt(initialBalance);
    fields.date = new Date(lodash.parseInt(bankrollDate));
    fields.name = name;
    
    Meteor.call('updateBankrollSettings', fields, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Bert.alert('Your settings have been updated.', 'success');
      }
    });
  };
}

export function changeBankrollDate(date) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(BANKROLL_TAB),
      data: {
        field: 'bankrollDate',
        data: date
      },
    });
  };
}