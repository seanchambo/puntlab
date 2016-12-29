import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { nextPeriod, previousPeriod, changePeriodType } from '../../actions/app';
import { PeriodNavigation } from '../components/navigation/period-navigation';

const mapStateToProps = (state) => {
  return {
    periodType: state.app.periodType,
    period: state.app.period,
    buttonTitle: state.app.periodButtonTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    nextPeriod,
    previousPeriod,
    changePeriodType,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  onData(null, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(PeriodNavigation));