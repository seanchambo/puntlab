import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { openBetModal } from '../../../actions/bets';
import { BetActions } from '../../components/bets/actions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openBetModal
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  onData(null, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(BetActions));