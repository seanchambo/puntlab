import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { Bets } from '../../../api/bets/bets';
import { Sports } from '../../../api/sports/sports';
import { Events } from '../../../api/events/events';
import { Competitions } from '../../../api/competitions/competitions';
import { Markets } from '../../../api/markets/markets';
import { changeBetFormTypeahead, changeBetFormDate } from '../../../actions/bets';
import { BetForm } from '../../components/bets/bet-form';

const mapStateToProps = (state) => {
  return {
    selectedSport: state.bets.betFormSport,
    selectedEvent: state.bets.betFormEvent,
    selectedCompetition: state.bets.betFormCompetition,
    selectedMarket: state.bets.betFormMarket,
    selectedDate: state.bets.betFormDate,
    betId: state.bets.betId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeBetFormTypeahead,
    changeBetFormDate,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  
  let sports = Sports.find().fetch();
  let events = Events.find({ 'sport._id': props.selectedSport._id }).fetch();
  let competitions = Competitions.find({ 'sport._id': props.selectedSport._id }).fetch();
  let markets = Markets.find({ 'sport._id': props.selectedSport._id }).fetch();
  let bet;
  
  if(props.type === 'edit'){
    bet = Bets.findOne(props.betId);
  }
  
  sports.push({name: '', _id: ''});
  events.push({name: '', _id: ''});
  competitions.push({name: '', _id: ''});
  markets.push({name: '', _id: ''});
  
  onData(null, {
    sports,
    events,
    competitions,
    markets,
    bet,
  });
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(composeWithTracker(onPropsChange, null, null, {withRef: true})(BetForm));