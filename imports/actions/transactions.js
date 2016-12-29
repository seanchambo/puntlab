import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import lodash from 'lodash';
import actionTypeBuilder from './actionTypeBuilder';
import { insertTransaction, removeTransaction } from '../api/transactions/methods';

export const TRANSACTION_MODAL = actionTypeBuilder.type('TRANSACTION_MODAL');
export const TRANSACTION_FORM = actionTypeBuilder.type('TRANSACTION_FORM');

export function openTransactionModal(type) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(TRANSACTION_MODAL),
      data: {
        open: true,
        type,
      }
    });
  };
}

export function closeTransactionModal() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(TRANSACTION_MODAL),
      data: {
        open: false,
        type: '',
      }
    });
  };
}

export function saveTransaction(amount, type, notes) {
  return (dispatch, getState) => {
    
    let fields = {};
    
    fields.date = new Date(lodash.parseInt(getState().transactions.transactionFormDate));
    fields.notes = notes;
    fields.amount = lodash.parseInt(amount);
    fields.type = type;
    fields.user = {
      _id: Meteor.userId()
    };
    
    console.log(fields);
    
    insertTransaction.call(fields, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        dispatch(closeTransactionModal());
        Bert.alert('Transaction added!', 'success');
      }
    });
  };
}

export function changeTransactionFormDate(date) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(TRANSACTION_FORM),
      data: {
        field: 'transactionFormDate',
        data: date
      },
    });
  };
}

export function deleteTransaction(transactionId) {
  return (dispatch, getState) => {
    
    const fields = {
      _id: transactionId,
    };
    
    removeTransaction.call(fields, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Bert.alert('Transaction deleted!', 'success');
      }
    });
  };
}