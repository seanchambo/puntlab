import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Login } from '../../components/auth/login';
import { login } from '../../../actions/auth';

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login
    }, dispatch);
};

const onPropsChange = (props, onData) => {
    onData(null, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(Login));
