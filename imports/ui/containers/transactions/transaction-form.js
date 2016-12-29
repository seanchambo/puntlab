import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { changeTransactionFormDate } from '../../../actions/transactions';
import { TransactionForm } from '../../components/transactions/transaction-form';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeTransactionFormDate,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  onData(null, {});
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(composeWithTracker(onPropsChange, null, null, {withRef: true})(TransactionForm));