import { assign } from 'lodash';
import moment from 'moment';
import actionTypeBuilder from '../actions/actionTypeBuilder';
import { TRANSACTION_MODAL, TRANSACTION_FORM } from '../actions/transactions';

export const initialState = {
  transactionModal: false,
  formType: '',
  transactionFormDate: null,
};

export default function(state = initialState, action) {
  const { data, type } = action;

  switch (type) {
    case actionTypeBuilder.changed(TRANSACTION_MODAL):
      return assign({}, state, { transactionModal: data.open, formType: data.type });
    
    case actionTypeBuilder.changed(TRANSACTION_FORM):
      return assign({}, state, { [data.field]: data.data });
    
    default:
      return state;
  }
}
