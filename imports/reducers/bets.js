import { assign } from 'lodash';
import moment from 'moment';
import actionTypeBuilder from '../actions/actionTypeBuilder';
import { BET_MODAL, SAVE_BET, BET_FORM, BET_TAB, EDIT_BET } from '../actions/bets';

export const initialState = {
  betModal: false,
  betFormSport: {
    _id: '',
    name: '',
  },
  betFormEvent: {
    _id: '',
    name: '',
  },
  betFormMarket: {
    _id: '',
    name: '',
  },
  betFormCompetition: {
    _id: '',
    name: '',
  },
  betFormDate: null,
  betTab: 1,
  formType: 'new',
  betId: '',
};

export default function(state = initialState, action) {
  const { data, type } = action;

  switch (type) {
    case actionTypeBuilder.changed(BET_MODAL):
      if(data.type === 'new'){
        assign({}, state, { betId: '' });
      }
      return assign({}, state, { betModal: data.open, formType: data.type });
      
    case actionTypeBuilder.success(SAVE_BET):
      return assign({}, state, initialState);
      
    case actionTypeBuilder.changed(BET_FORM):
      
      if(data.field === 'betFormSport'){
        return assign({}, state, { betFormSport: data.data, betFormEvent: initialState.betFormEvent, betFormCompetition: initialState.betFormCompetition, betFormMarket: initialState.betFormMarket });
      } else {
        return assign({}, state, { [data.field]: data.data });
      }
      
    case actionTypeBuilder.changed(BET_TAB):
      return assign({}, state, { betTab: data });
      
    case EDIT_BET:
      return assign({}, state, { betId: data._id, betFormEvent: data.event, betFormDate: Number(data.date), betFormCompetition: data.competition, betFormMarket: data.market, betFormSport: data.sport });
      
    default:
      return state;
  }
}
