import { assign } from 'lodash';
import moment from 'moment';
import actionTypeBuilder from '../actions/actionTypeBuilder';
import { SETTINGS_TAB, PASSWORD_MODAL, BANKROLL_TAB } from '../actions/settings';

export const initialState = {
  settingsTab: 1,
  changePasswordModal: false,
  bankrollDate: null,
};

export default function(state = initialState, action) {
  const { data, type } = action;
  
  switch (type) {
    
    case actionTypeBuilder.changed(SETTINGS_TAB):
      return assign({}, state, { settingsTab: data });
      
    case actionTypeBuilder.changed(PASSWORD_MODAL):
      return assign({}, state, { changePasswordModal: data });
      
    case actionTypeBuilder.changed(BANKROLL_TAB):
      return assign({}, state, { [data.field] : data.data });
      
    default:
      return state;
  }
}
