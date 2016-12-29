import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import { changeBetTab, deleteBet, loadBet } from '../../../actions/bets';
import { Bets } from '../../../api/bets/bets';
import { BetTabs } from '../../components/bets/tabs';

const mapStateToProps = (state) => {
  return {
    betTab: state.bets.betTab,
    period: state.app.period,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeBetTab,
    deleteBet,
    loadBet,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  
  const bets = Bets.find({ 'user._id': Meteor.userId(), date: { $gte: new Date(props.period.from), $lte: new Date(props.period.to) } }).fetch();
  const resultedBets = Bets.find({ 'user._id': Meteor.userId(), date: { $gte: new Date(props.period.from), $lte: new Date(props.period.to) }, 'return': { $ne: 0 } }).fetch();
  const pendingBets = Bets.find({ 'user._id': Meteor.userId(), date: { $gte: new Date(props.period.from), $lte: new Date(props.period.to) }, 'return': { $eq: 0 } }).fetch();
  
  onData(null, {
    bets,
    resultedBets,
    pendingBets,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(BetTabs));