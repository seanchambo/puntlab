import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { closeTransactionModal, saveTransaction } from '../../../actions/transactions';
import { TransactionModal } from '../../components/transactions/transaction-modal';

const mapStateToProps = (state) => {
  return {
    open: state.transactions.transactionModal,
    type: state.transactions.formType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeTransactionModal,
    saveTransaction,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  onData(null, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(TransactionModal));