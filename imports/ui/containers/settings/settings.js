import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { openChangePasswordModal } from '../../../actions/settings';
import { AccountSettings } from '../../components/settings/settings';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openChangePasswordModal,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  const user = Meteor.user();
  onData(null, {
    user,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(AccountSettings));