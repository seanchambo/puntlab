import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { closeChangePasswordModal, changePassword } from '../../../actions/settings';
import { ChangePasswordModal } from '../../components/settings/change-password-modal';

const mapStateToProps = (state) => {
  return {
    open: state.settings.changePasswordModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeChangePasswordModal,
    changePassword,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  onData(null, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(ChangePasswordModal));