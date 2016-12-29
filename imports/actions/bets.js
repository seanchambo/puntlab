import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import lodash from 'lodash';
import actionTypeBuilder from './actionTypeBuilder';
import { insertBet, removeBet, updateBet } from '../api/bets/methods';
import { insertCompetition } from '../api/competitions/methods';
import { insertEvent } from '../api/events/methods';
import { insertMarket } from '../api/markets/methods';
import { Bets } from '../api/bets/bets';
import { Competitions } from '../api/competitions/competitions';
import { Events } from '../api/events/events';
import { Markets } from '../api/markets/markets';

export const BET_MODAL = actionTypeBuilder.type('BET_MODAL');
export const SAVE_BET = actionTypeBuilder.type('SAVE_BET');
export const EDIT_BET = actionTypeBuilder.type('EDIT_BET');
export const BET_FORM = actionTypeBuilder.type('BET_FORM');
export const BET_TAB = actionTypeBuilder.type('BET_TAB');

export function openBetModal(type) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(BET_MODAL),
      data: {
        open: true,
        type,
      }
    });
  };
}

export function closeBetModal() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(BET_MODAL),
      data: {
        open: false,
        type: '',
      }
    });
  };
}

export function loadBet(betId) {
  return (dispatch, getState) => {
    
    const bet = Bets.findOne({ _id: betId, 'user._id': Meteor.userId() });
    
    if(bet){
      dispatch({
        type: EDIT_BET,
        data: bet,
      });
      dispatch(openBetModal('edit'));
    }
  };
}

export function saveBet(stake, odds, nReturn, notes) {
  return (dispatch, getState) => {
    
    const sport = getState().bets.betFormSport;
    let event = getState().bets.betFormEvent;
    let market = getState().bets.betFormMarket;
    let competition = getState().bets.betFormCompetition;
    
    if (event && event.customOption) {
      const eventId = insertEvent.call({name: event.name, sport: { name: sport.name, _id: sport._id }}, (err) => {
        if (err) {
          return Bert.alert(err.reason, 'danger');
        }
      });
      
      event = Events.findOne(eventId);
    }
    
    if (market && market.customOption) {
      const marketId = insertMarket.call({name: market.name, sport: { name: sport.name, _id: sport._id }}, (err) => {
        if (err) {
          return Bert.alert(err.reason, 'danger');
        }
      });
      
      market = Markets.findOne(marketId);
    }
    
    if (competition && competition.customOption) {
      const competitionId = insertCompetition.call({name: competition.name, sport: { name: sport.name, _id: sport._id }}, (err) => {
        if (err) {
          return Bert.alert(err.reason, 'danger');
        }
      });
      
      competition = Competitions.findOne(competitionId);
    }
    
    if ( (market.sport && sport._id !== market.sport._id) || 
        (competition.sport && sport._id !== competition.sport._id) || 
        (event.sport && sport._id !== event.sport._id) ) {
          return Bert.alert('All the bet information must be connected to the same sport', 'danger');
    }
    
    let fields = {};
    
    fields.sport = sport;
    fields.event = lodash.omit(event, ['sport']);
    fields.competition = lodash.omit(competition, ['sport']);
    fields.market = lodash.omit(market, ['sport']);
    fields.date = new Date(lodash.parseInt(getState().bets.betFormDate)),
    fields.odds = lodash.parseInt(odds);
    fields.stake = lodash.parseInt(stake);
    fields.return = lodash.parseInt(nReturn);
    fields.notes = notes;
    fields.user = {
      _id: Meteor.userId()
    };
    
    console.log(fields);
    
    insertBet.call(fields, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        dispatch({
          type: actionTypeBuilder.success(SAVE_BET)
        });
        Bert.alert('Bet added!', 'success');
      }
    });
  };
}

export function editBet(stake, odds, nReturn, notes) {
  return (dispatch, getState) => {
    
    const sport = getState().bets.betFormSport;
    let event = getState().bets.betFormEvent;
    let market = getState().bets.betFormMarket;
    let competition = getState().bets.betFormCompetition;
    const betId = getState().bets.betId;
    
    if (!betId) {
      return Bert.alert('Please select a valid bet to update', 'danger');
    }
    
    if (event && event.customOption) {
      const eventId = insertEvent.call({name: event.name, sport: { name: sport.name, _id: sport._id }}, (err) => {
        if (err) {
          return Bert.alert(err.reason, 'danger');
        }
      });
      
      event = Events.findOne(eventId);
    }
    
    if (market && market.customOption) {
      const marketId = insertMarket.call({name: market.name, sport: { name: sport.name, _id: sport._id }}, (err) => {
        if (err) {
          return Bert.alert(err.reason, 'danger');
        }
      });
      
      market = Markets.findOne(marketId);
    }
    
    if (competition && competition.customOption) {
      const competitionId = insertCompetition.call({name: competition.name, sport: { name: sport.name, _id: sport._id }}, (err) => {
        if (err) {
          return Bert.alert(err.reason, 'danger');
        }
      });
      
      competition = Competitions.findOne(competitionId);
    }
    
    if ( (market.sport && sport._id !== market.sport._id) || 
         (competition.sport && sport._id !== competition.sport._id) || 
         (event.sport && sport._id !== event.sport._id) ) {
          return Bert.alert('All the bet information must be connected to the same sport', 'danger');
    }
    
    let fields = {};
    
    fields._id = betId;
    fields.sport = sport;
    fields.event = lodash.omit(event, ['sport']);
    fields.competition = lodash.omit(competition, ['sport']);
    fields.market = lodash.omit(market, ['sport']);
    fields.date = new Date(lodash.parseInt(getState().bets.betFormDate)),
    fields.odds = lodash.parseInt(odds);
    fields.stake = lodash.parseInt(stake);
    fields.return = lodash.parseInt(nReturn);
    fields.notes = notes;
    fields.user = {
      _id: Meteor.userId()
    };
    
    updateBet.call(fields, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        dispatch({
          type: actionTypeBuilder.success(SAVE_BET)
        });
        Bert.alert('Bet added!', 'success');
      }
    });
  };
}

export function changeBetFormTypeahead(field, object) {
  return (dispatch, getState) => {
    if(object.length){
      dispatch({
        type: actionTypeBuilder.changed(BET_FORM),
        data: {
          field: field,
          data: object[0],
        }
      });
    }
  };
}

export function changeBetFormDate(date) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(BET_FORM),
      data: {
        field: 'betFormDate',
        data: date
      },
    });
  };
}

export function changeBetTab(tab) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(BET_TAB),
      data: tab,
    });
  };
}

export function deleteBet(betId) {
  return (dispatch, getState) => {
    
    const fields = {
      _id: betId,
    };
    
    removeBet.call(fields, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Bert.alert('Bet deleted!', 'success');
      }
    });
  };
}
