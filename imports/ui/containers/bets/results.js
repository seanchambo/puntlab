import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import lodash from 'lodash';
import { Bets } from '../../../api/bets/bets';
import { BetResults } from '../../components/bets/results';

const mapStateToProps = (state) => {
  return {
    period: state.app.period,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

const onPropsChange = (props, onData) => {
  
  const bets = Bets.find({ 'user._id': Meteor.userId(), date: { $gte: new Date(props.period.from), $lte: new Date(props.period.to) } }).fetch();
  
  let roi = 0;
  let result = 0;
  let spend = 0;
  
  lodash.forEach(bets, (bet) => {
    spend += bet.stake;
    result += bet.return;
  });
  
  roi = parseFloat((result / spend) * 100 || 0).toFixed(2);
  result -= spend;
  
  onData(null, {
    count: bets.length,
    result,
    roi,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(BetResults));