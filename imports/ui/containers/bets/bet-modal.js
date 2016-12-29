import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { Sports } from '../../../api/sports/sports';
import { Events } from '../../../api/events/events';
import { Competitions } from '../../../api/competitions/competitions';
import { Markets } from '../../../api/markets/markets';
import { closeBetModal, saveBet, editBet } from '../../../actions/bets';
import { BetModal } from '../../components/bets/bet-modal';

const mapStateToProps = (state) => {
  return {
    open: state.bets.betModal,
    type: state.bets.formType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeBetModal,
    saveBet,
    editBet,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  onData(null, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(BetModal));