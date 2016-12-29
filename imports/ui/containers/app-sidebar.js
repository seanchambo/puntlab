import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { AppSidebar } from '../components/sidebar/app-sidebar';

const mapStateToProps = (state) => {
    return {
        drawer: state.app.drawer,
        activePath: state.routing.locationBeforeTransitions.pathname,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        push
    }, dispatch);
};

const onPropsChange = (props, onData) => {
    onData(null, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(AppSidebar));