import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { changeSettingsTab } from '../../../actions/settings';
import { SettingsTabs } from '../../components/settings/tabs';

const mapStateToProps = (state) => {
  return {
    settingsTab: state.settings.settingsTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeSettingsTab,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  onData(null, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(SettingsTabs));