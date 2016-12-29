import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from '../components/navigation/app-navigation';
import { toggleDrawer } from '../../actions/app';
import { logout } from '../../actions/auth';

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        toggleDrawer,
        logout,
        push,
    }, dispatch);
};

const onPropsChange = (props, onData) => {
    onData(null, { hasUser: Meteor.user() });
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(AppNavigation));
